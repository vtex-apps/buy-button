import React, { Fragment } from 'react'
import { ExtensionPoint, useChildBlock } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { pathOr } from 'ramda'
import { injectIntl, FormattedMessage } from 'react-intl'
import { IconLocationMarker } from 'vtex.store-icons'

const CSS_HANDLES = [
  'addressInfoIconContainer',
  'addressInfoTextContainer',
  'addressInfoPrefixContainer',
  'addressInfoAddressContainer',
  'addressInfoDivider',
  'addressInfoModalContainer',
]

const AddressInfo = ({
  inverted,
  inline,
  orderForm,
  intl,
  showStreet,
  showCityAndState,
  showPostalCode,
  showPrefix,
  showIfEmpty,
}) => {
  const { shippingData } = orderForm
  const hasModal = !!useChildBlock({ id: 'modal' })
  const handles = useCssHandles(CSS_HANDLES)

  if (!shippingData || !shippingData.address) {
    if (!showIfEmpty) return

    return (
      <div
        className={`flex ${inline ? 'items-end' : 'items-center flex-auto'}`}
      >
        <div
          className={`${
            handles.addressInfoIconContainer
          } mr3 flex items-center ${
            inverted ? 'c-on-base--inverted' : 'c-muted-2'
          }`}
        >
          <IconLocationMarker size={27} viewBox="0 0 21 27" />
        </div>
        {hasModal ? (
          <div
            className={`${handles.addressInfoModalContainer} flex items-center`}
          >
            <ExtensionPoint
              id="modal"
              centered
              buttonLabel={intl.formatMessage({
                id: 'store/user-address.add',
              })}
              buttonClass={
                inverted ? 'c-on-base--inverted' : 'c-action-primary'
              }
              showTopBar={false}
            />
          </div>
        ) : (
          <div className={`${handles.addressInfoAddressContainer} truncate`}>
            <FormattedMessage id="store/user-address.add" />
          </div>
        )}
      </div>
    )
  }

  const {
    street,
    number,
    complement,
    addressType,
    city,
    state,
    postalCode,
  } = shippingData.address

  let displayStreet = number ? `${street}, ${number}` : street

  if (complement) displayStreet = `${displayStreet} - ${complement}`

  const displayCityAndState = !!city && !!state ? `${city}, ${state}` : ''

  const displayAddress = `${showStreet ? displayStreet || '' : ''}${
    showStreet && (showCityAndState || showPostalCode) ? ', ' : ''
  }${showCityAndState ? displayCityAndState : ''}${
    showCityAndState && showPostalCode
      ? `${displayCityAndState ? ', ' : ''}`
      : ''
  }${showPostalCode ? postalCode : ''}`

  const isPickup = addressType === 'pickup'
  const friendlyName = pathOr(
    '',
    ['pickupPointCheckedIn', 'friendlyName'],
    orderForm
  )

  return (
    <div className={`flex ${inline ? 'items-end' : 'items-center flex-auto'}`}>
      <div className="flex flex-auto items-center">
        <div
          className={`${
            handles.addressInfoIconContainer
          } mr3 flex items-center ${
            inverted ? 'c-on-base--inverted' : 'c-muted-2'
          }`}
        >
          <IconLocationMarker size={27} viewBox="0 0 21 27" />
        </div>
        <div
          className={`${handles.addressInfoTextContainer} flex flex-auto flex-column`}
        >
          {showPrefix && (
            <div
              className={`${handles.addressInfoPrefixContainer} t-small ${
                inverted ? 'c-on-base--inverted' : 'c-muted-2'
              }`}
            >
              {isPickup ? (
                <FormattedMessage
                  id="store/user-address.pickup"
                  values={{ name: friendlyName }}
                />
              ) : (
                <FormattedMessage id="store/user-address.order" />
              )}
            </div>
          )}
          <div className={`${handles.addressInfoAddressContainer} truncate`}>
            {displayAddress}
          </div>
        </div>
      </div>
      {hasModal && (
        <Fragment>
          <div
            className={`${handles.addressInfoDivider} bl bw1 mh4 ${
              inline ? 'nb2' : ''
            } ${inverted ? 'b--on-base--inverted' : 'b--muted-5'}`}
            style={{
              height: '1.5rem',
            }}
          />
          <div
            className={`${handles.addressInfoModalContainer} flex items-center`}
          >
            <ExtensionPoint
              id="modal"
              centered
              buttonLabel={intl.formatMessage({
                id: 'store/user-address.change',
              })}
              buttonClass={
                inverted ? 'c-on-base--inverted' : 'c-action-primary'
              }
              showTopBar={false}
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default injectIntl(AddressInfo)
