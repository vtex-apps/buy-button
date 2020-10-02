# Product Highlights

## Description

`ProductHighlights` is a VTEX Component that shows the general specifications of a product.
This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
  - [CSS namespaces](#css-namespaces)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `product-highlights` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json).

Now, you can change the behavior of the `product-details` through blocks. See an example of how to configure: 

```json
  "product-details": {
      "blocks": [
        "...",
        "product-highlights"
      ]
    }
```


### Configuration

Through the Storefront, you can change the `ProductDescription`'s behavior and interface. However, you also can make in your theme app, as Store Theme does.

| Prop name    | Type                | Description             | Default value |
| ------------ | ------------------- | ----------------------- | ------------- |
| `highlights` | `Array(Highlights)` | Highlights of a product | `[]`          |

Highlights:

| Prop name | Type             | Description       |
| --------- | ---------------- | ----------------- |
| `name`    | `String!`        | Highlights name   |
| `values`  | `Array(String)!` | Highlights values |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

Below, we describe the namespace that are defined in the `ProductHighlights`.

| Class name         | Description                                      | Component Source                                      |
| ------------------ | ------------------------------------------------ | ----------------------------------------------------- |
| `highlightContent` | The content of ProductHighlights section.        | [index](/react/components/ProductHighlights/index.ts) |
| `itemHighlight`    | The area that wrapper a highlight.               | [index](/react/components/ProductHighlights/index.ts) |
| `highlightTitle`   | The content that contains the highlight's title. | [index](/react/components/ProductHighlights/index.ts) |
| `highlightValue`   | The content that contains the highlight's value. | [index](/react/components/ProductHighlights/index.ts) |

