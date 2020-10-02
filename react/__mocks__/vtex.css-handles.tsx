import React from 'react'

export const useCssHandles = (cssHandles: any) => {
  const handles = {}

  cssHandles.forEach((handle: any) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    handles[handle] = handle
  })

  return handles
}

const validateModifier = (modifier: any) => {
  if (typeof modifier !== 'string') {
    console.error(
      `Invalid modifier type on \`cssHandles.applyModifier\`. All modifiers should be strings, found "${modifier}" `
    )

    return false
  }

  /* This is not an error, so doesn't log any message, but should
   * invalidate the current modifier and not include it */
  if (modifier === '') {
    return false
  }

  if (/[^A-z0-9-]/.test(modifier)) {
    console.error(
      `Invalid modifier on \`cssHandles.applyModifier\`. Modifiers should contain only letters, numbers or -`
    )

    return false
  }

  return true
}

export const applyModifiers = (handles: any, modifier: any) => {
  const normalizedModifiers =
    typeof modifier === 'string' ? [modifier] : modifier

  if (!Array.isArray(normalizedModifiers)) {
    console.error(
      'Invalid modifier type on `cssHandles.applyModifier`. Please use either a string or an array of strings'
    )

    return handles
  }

  const splitHandles = handles.split(' ')

  const modifiedHandles = normalizedModifiers
    .map((currentModifier) => {
      const isValid = validateModifier(currentModifier)

      if (!isValid) {
        return ''
      }

      return splitHandles
        .map((handle: any) => `${handle}--${currentModifier}`)
        .join(' ')
        .trim()
    })
    .filter((l) => l.length > 0)
    .join(' ')
    .trim()

  return splitHandles.concat(modifiedHandles).join(' ').trim()
}

// eslint-disable-next-line default-param-last
export const withCssHandles = (handles = [], options: any = {}) => (
  Component: any
) => {
  const EnhancedComponent = (props: any) => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    const cssHandles = useCssHandles(handles, options)

    return <Component cssHandles={cssHandles} {...props} />
  }

  const displayName = Component.displayName || Component.name || 'Component'

  EnhancedComponent.displayName = `withCssHandles(${displayName})`

  return EnhancedComponent
}
