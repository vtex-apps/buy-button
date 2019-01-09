import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import ShippingTableRow from './ShippingTableRow'

export default class ShippingTable extends Component {
  static propTypes = {
    /** Shipping informations */
    shipping: PropTypes.shape({
      logisticsInfo: PropTypes.arrayOf(PropTypes.shape({
        itemIndex: PropTypes.string,
        slas: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
          shippingEstimate: PropTypes.string,
        })),
      })),
    }),
  }
 
  render() {
    const { shipping } = this.props

    if (!shipping || !shipping.logisticsInfo || shipping.logisticsInfo.length === 0) {
      return null
    }

    const slaList = shipping.logisticsInfo.reduce(
      (slas, info) => [...slas, ...info.slas],
      []
    )

    if (slaList.length === 0) {
      return (
        <FormattedMessage id="shipping.empty-sla">
          {text => (
            <span className="vtex-shipping__no-shipping-message dib t-small mt4">{text}</span>
          )}
        </FormattedMessage>
      )
    }

    return (
      <table className="vtex-shipping-table bt bb b--muted-4 c-muted-1 ph0 pv3 mt4 w-100">
        <tbody>
          {slaList.map(shipping => (
            <ShippingTableRow key={shipping.id} {...shipping} />
          ))}
        </tbody>
      </table>
    )
  }
}

