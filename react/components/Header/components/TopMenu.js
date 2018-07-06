import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { ExtensionPoint, Link } from 'render'

import Logo from '../../../Logo'
import SearchBar from '../../../SearchBar'

const TopMenu = ({ logoUrl, logoTitle, intl, fixed, offsetTop }) => {
  const translate = id => intl.formatMessage({ id: `header.${id}` })

  return (
    <div
      className={`${
        fixed ? 'fixed shadow-5' : ''
        } z-999 flex items-center w-100 flex-wrap pa4 pa5-ns bg-white tl`}
      style={{top: `${offsetTop}px`}}
    >
      <div className="flex w-100 w-auto-ns pa4-ns items-center">
        <Link className="link b f3 near-black tc tl-ns serious-black flex-auto" to="/">
          <Logo
            url={logoUrl}
            title={logoTitle}
          />
        </Link>
      </div>
      <div className="flex-auto pr2 pa4">
        <SearchBar
          placeholder={translate('search-placeholder')}
          emptyPlaceholder={translate('search-emptyPlaceholder')}
        />
      </div>
      <div className="pr2 bg-black">
        <ExtensionPoint id="minicart" />
        <ExtensionPoint id="login" />
      </div>
    </div>
  )
}

TopMenu.propTypes = {
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  intl: intlShape.isRequired,
  fixed: PropTypes.bool,
}

TopMenu.defaultProps = {
  fixed: false,
}

export default injectIntl(TopMenu)
