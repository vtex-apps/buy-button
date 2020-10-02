import { path } from 'ramda'

function getItemWidth(slick: any, maxWidth: any) {
  const slidesNodeList = path(
    ['innerSlider', 'list', 'childNodes', '0', 'childNodes'],
    slick
  )

  let itemWidth = null

  if (slidesNodeList) {
    const slidesArray = Array.prototype.slice.call(slidesNodeList)

    // eslint-disable-next-line array-callback-return
    slidesArray.map((slide: any) => {
      const attributes = Array.prototype.slice.call(slide.attributes)

      // eslint-disable-next-line array-callback-return
      attributes.map((attr: any) => {
        // eslint-disable-next-line vtex/prefer-early-return
        if (attr.nodeName === 'data-index' && attr.nodeValue === '0') {
          itemWidth = path(['childNodes', '0', 'clientWidth'], slide)
          // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
          if (maxWidth && maxWidth < itemWidth) itemWidth = maxWidth
        }
      })
    })
  }

  return itemWidth || maxWidth
}

/**
 * Returns the correct number of items to be inside the slider without reduce the item width.
 */
// eslint-disable-next-line max-params
export default function getItemsPerPage(
  slick: any,
  slideWidth: any,
  defaultItemWidth: any,
  actualItemsPerPage: any
) {
  if (slideWidth) {
    const shelfItemWidth = getItemWidth(slick, defaultItemWidth)
    const maxItemsPerPage = Math.floor(slideWidth / shelfItemWidth)

    if (actualItemsPerPage >= maxItemsPerPage) {
      return maxItemsPerPage || 1
    }
  }

  return actualItemsPerPage
}
