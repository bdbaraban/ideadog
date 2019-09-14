import React, { ReactElement } from 'react';

/**
 * Sad Tully logo SVG
 * @param size - width/height to render the SVG with
 * @param id - ID specific to instane of SVG.
 */
const SadTully = (size: number, id: string): ReactElement => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 445 348"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#clip0_sad_${id})`} filter={`url(#filter0_sad_${id})`}>
        <path
          d="M60.21 105.025L158.611 20.731L224.977 14.1725L291.304 20.2229L390.409 106.244L376.015 239.818L295.292 333.993L156.948 333.51L75.5328 238.683L60.21 105.025Z"
          fill="#FBE8A6"
          stroke="#837A75"
          strokeWidth="10"
        />
        <g filter={`url(#filter1_sad_${id})`}>
          <path
            d="M440.212 1.14291L440.212 188.5L243.138 1.14293L440.212 1.14291Z"
            fill="#ED6A5A"
          />
          <path
            d="M255.643 6.13101L435.2 6.131L435.2 176.835L255.643 6.13101Z"
            stroke="#837A75"
            strokeWidth="10"
          />
        </g>
        <g filter={`url(#filter2_sad_${id})`}>
          <path
            d="M4.25363 1.14289L4.25362 188.5L201.328 1.14291L4.25363 1.14289Z"
            fill="#FBE8A6"
          />
          <path
            d="M188.823 6.13099L9.26551 6.13098L9.26552 176.835L188.823 6.13099Z"
            stroke="#837A75"
            strokeWidth="10"
          />
        </g>
        <g filter={`url(#filter3_sad_${id})`}>
          <path
            d="M257.093 178.053L224.956 223.005L193 178.007L257.093 178.053Z"
            fill="#837A75"
          />
        </g>
        <g filter={`url(#filter4_sad_${id})`}>
          <path
            d="M276 121.236L310 148.19L344.011 121.218"
            stroke="#837A75"
            strokeWidth="10"
          />
        </g>
        <path d="M225.868 213L225.868 276" stroke="#837A75" strokeWidth="10" />
        <g filter={`url(#filter5_sad_${id})`}>
          <path
            d="M100 121.236L134 148.19L168.011 121.218"
            stroke="#837A75"
            strokeWidth="10"
          />
        </g>
        <g filter={`url(#filter6_sad_${id})`}>
          <path
            d="M135.499 273.363L157.913 259.985L180.328 246.606L225.473 273.781"
            stroke="#837A75"
            strokeWidth="10"
          />
        </g>
        <g filter={`url(#filter7_sad_${id})`}>
          <path
            d="M224.499 273.363L269.328 246.606L314.473 273.781"
            stroke="#837A75"
            strokeWidth="10"
          />
        </g>
      </g>
      <defs>
        <filter
          id={`filter0_sad_${id}`}
          x="-1"
          y="0"
          width="446"
          height="348"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={`filter1_sad_${id}`}
          x="239.077"
          y="1.14282"
          width="205.197"
          height="195.479"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4.06116" />
          <feGaussianBlur stdDeviation="2.03058" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={`filter2_sad_${id}`}
          x="0.1925"
          y="1.14282"
          width="205.197"
          height="195.479"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4.06116" />
          <feGaussianBlur stdDeviation="2.03058" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={`filter3_sad_${id}`}
          x="189"
          y="178.007"
          width="72.0927"
          height="52.9983"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={`filter4_sad_${id}`}
          x="268.894"
          y="117.3"
          width="82.2239"
          height="45.2709"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={`filter5_sad_${id}`}
          x="92.8939"
          y="117.3"
          width="82.2239"
          height="45.2709"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={`filter6_sad_${id}`}
          x="127.936"
          y="240"
          width="103.116"
          height="45.2879"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={`filter7_sad_${id}`}
          x="217.936"
          y="240"
          width="103.116"
          height="45.2879"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <clipPath id={`clip0_sad_${id}`}>
          <rect
            width="438"
            height="340"
            fill="white"
            transform="translate(3)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SadTully;
