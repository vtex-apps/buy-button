import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'render'

import { RECTANGULAR, SQUARED } from '../constants'
import rectangularPlaceholder from '../images/rectangular-placeholder.svg'
import squaredPlaceholder from '../images/squared-placeholder.svg'

/**
 * CategoryCard is a component responsible to display an image of a category
 * and provides the link to the category specified by its name.
 */
class CategoryCard extends Component {
  static propTypes = {
    /** Name of the category */
    name: PropTypes.string.isRequired,
    /** Image of the category */
    image: PropTypes.string,
    /** Shape of the category card */
    shape: PropTypes.oneOf([RECTANGULAR, SQUARED]),
  }

  render() {
    const { name, image, shape } = this.props
    return (
      <div
        className={`vtex-categories-highlighted__category-${shape}-card shadow-1`}>
        {/* TODO: Redirect to the page of the category specified by its name */}

        <Link>
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <img
              src={
                shape == SQUARED ? squaredPlaceholder : rectangularPlaceholder
              }
              alt=""
            />
          )}
        </Link>
      </div>
    )
  }
}

export default CategoryCard
