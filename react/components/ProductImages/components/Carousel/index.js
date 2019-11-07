import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import classNames from 'classnames'
import { path, equals } from 'ramda'
import ReactResizeDetector from 'react-resize-detector'

import { IconCaret } from 'vtex.store-icons'

import Loader from './Loader.js'
import Video from '../Video'

import styles from '../../styles.css'
import './global.css'
import { changeImageUrlSize } from '../../utils/generateUrl'

/** Swiper and its modules are imported using require to avoid breaking SSR */
const Swiper = window.navigator
  ? require('react-id-swiper/lib/ReactIdSwiper.full').default
  : null
const SwiperModules = window.navigator ? require('swiper/dist/js/swiper') : null

import ThumbnailSwiper from './ThumbnailSwiper'
import {
  THUMBS_ORIENTATION,
  THUMBS_POSITION_HORIZONTAL,
} from '../../utils/enums'

const initialState = {
  loaded: [],
  thumbUrl: [],
  alt: [],
  thumbsLoaded: false,
  activeIndex: 0,
  thumbSwiper: null,
  gallerySwiper: null,
}

class Carousel extends Component {
  state = initialState

  async setInitialVariablesState() {
    const slides = this.props.slides || []

    this.isVideo = []
    this.thumbLoadCount = 0

    slides.forEach(async (slide, i) => {
      if (slide.type === 'video') {
        const thumbUrl = await Video.getThumbUrl(slide.src, slide.thumbWidth)
        // this.setState({
        //   thumbUrl: {
        //     ...this.state.thumbUrl,
        //     [i]: thumbUrl,
        //   },
        // })
        this.isVideo[i] = true
        this.setVideoThumb(i)(thumbUrl)
        this.thumbLoadFinish()
      } else {
        this.getThumb(slide.thumbUrl)
      }
    })
  }

  updateSwiperSize = debounce(() => {
    const { thumbSwiper, gallerySwiper } = this.state
    if (thumbSwiper) {
      thumbSwiper.update()
    }

    if (gallerySwiper) {
      gallerySwiper.update()
    }
  }, 500)

  thumbLoadFinish = () => {
    this.thumbLoadCount++
    if (this.thumbLoadCount === this.props.slides.length) {
      this.setState({ thumbsLoaded: true })
    }
  }

  getThumb = thumbUrl => {
    if (!window.navigator) return // Image object doesn't exist when it's being rendered in the server side
    const image = new Image()
    image.onload = () => {
      this.thumbLoadFinish()
    }
    image.onerror = () => {
      this.thumbLoadFinish()
    }
    image.src = thumbUrl
  }

  handleResize = () => {
    this.updateSwiperSize()
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.setInitialVariablesState()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)

