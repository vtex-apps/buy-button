import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CollectionBadgeItem } from './components/CollectionBadgeItem'
import VTEXClasses from './components/CustomClasses'

/**
 * Collection Badges component.
 * Encapsulates and displays a responsive list of Collection Badges.
 */
const CollectionBadges = ({ collectionBadgesText, children }) => (
  <div className={`${VTEXClasses.COLLECTION_BADGES} relative dib h-100`}>
    {children}
    <div className="inline-flex justify-end absolute w-100 bottom-0 left-0">
      {collectionBadgesText.map(collectionBadgeText => (
        <CollectionBadgeItem key={collectionBadgeText}>
          {collectionBadgeText}
        </CollectionBadgeItem>
      ))}
    </div>
  </div>
)

CollectionBadges.propTypes = {
  /** Array of collection badges text */
  collectionBadgesText: PropTypes.array.isRequired,
  /** Children component that should be render inside the collection badge item */
  children: PropTypes.node.isRequired,
}

CollectionBadges.defaultProps = {
  collectionBadgesText: [],
}

export default CollectionBadges
