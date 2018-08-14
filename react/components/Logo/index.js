import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './global.css'

/**
 * Logo of the store
 */
export default class Logo extends Component {
  static propTypes = {
    /** URL of the logo */
    url: PropTypes.string,
    /** Title to be displayed as alt text */
    title: PropTypes.string.isRequired,
    /** Logo's color */
    color: PropTypes.string,
    /** Logo's width */
    width: PropTypes.number,
    /** Logo's height */
    height: PropTypes.number,
    /** Set label visibility */
    showLabel: PropTypes.bool,
  }

  static defaultProps = {
    title: 'VTEX logo',
    color: '#F71963',
    showLabel: true,
    width: 493,
    height: 177,
  }

  render() {
    const { width, height, color, showLabel, url, title } = this.props

    if (url) {
      return <img className="vtex-logo" src={url} alt={title} />
    }

    if (!showLabel) {
      return (
        <div className="vtex-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24">
            <path fill={color} d="M22.2029951,2 L4.28456322,2 C2.89573023,2 2.00548,3.45312422 2.65431247,4.64375547 L4.44783693,7.95552421 L1.19680743,7.95552421 C0.296493196,7.95552421 -0.280470412,8.85287845 0.140086685,9.62472859 L5.90522357,20.1887392 C6.35336788,21.0110278 7.56744234,21.0045158 8.01748106,20.1831745 L9.58332217,17.3210893 L11.5485268,20.925543 C12.2398649,22.1940814 14.1130726,22.195147 14.8071339,20.9280294 L23.7877802,4.5463122 C24.4227598,3.38729378 23.5564264,2 22.2029951,2 M14.1533286,8.98098734 L10.2804619,16.0501827 C9.98102805,16.5965991 9.17318428,16.5957703 8.87505286,16.0487619 L5.03936375,9.00975856 C4.75958436,8.4962574 5.14355582,7.87820895 5.74242344,7.87820895 L13.4699233,7.87820895 C14.0535173,7.87820895 14.427188,8.48110219 14.1533286,8.98098734" className="fill-rebel-pink">
            </path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </div>
      )
    }

    return (
      <div className="vtex-logo">
        <svg width={width} height={height} viewBox="0 0 493 177" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0)">
            <rect width="493" height="177" fill="transparent" />
            <rect width="492.709" height="177.432" fill="black" fillOpacity="0" />
            <rect width="492.709" height="177.432" fill="black" fillOpacity="0" />
            <path d="M459.182 74.7891C462.828 68.8751 466.654 63.3441 469.745 57.4291C471.732 53.6261 474.171 51.6711 477.956 51.6191C478.599 51.6101 489.524 51.7501 490.037 51.7801C490.557 51.8111 491.041 51.9781 491.403 52.5341C492.191 53.7461 491.044 54.5111 490.531 55.3291C483.776 66.0991 477.015 76.8651 470.15 87.5651C469.144 89.1331 469.158 90.2231 470.146 91.7631C477.343 102.984 484.46 114.257 491.567 125.535C492.088 126.361 493.213 127.171 492.455 128.333C491.776 129.373 490.56 129.088 489.521 129.092C485.016 129.106 480.509 129.009 476.007 129.136C473.778 129.199 472.456 128.318 471.312 126.454C467.296 119.909 463.14 113.449 459.015 106.971C458.604 106.326 458.397 105.487 457.459 105.125C453.373 112.131 449.223 119.108 445.23 126.173C444.207 127.983 443.001 128.961 441.165 129.159C440.78 129.201 427.799 129.342 426.961 129.259C426.347 129.198 425.808 128.949 425.459 128.259C424.69 126.735 426.274 125.525 427.001 124.304C433.456 113.456 439.94 102.625 446.514 91.8481C447.555 90.1411 447.672 88.9571 446.506 87.1701C439.559 76.5241 432.777 65.7701 425.955 55.0421C425.502 54.3301 424.667 53.6441 425.17 52.6731C425.57 51.9001 426.261 51.8081 426.974 51.8141C427.242 51.8161 441.85 51.7731 441.994 51.7771C443.981 51.8241 445.247 52.6921 446.303 54.3961C449.93 60.2501 453.641 66.0521 457.321 71.8731C457.881 72.7621 458.452 73.6471 459.182 74.7891Z" fill={color} />
            <path d="M238.785 51.937C240.416 52.032 241.223 52.917 241.709 54.762C245.46 69.001 249.337 83.207 253.172 97.423C254.159 101.083 255.122 104.75 256.141 108.402C256.406 109.353 256.318 110.718 257.841 110.679C259.335 110.641 259.248 109.252 259.501 108.322C264.308 90.624 269.117 72.927 273.802 55.196C274.428 52.827 275.394 51.781 277.944 51.922C281.554 52.121 285.183 51.962 288.805 51.975C292.138 51.988 292.589 52.579 291.697 55.731C287.327 71.176 282.95 86.619 278.582 102.065C277.143 107.155 275.725 112.252 274.3 117.346C272.098 125.22 265.872 130.14 258.136 130.118C249.487 130.093 243.889 125.829 241.475 117.439C235.574 96.93 229.67 76.4219 223.766 55.914C222.814 52.607 223.144 52.021 226.36 51.975C226.45 51.975 238.552 51.923 238.785 51.937Z" fill={color} />
            <path d="M366.605 90.4879C366.605 83.9529 366.435 77.4119 366.642 70.8839C367.015 59.1139 373.351 52.506 385.041 51.28C393.886 50.352 402.67 51.117 411.462 52.026C413.936 52.282 415.105 53.2809 414.883 55.9079C414.697 58.0999 414.857 60.321 414.842 62.529C414.821 65.604 414.345 66.104 411.339 66.111C404.539 66.126 397.738 66.095 390.938 66.124C386.024 66.145 384.418 67.675 384.226 72.57C384.126 75.128 384.3 77.698 384.15 80.251C384.042 82.091 384.617 82.677 386.5 82.654C394.447 82.557 402.397 82.606 410.345 82.616C413.632 82.62 413.954 82.957 413.97 86.29C413.982 88.675 413.871 91.0649 414 93.4419C414.134 95.9079 412.974 96.726 410.677 96.713C402.729 96.666 394.779 96.7579 386.832 96.6509C384.8 96.6239 383.992 97.108 384.138 99.275C384.328 102.089 384.145 104.925 384.2 107.75C384.304 113.043 386.005 114.742 391.247 114.766C397.959 114.796 404.671 114.764 411.383 114.778C414.477 114.784 414.865 115.189 414.88 118.324C414.892 120.885 414.845 123.447 414.893 126.007C414.924 127.628 414.177 128.486 412.61 128.68C402.777 129.895 392.907 130.758 383.054 129.259C372.791 127.697 367.158 121.367 366.699 110.886C366.402 104.099 366.643 97.289 366.643 90.489C366.632 90.488 366.618 90.4879 366.605 90.4879Z" fill={color} />
            <path d="M338.508 97.3801C338.508 106.653 338.512 115.925 338.506 125.198C338.504 128.639 338.033 129.088 334.479 129.096C331.212 129.103 327.944 129.104 324.677 129.096C321.098 129.088 320.686 128.694 320.685 125.172C320.679 106.715 320.624 88.2581 320.747 69.8021C320.765 67.1431 320.143 66.3041 317.421 66.4581C313.02 66.7061 308.593 66.4711 304.179 66.5471C301.865 66.5871 300.732 65.7631 300.833 63.3001C300.953 60.3911 300.885 57.4721 300.855 54.5591C300.836 52.6891 301.676 51.8171 303.574 51.8191C320.883 51.8361 338.192 51.8371 355.501 51.8181C357.571 51.8161 358.3 52.8451 358.258 54.7971C358.196 57.7101 358.176 60.6271 358.264 63.5391C358.331 65.7361 357.288 66.5501 355.221 66.5351C350.541 66.5021 345.855 66.6551 341.182 66.4691C338.892 66.3781 338.433 67.1631 338.459 69.2981C338.574 78.6581 338.508 88.0191 338.508 97.3801Z" fill={color} />
            <path d="M202.87 4.67C199.423 1.167 195.106 -0.000999786 190.333 2.14237e-07C139.8 0.00900021 89.2666 0.00500345 38.7346 0.00800345C36.6996 0.00800345 34.6716 0.154999 32.7076 0.724999C22.8446 3.585 18.1666 14.305 22.8926 23.649C27.5536 32.864 32.4286 41.971 37.2836 51.086C38.1916 52.79 38.0726 53.296 35.9976 53.274C27.6056 53.188 19.2126 53.197 10.8196 53.251C1.94464 53.308 -2.59436 60.989 1.54664 68.873C3.80464 73.172 6.10264 77.45 8.37164 81.743C22.3546 108.197 36.3506 134.643 50.2956 161.118C52.3996 165.113 55.4176 167.741 60.0176 167.761C64.7346 167.781 67.8186 165.136 69.9066 160.987C72.8036 155.233 75.8976 149.577 78.9216 143.887C80.1136 141.644 81.3426 139.422 82.5706 137.162C83.5376 137.79 83.7416 138.693 84.1436 139.45C89.2366 149.037 94.3236 158.627 99.3816 168.233C100.466 170.291 101.772 172.154 103.57 173.638C111.635 180.294 123.017 177.96 128.084 168.459C147.025 132.943 165.905 97.394 184.799 61.853C191.594 49.072 198.387 36.289 205.144 23.488C208.689 16.771 207.805 9.685 202.87 4.67ZM121.97 62.967C110.982 83.613 99.9426 104.231 88.9646 124.882C87.6016 127.445 85.6726 129.078 82.7526 129.114C79.7036 129.152 77.7126 127.444 76.3136 124.802C65.4876 104.37 54.7396 83.895 43.7006 63.579C40.6856 58.031 44.3166 52.973 49.9446 53.161C60.9736 53.53 72.0246 53.269 83.0656 53.269C94.1066 53.269 105.149 53.259 116.191 53.273C122.459 53.282 124.937 57.394 121.97 62.967Z" fill={color} />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="493" height="177" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    )
  }
}
