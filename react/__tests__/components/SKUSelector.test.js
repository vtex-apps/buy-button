import React from 'react'
import { render, fireEvent, act } from '@vtex/test-tools/react'

import SKUSelector from './../../SKUSelector'
import { getSKU } from 'sku-helper'

describe('<SKUSelector />', () => {
  const renderComponent = (customProps = {}) => {
    const props = {
      skuSelected: getSKU(),
      skuItems: [getSKU('Black'), getSKU('Blue'), getSKU('Yellow')],
      ...customProps,
    }
    return render(<SKUSelector {...props} />)
  }

  it('should match the snapshot', async () => {
    const { asFragment } = renderComponent()
    await Promise.resolve()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onSKUSelected', async () => {
    const onSKUSelected = jest.fn()
    const { container } = renderComponent({ onSKUSelected })
    await Promise.resolve()
    const selector = container.querySelector('.skuSelectorItem')
    act(() => {
      fireEvent.click(selector)
    })
    expect(onSKUSelected).toBeCalledTimes(2)
  })

  it('should render the options an select one', async () => {
    const defaultSeller = { commertialOffer: { Price: 15 } }
    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['1', '2', '3'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['1', '2', '3'] },
          { name: 'Color', values: ['Blue', 'Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['2'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]
    const skuSelected = skuItems[0]
    const onSKUSelected = jest.fn()
    const { getByText } = render(
      <SKUSelector
        skuItems={skuItems}
        displayMode="select"
        skuSelected={skuSelected}
        initialSelection="empty"
        onSKUSelected={onSKUSelected}
      />
    )
    await Promise.resolve()
    act(() => {
      getByText('Gray').click()
    })
    await Promise.resolve()

    act(() => {})
    act(() => {
      expect(getByText('2')).toBeDefined()
      getByText('2').click()
    })
    
    await Promise.resolve()
    expect(onSKUSelected).toBeCalledTimes(2)
    expect(getByText('1')).toBeDefined()
  })

  it('should render only three main variations', async () => {
    const defaultSeller = { commertialOffer: { Price: 15 } }
    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Blue'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['2'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]
    const skuSelected = skuItems[0]

    const { getByText, getAllByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )
    await Promise.resolve()

    expect(getAllByText(/gray/i)).toHaveLength(1)
    expect(getAllByText(/blue/i)).toHaveLength(1)
    expect(getAllByText(/black/i)).toHaveLength(1)

    expect(getByText(/color/i)).toBeInTheDocument()
    expect(getByText(/size/i)).toBeInTheDocument()
  })

  it('should render show 8 items for variation and see more button', async () => {
    const defaultSeller = { commertialOffer: { Price: 15 } }
    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Blue'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['2'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '5',
        name: 'xxxx',
        variations: [
          {
            name: 'Size',
            values: ['3'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '6',
        name: 'xxxxxx',
        variations: [
          {
            name: 'Size',
            values: ['4'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '7',
        name: 'xxxxaaaxx',
        variations: [
          {
            name: 'Size',
            values: ['5'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '8',
        name: 'aaaa',
        variations: [
          {
            name: 'Size',
            values: ['6'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '9',
        name: 'bb',
        variations: [
          {
            name: 'Size',
            values: ['7'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '10',
        name: 'ppp',
        variations: [
          {
            name: 'Size',
            values: ['1'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '11',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['8'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '12',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['9'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '13',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['10'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '14',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['11'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '15',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['12'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '16',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['13'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '17',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['14'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]
    const skuSelected = skuItems[0]

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )
    await Promise.resolve()
    expect(getByText('seeMoreLabel')).toBeDefined()
    expect(getByText('8')).toBeDefined()
    expect(queryByText('9')).toBeNull()
  })

  it('should respect given maxItems prop set and show see more button', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }
    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Blue'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['2'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '5',
        name: 'xxxx',
        variations: [
          {
            name: 'Size',
            values: ['3'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '6',
        name: 'xxxxxx',
        variations: [
          {
            name: 'Size',
            values: ['4'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '7',
        name: 'xxxxaaaxx',
        variations: [
          {
            name: 'Size',
            values: ['5'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '8',
        name: 'aaaa',
        variations: [
          {
            name: 'Size',
            values: ['6'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '9',
        name: 'bb',
        variations: [
          {
            name: 'Size',
            values: ['7'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '10',
        name: 'ppp',
        variations: [
          {
            name: 'Size',
            values: ['1'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '11',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['8'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '12',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['9'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '13',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['10'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '14',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['11'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '15',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['12'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '16',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['13'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '17',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['14'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]
    const skuSelected = skuItems[0]

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} maxItems={6} />
    )
    await Promise.resolve()
    expect(getByText('seeMoreLabel'))
    expect(getByText('4')).toBeDefined()
    expect(queryByText('5')).toBeNull()
  })

  it('should show all variations when count is inside threshold', async () => {
    const defaultSeller = { commertialOffer: { Price: 15 } }
    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Blue'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['2'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '5',
        name: 'xxxx',
        variations: [
          {
            name: 'Size',
            values: ['3'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '6',
        name: 'xxxxxx',
        variations: [
          {
            name: 'Size',
            values: ['4'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '7',
        name: 'xxxxaaaxx',
        variations: [
          {
            name: 'Size',
            values: ['5'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '8',
        name: 'aaaa',
        variations: [
          {
            name: 'Size',
            values: ['6'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '9',
        name: 'bb',
        variations: [
          {
            name: 'Size',
            values: ['7'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '10',
        name: 'ppp',
        variations: [
          {
            name: 'Size',
            values: ['1'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '11',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['8'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '12',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['9'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '13',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['10'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]
    const skuSelected = skuItems[0]

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )
    await Promise.resolve()
    expect(queryByText('seeMoreLabel')).toBeNull()
    expect(getByText('10')).toBeDefined()
  })

  it('should show all options if a sku selected variations appears later on the array than in the cut', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }
    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Blue'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['2'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '5',
        name: 'xxxx',
        variations: [
          {
            name: 'Size',
            values: ['3'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '6',
        name: 'xxxxxx',
        variations: [
          {
            name: 'Size',
            values: ['4'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '7',
        name: 'xxxxaaaxx',
        variations: [
          {
            name: 'Size',
            values: ['5'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '8',
        name: 'aaaa',
        variations: [
          {
            name: 'Size',
            values: ['6'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '9',
        name: 'bb',
        variations: [
          {
            name: 'Size',
            values: ['7'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '10',
        name: 'ppp',
        variations: [
          {
            name: 'Size',
            values: ['1'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '11',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['8'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '12',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['9'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '13',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['10'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '14',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['11'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '15',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['12'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '16',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['13'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '17',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['14'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]
    const skuSelected = skuItems.find(({ itemId }) => itemId === '15')

    const { getByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} maxItems={6} />
    )
    await Promise.resolve()
    act(() => {})
    await Promise.resolve()
    expect(getByText('4')).toBeDefined()
    expect(getByText('12')).toBeDefined()
  })

  it('remove accent from names on slugify methods', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }
    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['[Square Brackets]'] },
          { name: 'Color', values: ['Jácó'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['[Square Brackets]'] },
          { name: 'Color', values: ['@@Testing&&'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['[Square Brackets]'] },
          { name: 'Color', values: ["John's"] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['[Square Brackets]'] },
          { name: 'Color', values: ['Feijão'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]

    const { queryByText } = render(
      <SKUSelector skuSelected={skuItems[0]} skuItems={skuItems} maxItems={6} />
    )
    await Promise.resolve()
    expect(queryByText('skuSelectorItem--feijao')).toBeDefined()
    expect(queryByText('skuSelectorItem--square-brackets')).toBeDefined()
    expect(queryByText('skuSelectorItem--johns')).toBeDefined()
    expect(queryByText('skuSelectorItem--testing')).toBeDefined()
    expect(queryByText('skuSelectorItem--jaco')).toBeDefined()
  })

  it('should show the selected variation name', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]

    const { debug, container } = render(
      <SKUSelector
        skuSelected={skuItems[0]}
        skuItems={skuItems}
        maxItems={6}
        showValueNameForImageVariation={true}
      />
    )

    await Promise.resolve()

    const separator = container.querySelector('.skuSelectorNameSeparator')
    const variationValue = container.querySelector(
      '.skuSelectorSelectorImageValue'
    )

    expect(separator).toHaveTextContent(':')
    expect(variationValue).toHaveTextContent('Gray')
  })
})
