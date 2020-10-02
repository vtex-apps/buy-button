import React from 'react'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../node_modules/@vtex/test-tools/react... Remove this comment to see the full error message
import { render, wait } from '@vtex/test-tools/react'

import ProductBrand from '../../ProductBrand'
import brandLogoQuery from '../../components/ProductBrand/productBrand.gql'

const mocks = [
  {
    request: {
      query: brandLogoQuery,
      variables: {
        id: 2000850,
      },
    },
    result: {
      data: {
        brand: {
          slug: 'billabong',
          imageUrl: '/220310/billabong.jpg',
        },
      },
    },
  },
]

describe('<ProductBrand /> component', () => {
  const renderComponent = (logoRedirect: any) => {
    const props = {
      displayMode: 'logo',
      fallbackToText: true,
      loadingPlaceholder: 'logo',
      height: 100,
      excludeBrands: [],
      logoWithLink: logoRedirect,
    }

    const comp = <ProductBrand {...props} />

    return render(comp, { graphql: { mocks } })
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('brand image should not have a link', async () => {
    const { queryByTestId } = renderComponent(false)

    await wait(() => {
      jest.runAllTimers()
    })
    expect(queryByTestId('logo-redirect')).toBeNull()
  })

  it('brand image should have a link', async () => {
    const { getByTestId } = renderComponent(true)

    await wait(() => {
      jest.runAllTimers()
    })

    expect(getByTestId('logo-redirect')).toBeDefined()
  })
})
