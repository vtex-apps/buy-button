# SKU Selector

## Description

`SKUSelector` is a VTEX Component that is resposible to handle events of sku selection for a product. This component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `sku-selector` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json).

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `SKUSelector` and describes if they are required or optional.

```json
  "sku-selector": {
    "component": "SKUSelector"
  }
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `SKUSelector` behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name     | Type        | Description                                    | Default value                                                             |
| ------------- | ----------- | ---------------------------------------------- | ------------------------------------------------------------------------- |
| skuSelected   | SKU!        | SKU selected                                   | -                                                                         |
| skuItems      | Array(SKU)! | List of SKU Items                              | -                                                                         |
| onSKUSelected | Function!   | Callback that is called when a SKU is selected | Function that redirects to the page with the product and the selected SKU |

SKU

| Prop name | Type          | Description           | Default value |
| --------- | ------------- | --------------------- | ------------- |
| name      | String!       | Name of the sku       | -             |
| itemId    | String!       | The SKU id            | -             |
| images    | Array(Image)! | The images of the SKU | -             |

Image

| Prop name  | Type    | Description            | Default value |
| ---------- | ------- | ---------------------- | ------------- |
| imageUrl   | String! | The URL of the image   | -             |
| imageLabel | String  | The label of the image | -             |

#### Layout API

These are properties that you can customize in your `blocks.json` file.

| Prop name                      | Type    | Description                                                                                                                                                                                         | Default value |
| ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| hideImpossibleCombinations     | Boolean | If true, if a variation option leads to a combination that does not exist, that option won't appear. If false, it will appear but won't be pressable and will appear faded, will much less opacity. | `true`        |
| maxItems                       | Number  | The maximum number of items to be displayed of a variation before showing the see more button. If the see more button should appear, it will be displayed `maxItems` - 2 options before the button  | `10`          |
| showValueNameForImageVariation | Boolean | If true, show the name for the selected image variation to the right of the variation name. For example: `Color Red`, if the red color variation is selected.                                       | `false`       |
| matchedImagesProps | This prop is used if you have color images in your catalog and you want to show them in the items of the SKU, so you just pass a string that will be present in all `imageText` attribute of the color images | `{ showMatchedImages: false, imageTextMatch: 'sku-variation' }` |
| variationsToShow | string[] | If you pass this array it will only display the passed names, if you pass a name that doesn't represent a variation it just doesn't show anything, which means that passing a empty array doesn't display any variation | Is `undefined, but shows every variation |
| bottomMargin | Enum | What kind of margin should add to the last variation element (`default`, `none`), if you pass `default` it will add the same margin that is used between variations, if you pass `none` no margin will be added | `default` |

#### Content API

These properties can be set via Storefront

| Prop name    | Type   | Description                                                                                                                                                                                                                              | Default value         |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| seeMoreLabel | String | Label of see more button that appears when more than `maxItems` items are available for one variation. The string must have a {quantity} placeholder to show the appropriate remaining items available. Example: \"See {quantity} more\" | `See {quantity} more` |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

| ClassName                     | Description                                                                     | Component Source                                                                |
| ----------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| skuSelectorContainer          | `SKUSelector` container                                                         | [SKUSelectorContainer](/react/components/SKUSelector/components/SKUSelector.js) |
| skuSelectorSubcontainer       | `SKUSelector` inner container                                                   | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorName               | `SKUSelector` name                                                              | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorNameContainer      | `SKUSelector` name container                                                    | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorTextContainer      | `SKUSelector` Text container, containing name and selected item, if requested   | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| seeMoreButton                 | `SKUSelector` see more button container                                         | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorSelectorImageValue | Name of selected image variation beside the variation name                      | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorNameSeparator      | Separator of between skuSelectorTextContainer and skuSelectorSelectorImageValue | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorOptionsList        | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorItemTextValue      | [SelectorItem](/react/components/SKUSelector/components/SelectorItem.js)        |
| skuSelectorItemImageValue     | [SelectorItem](/react/components/SKUSelector/components/SelectorItem.js)        |
