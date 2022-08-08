import React from 'react';
import './index.scss';
import { InputSliderProps } from './type'

const InputSlider: React.FC<InputSliderProps> = (props) => {
  const {
    left,
    top,
    translateX,
    translateY
  } = props;

  return (
    <div
      className="i-input-number-scrubbable"
      style={{
        left: left,
        top: top,
        transform: `translate(${translateX}px,${translateY}px)`,
      }}
    >
      <svg
        width="30"
        height="19"
        viewBox="0 0 30 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_7775_2255)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 8.999V9.004L8.997 15L8.998 11.001H10.997H21V15L27 9L21 3V7.022H10.997H8.997L8.998 3L3 8.999ZM4.411 9.002L7.998 5.414L7.997 8.001H11.497H22V5.414L25.5 9L22 12.587V10L11.497 10.002L7.998 10.001L7.997 12.587L4.411 9.002Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.4971 10.0015L22 10.0005V12.5875L25.5 9L22 5.41451V8.02151H11.4971H7.99707V5.41451L4.41107 9.0015L7.99707 12.5875V10.0005L11.4971 10.0015Z"
            fill="black"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_7775_2255"
            x="-0.6"
            y="-1.6"
            width="31.2"
            height="23.2"
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
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.3" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0" />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_7775_2255"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_7775_2255"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default InputSlider;
