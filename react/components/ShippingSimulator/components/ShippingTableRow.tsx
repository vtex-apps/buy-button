import React from 'react'
import { useIntl } from 'react-intl'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'vtex.shipping-estimate-transla... Remove this comment to see the full error message
import TranslateEstimate from 'vtex.shipping-estimate-translator/TranslateEstimate'
import classNames from 'classnames'
import { FormattedCurrency } from 'vtex.format-currency'

import styles from '../shippingSimulator.css'

type Props = {
  name?: string
  shippingEstimate?: string
  price?: number
}

const ShippingTableRow = ({ name, shippingEstimate, price }: Props) => {
  const { formatMessage } = useIntl()
  const etaClassName = classNames(
    `${styles.shippingTableCell} ${styles.shippingTableCellDeliveryEstimate} pv1 ph3 t-small c-muted-2`,
    {
      tc: typeof shippingEstimate === 'undefined',
    }
  )

  const valueClassName = classNames(
    `${styles.shippingTableCell} ${styles.shippingTableCellDeliveryPrice} pv1 ph3 t-small c-muted-2`,
    {
      tc: typeof price === 'undefined',
    }
  )

  let valueText

  if (typeof price === 'undefined') {
    valueText = '-'
  } else if (price === 0) {
    valueText = formatMessage({ id: 'store/shipping.free' })
  } else {
    valueText = <FormattedCurrency value={price / 100} />
  }

  return (
    <tr className={styles.shippingTableRow} key={name}>
      <td
        className={`${styles.shippingTableCell} ${styles.shippingTableCellDeliveryName} pv1 ph3 t-small`}
      >
        <label className={styles.shippingTableLabel}>
          <input
            className={`${styles.shippingTableRadioBtn} mr4`}
            name="shipping-option"
            type="radio"
            value={name}
          />
          {name}
        </label>
      </td>
      <td className={etaClassName}>
        <TranslateEstimate shippingEstimate={shippingEstimate} />
      </td>
      <td className={valueClassName}>{valueText}</td>
    </tr>
  )
}

export default ShippingTableRow
