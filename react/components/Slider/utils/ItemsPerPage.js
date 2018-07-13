import get from 'lodash.get'

function getItemWidth(slick) {
  const slidesNodeList = get(slick, 'innerSlider.list.childNodes[0].childNodes')
  let itemWidth = null
  if (slidesNodeList) {
    const slidesArray = Array.from(slidesNodeList)
    slidesArray.map(slide => {
      const attributes = Array.from(slide.attributes)
      attributes.map(attr => {
        if (attr.nodeName === 'data-index' && attr.nodeValue === '0') {
          itemWidth = get(slide, 'childNodes[0].clientWidth')
        }
      })
    })
  }
  return itemWidth
}

/**
 * Returns the correct number of items to be inside the slider without reduce the item width.
 */
export default function getItemsPerPage(slick, slideWidth, defaultItemWidth, actualItemsPerPage) {
  if (slideWidth) {
    const shelfItemWidth = getItemWidth(slick) || defaultItemWidth
    const maxItemsPerPage = Math.floor(slideWidth / shelfItemWidth)
    if (actualItemsPerPage >= maxItemsPerPage) {
      return maxItemsPerPage || 1
    }
  }
  return actualItemsPerPage
}
