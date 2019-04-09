import React, { memo } from 'react'
import { bool, string, oneOf } from 'prop-types'
import classNames from 'classnames'
import { useRuntime } from 'vtex.render-runtime'
import { values } from 'ramda'

import CallToAction from './CallToAction'
import {
  textPositionTypes,
  textAlignmentTypes,
  callToActionModeTypes,
  textPostionValues,
  textAlignmentValues,
} from './SchemaTypes'

import styles from './infoCard.css'

const justifyTokens = {
  [textPostionValues.LEFT]: 'justify-start',
  [textPostionValues.CENTER]: 'justify-center',
  [textPostionValues.RIGHT]: 'justify-end',
}

const alignTokens = {
  [textAlignmentValues.LEFT]: 'tl',
  [textAlignmentValues.CENTER]: 'tc',
  [textAlignmentValues.RIGHT]: 'tr',
}

const itemsTokens = {
  [textAlignmentValues.LEFT]: 'items-start',
  [textAlignmentValues.CENTER]: 'items-center',
  [textAlignmentValues.RIGHT]: 'items-end',
}

const flexOrderTokens = {
  [textPostionValues.LEFT]: 'flex-row',
  [textPostionValues.RIGHT]: 'flex-row-reverse',
}

const defaultValues = {
  textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
  textAlignment: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
}

const getEnumValues = enumObject => values(enumObject).map(({ value }) => value)
const getEnumNames = enumObject => values(enumObject).map(({ name }) => name)

const safelyGetToken = (tokenMap, valueWanted, propName) =>
  tokenMap[valueWanted] || defaultValues[propName]

const getImageUrl = (isMobile, imageUrl, mobileImageUrl) =>
  !!mobileImageUrl && isMobile ? mobileImageUrl : imageUrl

const InfoCard = ({
  isFullModeStyle,
  headline,
  subhead,
  callToActionMode,
  callToActionText,
  callToActionUrl,
  textPosition,
  textAlignment,
  imageUrl,
  mobileImageUrl,
}) => {
  const {
    hints: { mobile },
  } = useRuntime()
  const paddingClass =
    textPosition === textPostionValues.LEFT ? 'pr4-ns' : 'pl4-ns'

  // We ignore textAlignment tokens when full image mode
  const alignToken = isFullModeStyle
    ? safelyGetToken(alignTokens, textPosition, 'textPosition')
    : safelyGetToken(alignTokens, textAlignment, 'textAlignment')
  const itemsToken = isFullModeStyle
    ? safelyGetToken(itemsTokens, textPosition, 'textPosition')
    : safelyGetToken(itemsTokens, textAlignment, 'textAlignment')
  const justifyToken = safelyGetToken(
    justifyTokens,
    textPosition,
    'textPosition'
  )
  const flexOrderToken = safelyGetToken(
    flexOrderTokens,
    textPosition,
    'textPosition'
  )

  const finalImageUrl = getImageUrl(mobile, imageUrl, mobileImageUrl)

  const containerStyle = isFullModeStyle
    ? { backgroundImage: `url(${finalImageUrl})`, backgroundSize: 'cover' }
    : {}

  const containerClasses = classNames(
    `${styles.infoCardContainer} items-center`,
    {
      [`flex-ns ${flexOrderToken} bg-base ph2-ns pb2 justify-between`]: !isFullModeStyle,
      [`bg-center bb b--muted-4 flex ${justifyToken}`]: isFullModeStyle,
    }
  )

  const textContainerClasses = classNames(
    `${styles.infoCardTextContainer} flex flex-column`,
    {
      [`w-50-ns ph3-s ${itemsToken} ${paddingClass}`]: !isFullModeStyle,
      [`mh8-ns mh4-s w-40-ns ${itemsToken}`]: isFullModeStyle,
    }
  )

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className={textContainerClasses}>
        {headline && (
          <h1
            className={`${
              styles.infoCardHeadline
            } t-heading-2 mt6 ${alignToken}`}
          >
            {headline}
          </h1>
        )}
        {subhead && (
          <p
            className={`${
              styles.infoCardSubhead
            } t-body mt6 c-on-base ${alignToken}`}
          >
            {subhead}
          </p>
        )}
        <CallToAction
          mode={callToActionMode}
          text={callToActionText}
          url={callToActionUrl}
        />
      </div>
      {!isFullModeStyle && (
        <img
          className="w-50-ns"
          src={finalImageUrl}
          style={{ objectFit: 'cover' }}
        />
      )}
    </div>
  )
}