    this.updateSwiperSize.clear()
  }

  componentDidUpdate(prevProps) {
    const { loaded, activeIndex, gallerySwiper } = this.state
    const isVideo = this.isVideo

    if (!equals(prevProps.slides, this.props.slides)) {
      this.setInitialVariablesState()
      this.setState(initialState)
      return
    }

    const paginationElement = path(['pagination', 'el'], gallerySwiper)
    if (paginationElement) paginationElement.hidden = isVideo[activeIndex]

    const gallerySwiperZoom = path(['zoom'], gallerySwiper)

    if (gallerySwiperZoom) {
      loaded[activeIndex]
        ? gallerySwiperZoom.enable()
        : gallerySwiperZoom.disable()
    }
  }

  onSlideChange = () => {
    const activeIndex = path(['activeIndex'], this.state.gallerySwiper)
    this.setState({ activeIndex, sliderChanged: true })
  }

  setVideoThumb = i => (url, title) => {
    const thumbUrl = { ...this.state.thumbUrl }
    const alt = { ...this.state.alt }

    thumbUrl[i] = url
    alt[i] = title

    this.setState({ thumbUrl, alt })
  }

  onImageLoad = i => () => {
    const loaded = { ...this.state.loaded }
    loaded[i] = true
    this.setState({ loaded })
  }

  renderSlide = (slide, i) => {
    switch (slide.type) {
      case 'image':
        return (
          <div>
            <img
              className="w-100"
              src={changeImageUrlSize(slide.url, 800, 800)}
              // WIP
              // This should clearly be a bit smarter
              // (Though still have a couple of pre-defined sizes,
              // for better caching and better handling by our image server)
              srcSet={[
                `${changeImageUrlSize(slide.url, 600, 600)} 600w`,
                `${changeImageUrlSize(slide.url, 800, 800)} 800w`,
                `${changeImageUrlSize(slide.url, 1200, 1200)} 1200w`,
              ].join(',')}

              // WIP
              // This means: if the window has at most 64.1rem of width,
              // the image will be of a width of 100vw. Otherwise, the
              // image will be 50vw wide.
              // This size is used for picking the best available size
              // given the ones from the srcset above.
              sizes="(max-width: 64.1rem) 100vw, 50vw"
            />
          </div>
        )
      case 'video':
        return (
          <Video
            url={slide.src}
            setThumb={this.setVideoThumb(i)}
            playing={i === this.state.activeIndex}
            id={i}
          />
        )
      default:
        return null
    }
  }

  get galleryParams() {
    const { thumbSwiper } = this.state
    const {
      slides,
      zoomProps: { zoomType },
    } = this.props

    const iconSize = 24
    const caretClassName =
      'pv7 absolute top-50 translate--50y z-2 pointer c-action-primary'

    const setZoom = event => {
      const { sliderChanged, gallerySwiper } = this.state
      const gallerySwiperZoom = path(['zoom'], gallerySwiper)

      if (sliderChanged) {
        this.setState({ sliderChanged: false })
      } else {
        gallerySwiperZoom.toggle(event)
      }
    }

    return {
      modules: [SwiperModules.Pagination, SwiperModules.Navigation],
      containerClass: 'swiper-container',
      ...(slides.length > 1 && {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletActiveClass: 'c-action-primary swiper-pagination-bullet-active',
        },
      }),
      ...(slides.length > 1 && {
        navigation: {
          prevEl: '.swiper-caret-prev',
          nextEl: '.swiper-caret-next',
          disabledClass: `c-disabled ${styles.carouselCursorDefault}`,
        },
      }),
      thumbs: {
        swiper: thumbSwiper,
      },
      zoom: zoomType === 'in-page' && {
        maxRatio: 2,
        toggle: false,
      },

      resistanceRatio: slides.length > 1 ? 0.85 : 0,
      renderNextButton: () => (
        <span className={`swiper-caret-next pl7 right-1 ${caretClassName}`}>
          <IconCaret
            orientation="right"
            size={iconSize}
            className={styles.carouselIconCaretRight}
          />
        </span>
      ),
      renderPrevButton: () => (
        <span className={`swiper-caret-prev pr7 left-1 ${caretClassName}`}>
          <IconCaret
            orientation="left"
            size={iconSize}
            className={styles.carouselIconCaretLeft}
          />
        </span>
      ),
      on: {
        slideChange: this.onSlideChange,
        click: zoomType === 'in-page' ? event => setZoom(event) : undefined,
      },
      getSwiper: swiper => this.setState({ gallerySwiper: swiper }),
    }
  }

  get thumbnailsParams() {
    const { displayThumbnailsArrows, thumbnailsOrientation } = this.props

    const isThumbsVertical =
      thumbnailsOrientation === THUMBS_ORIENTATION.VERTICAL
    const caretSize = 24
    const caretClassName = 'absolute z-2 pointer c-action-primary flex pv2'
    const caretStyle = { transition: 'opacity 200ms' }

    return {
      modules: [SwiperModules.Navigation],
      ...(displayThumbnailsArrows && {
        navigation: {
          prevEl: '.swiper-thumbnails-caret-prev',
          nextEl: '.swiper-thumbnails-caret-next',
          disabledClass: `c-disabled o-0 pointer-events-none ${styles.carouselCursorDefault}`,
          hiddenClass: 'dn',
        },
        renderNextButton: () => {
          const classes = classNames(
            'swiper-thumbnails-caret-next',
            caretClassName,
            {
              [`bottom-0 pt7 left-0 justify-center w-100 ${styles.gradientBaseBottom}`]: isThumbsVertical,
              [`right-0 top-0 items-center h-100 pl6 ${styles.gradientBaseRight}`]: !isThumbsVertical,
            }
          )
          return (
            <span className={classes} style={caretStyle}>
              <IconCaret
                orientation={isThumbsVertical ? 'down' : 'right'}
                size={caretSize}
              />
            </span>
          )
        },
        renderPrevButton: () => {
          const classes = classNames(
            'swiper-thumbnails-caret-prev top-0 left-0',
            caretClassName,
            {
              [`pb7 justify-center w-100 ${styles.gradientBaseTop}`]: isThumbsVertical,
              [`items-center h-100 pr6 ${styles.gradientBaseLeft}`]: !isThumbsVertical,
            }
          )
          return (
            <span className={classes} style={caretStyle}>
              <IconCaret
                orientation={isThumbsVertical ? 'up' : 'left'}
                size={caretSize}
              />
            </span>
          )
        },
      }),
      observer: true,
      containerClass: 'swiper-container h-100',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      freeMode: false,
      direction: thumbnailsOrientation,
      slidesPerView: 'auto',
      touchRatio: 1,
      mousewheel: false,
      preloadImages: true,
      shouldSwiperUpdate: true,
      zoom: false,
      threshold: 8,
      /* Slides are grouped when thumbnails arrows are enabled
       * so that clicking on next/prev will scroll more than
       * one thumbnail */
      slidesPerGroup: displayThumbnailsArrows ? 4 : 1,
      getSwiper: swiper => this.setState({ thumbSwiper: swiper }),
    }
  }

  render() {
    const { thumbsLoaded, gallerySwiper } = this.state

    const {
      slides,
      position,
      zoomProps: { zoomType },
      thumbnailsOrientation,
    } = this.props

    if (!thumbsLoaded || Swiper == null) {
      return <Loader slidesAmount={slides ? slides.length : 0} />
    }

    const isThumbsVertical =
      thumbnailsOrientation === THUMBS_ORIENTATION.VERTICAL
    const hasThumbs = slides.length > 1

    const galleryCursor = {
      'in-page': styles.carouselGaleryCursor,
      'no-zoom': '',
    }

    const imageClasses = classNames(
      `w-100 border-box ${galleryCursor[zoomType]}`,
      {
        'ml-20-ns w-80-ns':
          isThumbsVertical &&
          position === THUMBS_POSITION_HORIZONTAL.LEFT &&
          hasThumbs,
        'mr-20-ns w-80-ns':
          isThumbsVertical &&
          position === THUMBS_POSITION_HORIZONTAL.RIGHT &&
          hasThumbs,
      }
    )

    const thumbnailSwiper = (
      <ThumbnailSwiper
        isThumbsVertical={isThumbsVertical}
        slides={slides}
        swiperParams={this.thumbnailsParams}
        thumbUrls={this.state.thumbUrl}
        position={position}
        gallerySwiper={gallerySwiper}
      />
    )

    return (
      <div className={`relative overflow-hidden w-100`} aria-hidden="true">
        {isThumbsVertical && thumbnailSwiper}
        <div className={imageClasses}>
          <ReactResizeDetector handleHeight onResize={this.updateSwiperSize}>
            <Swiper {...this.galleryParams} rebuildOnUpdate>
              {slides.map((slide, i) => (
                <div key={i} className="swiper-slide center-all">
                  {this.renderSlide(slide, i)}
                </div>
              ))}
            </Swiper>
          </ReactResizeDetector>
          {!isThumbsVertical && thumbnailSwiper}
        </div>
      </div>
    )
  }
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      url: PropTypes.string,
      alt: PropTypes.string,
      thumbUrl: PropTypes.string,
      bestUrlIndex: PropTypes.number,
    })
  ),
  displayThumbnailsArrows: PropTypes.bool,
}

export default Carousel
