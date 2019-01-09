import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'

const datesMap = {
  bd: "shipping.busniess-days",
  d: "shipping.calendar-days",
  m: "shipping.minutes",
  h: "shipping.hours",
  default: "shipping.busniess-days"
}

const deliveryTimeParser = (deliveryTime) => {
  const deliveryTimeRegex = /^(\d+)([a-z]+)$/i
  const eta = deliveryTimeRegex.exec(deliveryTime) 
  if(!eta) return { value: "", key: "" }
  return { value: eta[1], especification: datesMap[eta[2]] || datesMap.default }
}  

const ShippingTableRow = ({ name, shippingEstimate, price, intl }) => {
  const etaClassName = classNames('vtex-shipping-table__cell pv1 ph3 t-small c-muted-2', {
    'tc': shippingEstimate === undefined,
  })

  const valueClassName = classNames('vtex-shipping-table__cell pv1 ph3 t-small c-muted-2', {
    'tc': price === undefined,
  })

  const deliveryTime = deliveryTimeParser(shippingEstimate)
  const deliveryTimeEspecificationText = intl.formatMessage({id:deliveryTime.especification})
  const deliveryTimeText = intl.formatMessage({ id: 'shipping.eta' }, { eta: deliveryTime.value, especification: deliveryTimeEspecificationText})
  
  let  valueText 

  if (price === undefined) {
    valueText = '-'
  } else if (price === 0) {
    valueText = intl.formatMessage({ id: 'shipping.free' })
  } else {
    valueText = intl.formatNumber(price/100, { style: 'currency', currency: 'BRL' })
  }

  return (
    <tr key={name}>
      <td className="vtex-shipping-table__cell pv1 ph3 t-small">
        <label className="vtex-shipping-table__shipping-name-label">
          <input
            className="vtex-shipping-table__radio-input mr4"
            name="shipping-option"
            type="radio"
            value={name}
          />
          {name}
        </label>
      </td>
      <td className={etaClassName}>
        {deliveryTimeText}
      </td>
      <td className={valueClassName}>
        {valueText}
      </td>
    </tr>
  )
}

ShippingTableRow.propTypes = {
  name: PropTypes.string,
  shippingEstimate: PropTypes.string,
  price: PropTypes.number,
  intl: intlShape.isRequired,
}

export default injectIntl(ShippingTableRow)

