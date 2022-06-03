import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface EmptyProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 自定义展位图
   */
  image?: string;
  /**
   * 空状态尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 空状态显示类型
   * @default default
   */
  type?: 'default' | 'shoppingTrolley' | 'favorite' | 'gold';
}

const Empty: React.FC<EmptyProps> = (props) => {
  const {
    children = '暂无数据',
    className,
    image,
    size,
    style,
    type = 'default',
    ...restProps
  } = props;

  return (
    <div
      className={classNames(
        'i-empty',
        size === 'small' && 'i-empty--size-small',
        size === 'large' && 'i-empty--size-large',
        className,
      )}
      style={{ ...style }}
      {...restProps}
    >
      <div className="i-empty-image">
        {/* 标准空 */}
        {!image && type === 'default' && (
          <svg
            width="640"
            height="420"
            viewBox="0 0 640 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_44_427)">
              <path
                d="M321.95 420.27C484.62 420.27 616.49 386.772 616.49 345.45C616.49 304.128 484.62 270.63 321.95 270.63C159.28 270.63 27.4102 304.128 27.4102 345.45C27.4102 386.772 159.28 420.27 321.95 420.27Z"
                fill="url(#paint0_linear_44_427)"
              />
              <path
                d="M153.05 91.3007L315.55 39V183.15L178.98 133.141L153.05 91.3007Z"
                fill="url(#paint1_linear_44_427)"
              />
              <path
                d="M315.55 39L516.65 87.3753L484.95 269.441L315.55 217.469V39Z"
                fill="url(#paint2_linear_44_427)"
              />
              <path
                d="M153.05 91.3008L332.83 144.259V384.82L153.05 321.413V91.3008Z"
                fill="url(#paint3_linear_44_427)"
              />
              <path
                d="M516.65 87.3755V325.338L332.83 384.82V144.26L516.65 87.3755Z"
                fill="url(#paint4_linear_44_427)"
              />
              <path
                d="M268.01 238.06L107.24 170.399L153.05 91.3008L332.83 144.259L268.01 238.06Z"
                fill="url(#paint5_linear_44_427)"
              />
              <path
                d="M516.65 87.3755L582.62 159.621L401.98 238.061L332.83 144.26L516.65 87.3755Z"
                fill="url(#paint6_linear_44_427)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_44_427"
                x1="321.954"
                y1="270.635"
                x2="321.954"
                y2="420.274"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EAEAEA" />
                <stop offset="1" stopColor="#FCFCFC" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_44_427"
                x1="234.299"
                y1="183.151"
                x2="234.299"
                y2="39.0045"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1119" stopColor="#DADCE1" />
                <stop offset="0.9205" stopColor="#DFE1E4" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_44_427"
                x1="416.096"
                y1="269.442"
                x2="416.096"
                y2="39.0045"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="#EBEEF2" />
                <stop offset="1" stopColor="#E8EAEE" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_44_427"
                x1="332.832"
                y1="238.064"
                x2="153.052"
                y2="238.064"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="#E7E8EC" />
                <stop offset="1" stopColor="#F9F9FA" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_44_427"
                x1="344.5"
                y1="392.467"
                x2="536.021"
                y2="100.071"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1119" stopColor="#DADCE2" />
                <stop offset="0.9205" stopColor="#DADCE2" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_44_427"
                x1="332.832"
                y1="164.683"
                x2="107.242"
                y2="164.683"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="#F6F7FA" />
                <stop offset="1" stopColor="#F6F7FA" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_44_427"
                x1="582.624"
                y1="162.722"
                x2="332.832"
                y2="162.722"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="#F6F7FA" />
                <stop offset="1" stopColor="#F6F7FA" />
              </linearGradient>
              <clipPath id="clip0_44_427">
                <rect width="640" height="420" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}

        {/* 空购物车 */}
        {!image && type === 'shoppingTrolley' && (
          <svg
            width="640"
            height="420"
            viewBox="0 0 640 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M319.54 419.64C482.21 419.64 614.08 386.142 614.08 344.82C614.08 303.498 482.21 270 319.54 270C156.87 270 25 303.498 25 344.82C25 386.142 156.87 419.64 319.54 419.64Z"
              fill="url(#paint0_linear_45_498)"
            />
            <path
              d="M351.625 324.404C360.825 324.523 368.491 317.05 368.748 307.713C369.005 298.376 361.755 290.709 352.555 290.59C343.355 290.471 335.689 297.944 335.432 307.281C335.176 316.618 342.426 324.285 351.625 324.404Z"
              fill="url(#paint1_linear_45_498)"
            />
            <path
              d="M162.524 356.454C171.724 356.574 179.39 349.101 179.647 339.763C179.904 330.426 172.654 322.76 163.454 322.641C154.254 322.521 146.588 329.994 146.331 339.332C146.075 348.669 153.324 356.335 162.524 356.454Z"
              fill="url(#paint2_linear_45_498)"
            />
            <path
              d="M179.019 325.468L290.819 349.376L307.209 345.137L195.805 321.454L179.019 325.468Z"
              fill="#DADCE2"
            />
            <path
              d="M363.5 295L474.121 307.028L471.446 299.271L361.5 287.5L363.5 295Z"
              fill="#DADCE2"
            />
            <path
              d="M272.67 243.621L245.86 307.608L253.778 306.247L280.332 242.794L272.67 243.621Z"
              fill="#DADCE2"
            />
            <path
              d="M391.152 234.045L362.078 332.639L369.786 330.849L398.327 233.73L391.152 234.045Z"
              fill="#DADCE2"
            />
            <path
              d="M342.377 237.328L353.925 288.288L160.622 323.776L168.777 329.729L364 295L350.023 236.014L342.377 237.328Z"
              fill="#DADCE2"
            />
            <path
              d="M442.396 228.376L472.01 305.108L252.407 357.548L264.933 362.947L484.845 311.341L451.925 227.041L442.396 228.376Z"
              fill="#DADCE2"
            />
            <path
              d="M254.526 390.045C263.725 390.164 271.392 382.692 271.648 373.354C271.905 364.017 264.655 356.351 255.455 356.232C246.255 356.112 238.589 363.585 238.332 372.922C238.076 382.26 245.326 389.926 254.526 390.045Z"
              fill="url(#paint3_linear_45_498)"
            />
            <path
              d="M472.034 339.254C481.233 339.373 488.9 331.9 489.156 322.563C489.413 313.226 482.163 305.56 472.963 305.44C463.763 305.321 456.097 312.794 455.84 322.131C455.584 331.469 462.834 339.135 472.034 339.254Z"
              fill="url(#paint4_linear_45_498)"
            />
            <path
              d="M499.374 83.6828L512.771 66.5601L543.616 62.3094C549.18 57.3794 548.749 53.5105 542.322 50.7027C533.22 51.8835 521.193 53.5577 506.24 55.7253L487.084 80.4781L499.374 83.6828Z"
              fill="url(#paint5_linear_45_498)"
            />
            <path
              d="M397.717 62.3359L411.114 45.2132L441.959 40.9626C447.523 36.0326 447.091 32.1636 440.664 29.3559C431.563 30.5367 419.536 32.2109 404.583 34.3785L385.426 59.1313L397.717 62.3359Z"
              fill="url(#paint6_linear_45_498)"
            />
            <path
              d="M153.81 119.701L389 55L385.217 180.046L169 215.811L153.81 119.701Z"
              fill="url(#paint7_linear_45_498)"
            />
            <path
              d="M389 55L384.963 183.544L445.269 229.54L499.972 83.065L389 55Z"
              fill="url(#paint8_linear_45_498)"
            />
            <path
              d="M153.9 120.275L161.761 222.009L236.833 248.571L239.839 138.915L153.9 120.275Z"
              fill="url(#paint9_linear_45_498)"
            />
            <path
              d="M239.832 139.51L500 82.9999L456.662 229.533L236.833 248.574L239.832 139.51Z"
              fill="url(#paint10_linear_45_498)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_45_498"
                x1="319.544"
                y1="270.005"
                x2="319.544"
                y2="419.644"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EAEAEA" />
                <stop offset="1" stopColor="#FCFCFC" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_45_498"
                x1="352.555"
                y1="290.591"
                x2="352.117"
                y2="324.411"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DADCE2" />
                <stop offset="1" stopColor="#DBDDE2" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_45_498"
                x1="163.454"
                y1="322.642"
                x2="163.016"
                y2="356.462"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DADCE2" />
                <stop offset="1" stopColor="#DBDDE2" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_45_498"
                x1="255.455"
                y1="356.233"
                x2="255.017"
                y2="390.052"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DADCE2" />
                <stop offset="1" stopColor="#DBDDE2" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_45_498"
                x1="472.963"
                y1="305.441"
                x2="472.525"
                y2="339.261"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DADCE2" />
                <stop offset="1" stopColor="#DBDDE2" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_45_498"
                x1="527.514"
                y1="73.132"
                x2="501.218"
                y2="46.8594"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DBDDE2" />
                <stop offset="1" stopColor="#E7EAF0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_45_498"
                x1="425.857"
                y1="51.7852"
                x2="399.561"
                y2="25.5126"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DBDDE3" />
                <stop offset="1" stopColor="#E7EAF0" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_45_498"
                x1="309.095"
                y1="182.086"
                x2="201.899"
                y2="44.2478"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DADCE1" />
                <stop offset="1" stopColor="#E7EAF0" />
                <stop offset="1" stopColor="#DFE1E4" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_45_498"
                x1="447.955"
                y1="241.645"
                x2="378.49"
                y2="51.4148"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EBEEF2" />
                <stop offset="1" stopColor="#E8EAEE" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_45_498"
                x1="200.472"
                y1="256.949"
                x2="147.529"
                y2="117.292"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#E8E9ED" />
                <stop offset="1" stopColor="#F9F9FA" />
              </linearGradient>
              <linearGradient
                id="paint10_linear_45_498"
                x1="412.293"
                y1="206.408"
                x2="296.778"
                y2="71.826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DADCE2" />
                <stop offset="1" stopColor="#E7EAF0" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* 空收藏夹 */}
        {!image && type === 'favorite' && (
          <svg
            width="640"
            height="420"
            viewBox="0 0 640 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_45_535)">
              <path
                d="M321.64 420.29C484.31 420.29 616.18 386.792 616.18 345.47C616.18 304.148 484.31 270.65 321.64 270.65C158.97 270.65 27.1 304.148 27.1 345.47C27.1 386.792 158.97 420.29 321.64 420.29Z"
                fill="url(#paint0_linear_45_535)"
              />
              <path
                d="M449.878 85.48H317.528V63.01C317.528 51.96 308.568 43 297.518 43H183.768C172.718 43 163.758 51.96 163.758 63.01V317.18H317.518V278.91H469.878V105.49C469.888 94.43 460.928 85.48 449.878 85.48Z"
                fill="url(#paint1_linear_45_535)"
              />
              <path
                d="M489.008 132.64H219.238C208.668 132.64 199.548 140.39 197.358 151.22L163.918 316.61C160.968 331.19 171.578 344.91 185.798 344.91H451.848C462.228 344.91 471.238 337.43 473.618 326.84L510.768 161.45C514.088 146.73 503.438 132.64 489.008 132.64Z"
                fill="url(#paint2_linear_45_535)"
              />
              <g filter="url(#filter0_ii_45_535)">
                <path
                  d="M346.438 181.2L360.638 209.98C361.728 212.18 363.828 213.71 366.258 214.06L398.018 218.68C404.138 219.57 406.588 227.09 402.158 231.41L379.178 253.81C377.418 255.52 376.618 257.99 377.028 260.42L382.458 292.05C383.508 298.15 377.108 302.8 371.628 299.92L343.218 284.98C341.048 283.84 338.448 283.84 336.268 284.98L307.858 299.92C302.378 302.8 295.988 298.15 297.028 292.05L302.458 260.42C302.878 258 302.068 255.53 300.308 253.81L277.328 231.41C272.898 227.09 275.338 219.57 281.468 218.68L313.228 214.06C315.658 213.71 317.758 212.18 318.848 209.98L333.048 181.2C335.788 175.66 343.698 175.66 346.438 181.2Z"
                  fill="url(#paint3_linear_45_535)"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_ii_45_535"
                x="265.065"
                y="167.045"
                width="149.354"
                height="143.75"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="-10" dy="-10" />
                <feGaussianBlur stdDeviation="15" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_45_535" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="10" dy="10" />
                <feGaussianBlur stdDeviation="15" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.12 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_innerShadow_45_535"
                  result="effect2_innerShadow_45_535"
                />
              </filter>
              <linearGradient
                id="paint0_linear_45_535"
                x1="321.644"
                y1="270.655"
                x2="321.644"
                y2="420.294"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EAEAEA" />
                <stop offset="1" stopColor="#FCFCFC" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_45_535"
                x1="316.823"
                y1="317.176"
                x2="316.823"
                y2="42.9974"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1119" stopColor="#DADCE2" />
                <stop offset="0.9205" stopColor="#E9ECF0" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_45_535"
                x1="260.466"
                y1="105.51"
                x2="413.415"
                y2="370.427"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="#F6F7F8" />
                <stop offset="0.7879" stopColor="#DFE1E7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_45_535"
                x1="311.792"
                y1="192.347"
                x2="375.325"
                y2="302.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="#E1E6EC" />
                <stop offset="1" stopColor="#E1E5EB" />
              </linearGradient>
              <clipPath id="clip0_45_535">
                <rect width="640" height="420" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}

        {/* 空金币 */}
        {!image && type === 'gold' && (
          <svg
            width="640"
            height="420"
            viewBox="0 0 640 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_45_549)">
              <path
                d="M321.74 420.12C484.41 420.12 616.28 386.622 616.28 345.3C616.28 303.978 484.41 270.48 321.74 270.48C159.07 270.48 27.2 303.978 27.2 345.3C27.2 386.622 159.07 420.12 321.74 420.12Z"
                fill="url(#paint0_linear_45_549)"
              />
              <path
                d="M500.13 335.43C506.895 335.43 512.38 329.945 512.38 323.18C512.38 316.414 506.895 310.93 500.13 310.93C493.364 310.93 487.88 316.414 487.88 323.18C487.88 329.945 493.364 335.43 500.13 335.43Z"
                fill="url(#paint1_linear_45_549)"
              />
              <path
                d="M307.56 365.08C404.508 365.08 483.1 286.488 483.1 189.54C483.1 92.5919 404.508 14 307.56 14C210.612 14 132.02 92.5919 132.02 189.54C132.02 286.488 210.612 365.08 307.56 365.08Z"
                fill="url(#paint2_linear_45_549)"
              />
              <path
                d="M315.75 365.08C408.175 365.08 483.1 290.155 483.1 197.73C483.1 105.305 408.175 30.38 315.75 30.38C223.325 30.38 148.4 105.305 148.4 197.73C148.4 290.155 223.325 365.08 315.75 365.08Z"
                fill="url(#paint3_linear_45_549)"
              />
              <g filter="url(#filter0_ii_45_549)">
                <path
                  d="M315.75 324.28C385.642 324.28 442.3 267.622 442.3 197.73C442.3 127.838 385.642 71.1799 315.75 71.1799C245.858 71.1799 189.2 127.838 189.2 197.73C189.2 267.622 245.858 324.28 315.75 324.28Z"
                  fill="url(#paint4_linear_45_549)"
                />
              </g>
              <g filter="url(#filter1_dd_45_549)">
                <path
                  d="M321.45 127.93L339.74 164.98C340.67 166.86 342.45 168.16 344.52 168.46L385.41 174.4C390.62 175.16 392.7 181.56 388.93 185.24L359.34 214.08C357.84 215.54 357.16 217.64 357.51 219.7L364.49 260.43C365.38 265.62 359.93 269.58 355.27 267.13L318.7 247.9C316.85 246.93 314.64 246.93 312.79 247.9L276.22 267.13C271.56 269.58 266.11 265.62 267 260.43L273.98 219.7C274.33 217.64 273.65 215.54 272.15 214.08L242.56 185.24C238.79 181.56 240.87 175.16 246.08 174.4L286.97 168.46C289.04 168.16 290.83 166.86 291.75 164.98L310.04 127.93C312.38 123.21 319.12 123.21 321.45 127.93Z"
                  fill="url(#paint5_linear_45_549)"
                />
              </g>
              <path
                d="M427.41 396.12C469.163 396.12 503.01 382.899 503.01 366.59C503.01 350.281 469.163 337.06 427.41 337.06C385.657 337.06 351.81 350.281 351.81 366.59C351.81 382.899 385.657 396.12 427.41 396.12Z"
                fill="url(#paint6_linear_45_549)"
              />
              <path
                d="M427.41 373.55C469.163 373.55 503.01 360.329 503.01 344.02C503.01 327.711 469.163 314.49 427.41 314.49C385.657 314.49 351.81 327.711 351.81 344.02C351.81 360.329 385.657 373.55 427.41 373.55Z"
                fill="url(#paint7_linear_45_549)"
              />
              <path
                d="M427.41 350.99C469.163 350.99 503.01 337.769 503.01 321.46C503.01 305.151 469.163 291.93 427.41 291.93C385.657 291.93 351.81 305.151 351.81 321.46C351.81 337.769 385.657 350.99 427.41 350.99Z"
                fill="url(#paint8_linear_45_549)"
              />
              <path
                d="M427.41 328.43C469.163 328.43 503.01 315.209 503.01 298.9C503.01 282.591 469.163 269.37 427.41 269.37C385.657 269.37 351.81 282.591 351.81 298.9C351.81 315.209 385.657 328.43 427.41 328.43Z"
                fill="url(#paint9_linear_45_549)"
              />
            </g>
            <defs>
              <filter
                id="filter0_ii_45_549"
                x="184.2"
                y="66.1799"
                width="263.1"
                height="263.1"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="-5" dy="-5" />
                <feGaussianBlur stdDeviation="7.5" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_45_549" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="5" dy="5" />
                <feGaussianBlur stdDeviation="7.5" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.06 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_innerShadow_45_549"
                  result="effect2_innerShadow_45_549"
                />
              </filter>
              <filter
                id="filter1_dd_45_549"
                x="160.635"
                y="44.3901"
                width="310.22"
                height="303.483"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="-20" dy="-20" />
                <feGaussianBlur stdDeviation="30" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_45_549"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="20" dy="20" />
                <feGaussianBlur stdDeviation="30" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.803922 0 0 0 0 0.803922 0 0 0 0 0.811765 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow_45_549"
                  result="effect2_dropShadow_45_549"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow_45_549"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_45_549"
                x1="321.744"
                y1="270.485"
                x2="321.744"
                y2="420.124"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EAEAEA" />
                <stop offset="1" stopColor="#FCFCFC" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_45_549"
                x1="512.383"
                y1="323.181"
                x2="487.879"
                y2="323.181"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1119" stopColor="#F1F3F6" />
                <stop offset="0.9205" stopColor="#D2D9E3" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_45_549"
                x1="395.347"
                y1="341.584"
                x2="219.78"
                y2="37.4937"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1119" stopColor="#E9E9E9" />
                <stop offset="0.9205" stopColor="#F8F8F8" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_45_549"
                x1="232.063"
                y1="52.7741"
                x2="399.44"
                y2="342.68"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="#FBFBFC" />
                <stop offset="1" stopColor="#E5E6EA" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_45_549"
                x1="425.368"
                y1="261.014"
                x2="206.135"
                y2="134.44"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1119" stopColor="#FBFBFC" />
                <stop offset="0.9205" stopColor="#DADCE2" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_45_549"
                x1="283.287"
                y1="142.132"
                x2="356.892"
                y2="269.621"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="white" />
                <stop offset="1" stopColor="#DADCE2" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_45_549"
                x1="427.415"
                y1="337.058"
                x2="427.415"
                y2="396.115"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1119" stopColor="#DADCE2" />
                <stop offset="0.9205" stopColor="#DADCE2" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_45_549"
                x1="351.814"
                y1="344.023"
                x2="503.015"
                y2="344.023"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="white" />
                <stop offset="1" stopColor="#DADCE2" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_45_549"
                x1="427.415"
                y1="291.931"
                x2="427.415"
                y2="350.988"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.1119" stopColor="#DADCE2" />
                <stop offset="0.9205" stopColor="#DADCE2" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_45_549"
                x1="351.814"
                y1="298.897"
                x2="503.015"
                y2="298.897"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0884" stopColor="white" />
                <stop offset="1" stopColor="#DADCE2" />
              </linearGradient>
              <clipPath id="clip0_45_549">
                <rect width="640" height="420" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}

        {/* 自定义展位图 */}
        {image && <img src={image} />}
      </div>
      <div className="i-empty-description">{children}</div>
    </div>
  );
};

Empty.displayName = 'Empty';

export default Empty;