const MemoizedInfoCard = memo(InfoCard)

MemoizedInfoCard.propTypes = {
  isFullModeStyle: bool,
  textPosition: oneOf(getEnumValues(textPositionTypes)),
  headline: string,
  subhead: string,
  callToActionMode: oneOf(getEnumValues(callToActionModeTypes)),
  callToActionText: string,
  callToActionUrl: string,
  imageUrl: string,
  mobileImageUrl: string,
  textAlignment: oneOf(getEnumValues(textAlignmentTypes)),
}

MemoizedInfoCard.defaultProps = {
  isFullModeStyle: false,
  textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
  headline: null,
  subhead: null,
  callToActionMode: callToActionModeTypes.CALL_ACTION_BUTTON.value,
  callToActionText: '',
  callToActionUrl: '',
  imageUrl: '',
  mobileImageUrl: null,
  textAlignment: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
}

MemoizedInfoCard.schema = {
  title: 'editor.info-card.title',
  description: 'editor.info-card.description',
  type: 'object',
  properties: {
    isFullModeStyle: {
      title: 'editor.info-card.isFullModeStyle.title',
      description: 'editor.info-card.isFullModeStyle.description',
      type: 'boolean',
      default: false,
    },
    textPosition: {
      title: 'editor.info-card.textPosition.title',
      description: 'editor.info-card.textPosition.description',
      type: 'string',
      enum: getEnumValues(textPositionTypes),
      enumNames: getEnumNames(textPositionTypes),
      default: textPositionTypes.TEXT_POSITION_LEFT.value,
    },
    headline: {
      title: 'editor.info-card.headline.title',
      description: 'editor.info-card.headline.description',
      type: 'string',
      default: null,
    },
    subhead: {
      title: 'editor.info-card.subhead.title',
      description: 'editor.info-card.subhead.description',
      type: 'string',
      default: null,
    },
    callToActionMode: {
      title: 'editor.info-card.callToActionMode.title',
      description: 'editor.info-card.callToActionMode.description',
      type: 'string',
      enum: getEnumValues(callToActionModeTypes),
      enumNames: getEnumNames(callToActionModeTypes),
      default: callToActionModeTypes.CALL_ACTION_BUTTON.value,
    },
    callToActionText: {
      title: 'editor.info-card.callToActionText.title',
      description: 'editor.info-card.callToActionText.description',
      type: 'string',
      default: '',
    },
    callToActionUrl: {
      title: 'editor.info-card.callToActionUrl.title',
      description: 'editor.info-card.callToActionUrl.description',
      type: 'string',
      default: '',
    },
    imageUrl: {
      title: 'editor.info-card.imageUrl.title',
      description: 'editor.info-card.imageUrl.description',
      type: 'string',
      default: '',
    },
    mobileImageUrl: {
      title: 'editor.info-card.mobileImageUrl.title',
      description: 'editor.info-card.mobileImageUrl.description',
      type: 'string',
      default: null,
    },
    textAlignment: {
      title: 'editor.info-card.textAlignment.title',
      description: 'editor.info-card.textAlignment.description',
      type: 'string',
      default: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
      enum: getEnumValues(textAlignmentTypes),
      enumNames: getEnumNames(textAlignmentTypes),
    },
  },
}

export default MemoizedInfoCard
