import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Input } from 'vtex.styleguide'
import { ExtensionPoint, useChildBlock } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { IconSearch, IconClose } from 'vtex.store-icons'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
const CSS_HANDLES = [
  'searchBarIcon',
  'compactMode',
  'autoCompleteOuterContainer',
  'paddingInput',
]

const CloseIcon = () => {
  const hasIconBlock = Boolean(useChildBlock({ id: 'icon-close' }))

  if (hasIconBlock) {
    return <ExtensionPoint id="icon-close" size={22} type="line" />
  }

  return <IconClose type="line" size={22} />
}

const SearchIcon = () => {
  const hasIconBlock = Boolean(useChildBlock({ id: 'icon-search' }))

  if (hasIconBlock) {
    return <ExtensionPoint id="icon-search" />
  }

  return <IconSearch />
}

const AutocompleteInput = ({
  onClearInput,
  compactMode,
  value,
  hasIconLeft,
  iconBlockClass,
  iconClasses,
  autoFocus,
  onGoToSearchPage,
  submitOnIconClick,
  openMenu,
  inputErrorMessage,
  toggleableInput,
  ...restProps
}) => {
  const inputRef = useRef(null)
  const handles = useCssHandles(CSS_HANDLES)
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    const changeClassInput = () => {
      if (compactMode) {
        inputRef.current.placeholder = ''
        inputRef.current.classList.add(handles.paddingInput)
      }
    }

    changeClassInput()
    autoFocus && inputRef.current.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = () => {
    if (toggleableInput) {
      setShowInput(!showInput)
    }
    submitOnIconClick ? onGoToSearchPage() : value && onClearInput()
  }

  const suffix = (
    <button
      className={`${iconClasses || ''} ${
        handles.searchBarIcon
      } flex items-center pointer bn bg-transparent outline-0`}
      onClick={
        handleClick
      }
    >
      {value && !submitOnIconClick ? (
        <CloseIcon />
      ) : (
        !hasIconLeft && <SearchIcon />
      )}
    </button>
  )

  const prefix = (
    <span className={`${iconClasses} ${handles.searchBarIcon}`}>
      <SearchIcon />
    </span>
  )

  const classContainer = classNames('w-100', {
    [handles.compactMode]: compactMode,
  })

  return (
    <div className={`${handles.autoCompleteOuterContainer} flex`}>
      <div className={classContainer}>
        {
          toggleableInput ?
            showInput ? <Input
              ref={inputRef}
              size="large"
              value={value}
              prefix={hasIconLeft && prefix}
              suffix={suffix}
              {...restProps}
              error={Boolean(inputErrorMessage)}
              errorMessage={inputErrorMessage}
            /> : suffix
            :
            <Input
              ref={inputRef}
              size="large"
              value={value}
              prefix={hasIconLeft && prefix}
              suffix={suffix}
              {...restProps}
              error={Boolean(inputErrorMessage)}
              errorMessage={inputErrorMessage}
            />
        }
      </div>
    </div>
  )
}

AutocompleteInput.propTypes = {
  /** Downshift prop to be passed to the input */
  autoComplete: PropTypes.string,
  /** Input ID */
  id: PropTypes.string,
  /** Downshift prop to be passed to the input */
  onBlur: PropTypes.func,
  /** Downshift prop to be passed to the input */
  onChange: PropTypes.func,
  /** Downshift prop to be passed to the input */
  onKeyDown: PropTypes.func,
  /** Downshift prop to be passed to the input */
  value: PropTypes.string,
  /** Downshift func to open the menu */
  openMenu: PropTypes.func,
  /** Placeholder to be used on the input */
  placeholder: PropTypes.string,
  compactMode: PropTypes.bool,
  /** Clears the input */
  onClearInput: PropTypes.func,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
  /** Block class for the search icon */
  iconBlockClass: PropTypes.string,
  /** Identify if the search input should autofocus or not */
  autoFocus: PropTypes.bool,
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: PropTypes.func.isRequired,
  /** Identify if icon should submit on click */
  submitOnIconClick: PropTypes.bool,
  /** Error message showed in search input */
  inputErrorMessage: PropTypes.string,
  /** If true, the autocomplete will be able to toggle between clicks */
  toggleableInput: PropTypes.bool,
}

export default AutocompleteInput
