import React, { memo } from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { formatIOMessage } from 'vtex.native-types'
import { injectIntl } from 'react-intl'

import NotificationContent from './notificationContent'
import styles from './styles.css'

const NotificationBar = ({ content, intl }) => {
  return (
    content && (
      <div
        className={`${styles.notificationBarContainer} bg-base--inverted c-on-base--inverted w-100`}
      >
        <div
          className={`${styles.notificationBarInner} min-h-large flex items-center justify-center`}
        >
          <NotificationContent
            content={formatIOMessage({ id: content, intl })}
          />
        </div>
      </div>
    )
  )
}

NotificationBar.propTypes = {
  content: PropTypes.string,
  intl: PropTypes.object.isRequired,
}

NotificationBar.defaultProps = {
  content: '',
}

NotificationBar.schema = {
  title: 'admin/editor.notification-bar.title',
}

export default hoistNonReactStatics(
  injectIntl(NotificationBar),
  memo(NotificationBar)
)
