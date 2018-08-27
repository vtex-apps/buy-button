import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { ExtensionPoint, Link } from 'render'
import classNames from 'classnames'
import ReactResizeDetector from 'react-resize-detector'

import Logo from '../../../Logo'
import SearchBar from '../../../SearchBar'

const LOGO_WIDTH_MOBILE = 90
const LOGO_WIDTH_DESKTOP = 150
const LOGO_HEIGHT_MOBILE = 30
const LOGO_HEIGHT_DESKTOP = 50
const MINICART_ICON_SIZE_MOBILE = 23
const MINICART_ICON_SIZE_DESKTOP = 30
const LOGIN_ICON_SIZE_MOBILE = 23
const LOGIN_ICON_SIZE_DESKTOP = 30

class TopMenu extends Component {
  translate = id => this.props.intl.formatMessage({ id: `header.${id}` })

  renderLogo(mobileMode, logoUrl, logoTitle) {
    return (
      <div className="vtex-top-menu__logo w-20-m flex justify-start">
        <Link to="/">
          <Logo
            url={logoUrl}
            title={logoTitle}
            width={mobileMode ? LOGO_WIDTH_MOBILE : LOGO_WIDTH_DESKTOP}
            height={mobileMode ? LOGO_HEIGHT_MOBILE : LOGO_HEIGHT_DESKTOP}
          />
        </Link>
      </div>
    )
  }

  renderMobileMenu() {
    return (
      <ExtensionPoint id="category-menu" mobileMode />
    )
  }

  renderSearchBar(mobileMode) {
    return (
      <div className={`vtex-top-menu__search-bar flex pa2-m ${mobileMode ? 'order-2' : 'order-1'}`}>
        <SearchBar
          placeholder={this.translate('search-placeholder')}
          emptyPlaceholder={this.translate('search-emptyPlaceholder')}
        />
      </div>
    )
  }

  renderIcons(mobileMode) {
    return (
      <div className={`vtex-top-menu__icons flex justify-end items-center ${mobileMode ? 'order-1 ml-auto' : 'order-2'}`}>
        <div className="mr7-m">
          <ExtensionPoint
            id="login"
            iconColor="#979899"
            iconSize={mobileMode ? LOGIN_ICON_SIZE_MOBILE : LOGIN_ICON_SIZE_DESKTOP}
            iconLabel={!mobileMode ? this.translate('topMenu.login.icon.label') : ''}
          />
        </div>
        <ExtensionPoint
          id="minicart"
          iconColor="#979899"
          iconSize={mobileMode ? MINICART_ICON_SIZE_MOBILE : MINICART_ICON_SIZE_DESKTOP}
          iconLabel={!mobileMode ? this.translate('topMenu.minicart.icon.label') : ''}
        />
      </div>
    )
  }

  render() {
    const { logoUrl, logoTitle, fixed } = this.props
    const classes = classNames(
      'vtex-top-menu w-100 bg-white flex justify-center pb4 pv2-m pv6-l z-999',
      {
        'vtex-top-menu--fixed top-0': fixed,
      }
    )
    return (
      <ReactResizeDetector handleWidth>
        {
          width => {
            const mobileMode = width < 769 || (global.__RUNTIME__.hints.mobile && (!width || width < 769))
            return (
              <div className={classes}>
                <div className="flex flex-wrap w-100 justify-between-m items-center">
                  {mobileMode && this.renderMobileMenu()}
                  {this.renderLogo(mobileMode, logoUrl, logoTitle)}
                  {this.renderSearchBar(mobileMode)}
                  {this.renderIcons(mobileMode)}
                </div>
              </div>
            )
          }
        }
      </ReactResizeDetector>
    )
  }
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
