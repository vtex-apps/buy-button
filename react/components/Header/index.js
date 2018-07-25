import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import Modal from './components/Modal'
import TopMenu from './components/TopMenu'

import { Alert } from 'vtex.styleguide'
import { ExtensionPoint } from 'render'

import './global.css'

export const TOAST_TIMEOUT = 3000

class Header extends Component {
  state = {
    isAddToCart: false,
    hasError: false,
    error: null,
    showMenuPopup: false,
  }

  static propTypes = {
    name: PropTypes.string,
    logoUrl: PropTypes.string,
    logoTitle: PropTypes.string,
    intl: intlShape.isRequired,
  }

  _root = React.createRef()

  componentDidMount() {
    this._timeouts = []
    document.addEventListener('message:error', this.handleError)
    document.addEventListener('item:add', this.handleItemAdd)
    document.addEventListener('scroll', this.handleScroll)

    this.handleScroll()
  }

  componentWillUnmount() {
    if (this._timeouts.length !== 0) {
      this._timeouts.map(el => {
        clearTimeout(el)
      })
    }

    document.removeEventListener('message:error', this.handleError)
    document.removeEventListener('item:add', this.handleItemAdd)
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleError = e => {
    this.setState({ hasError: true, error: e })
    const timeOut = window.setTimeout(() => {
      this.setState({ hasError: false })
    }, TOAST_TIMEOUT)

    this._timeouts.push(timeOut)
  }

  handleItemAdd = () => {
    this.setState({ isAddToCart: !this.state.isAddToCart })
    const timeOut = window.setTimeout(() => {
      this._timeoutId = undefined
      this.setState({ isAddToCart: !this.state.isAddToCart })
    }, TOAST_TIMEOUT)

    this._timeouts.push(timeOut)
  }

  handleScroll = () => {
    if (!this._root.current) {
      return
    }

    const scroll = window.scrollY
    const { scrollHeight } = this._root.current

    if (scroll < scrollHeight && this.state.showMenuPopup) {
      this.setState({
        showMenuPopup: false,
      })
    } else if (scroll >= scrollHeight) {
      this.setState({
        showMenuPopup: true,
      })
    }
  }

  render() {
    const { logoUrl, logoTitle } = this.props
    const { isAddToCart, hasError, showMenuPopup, error } = this.state

    const offsetTop = (this._root.current && this._root.current.offsetTop) || 0

    return (
      <div
        className="vtex-header relative z-2 w-100 shadow-5"
        ref={this._root}
      >
        <div className="z-2 items-center w-100 top-0 bg-white tl">
          <ExtensionPoint id="menu-link" />
        </div>
        <TopMenu
          logoUrl={logoUrl}
          logoTitle={logoTitle}
        />
        <ExtensionPoint id="category-menu" />
        {showMenuPopup && (
          <Modal>
            <TopMenu
              logoUrl={logoUrl}
              logoTitle={logoTitle}
              offsetTop={offsetTop}
              fixed
            />
          </Modal>
        )}
        <div
          className="flex flex-column items-center fixed w-100"
          style={{ top: offsetTop + 120 }}
        >
          {isAddToCart && (
            <div className="pa2 mw9">
              <Alert type="success">
                <FormattedMessage id="header.buy-success" />
              </Alert>
            </div>
          )}

          {hasError && (
            <div className="pa2 mw9">
              <Alert type="error">{error.detail.message}</Alert>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default injectIntl(Header)
