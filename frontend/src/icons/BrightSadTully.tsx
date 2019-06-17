import React from 'react';

/**
 * Sad Tully logo SVG with glow drop shadow
 * @param size {number} - width/height to render the SVG with
 * @param opacity {number} - opacity number to render the SVG with, defaults to 1
 */
const BrightSadTully = (
  size: number,
  opacity: number = 1
): React.ReactElement => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      style={{ opacity }}
      viewBox="0 0 638 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0sad_tully)">
        <g clipPath="url(#clip0)" filter="url(#filter1sad_tully)">
          <path
            d="M157.21 205.025L255.611 120.731L321.977 114.172L388.304 120.223L487.409 206.244L473.015 339.818L392.292 433.993L253.948 433.51L172.533 338.683L157.21 205.025Z"
            fill="#FBE8A6"
            stroke="#837A75"
            strokeWidth="10"
          />
          <g filter="url(#filter2sad_tully)">
            <path
              d="M537.212 101.143L537.212 288.5L340.138 101.143L537.212 101.143Z"
              fill="#ED6A5A"
            />
            <path
              d="M352.643 106.131L532.2 106.131L532.2 276.835L352.643 106.131Z"
              stroke="#837A75"
              strokeWidth="10"
            />
          </g>
          <g filter="url(#filter3sad_tully)">
            <path
              d="M101.254 101.143L101.254 288.5L298.328 101.143L101.254 101.143Z"
              fill="#FBE8A6"
            />
            <path
              d="M285.823 106.131L106.266 106.131L106.266 276.835L285.823 106.131Z"
              stroke="#837A75"
              strokeWidth="10"
            />
          </g>
          <g filter="url(#filter4sad_tully)">
            <path
              d="M354.093 278.053L321.956 323.005L290 278.007L354.093 278.053Z"
              fill="#837A75"
            />
          </g>
          <g filter="url(#filter5sad_tully)">
            <path
              d="M373 221.236L407 248.19L441.011 221.218"
              stroke="#837A75"
              strokeWidth="10"
            />
          </g>
          <path
            d="M322.868 313L322.868 376"
            stroke="#837A75"
            strokeWidth="10"
          />
          <g filter="url(#filter6sad_tully)">
            <path
              d="M197 221.236L231 248.19L265.011 221.218"
              stroke="#837A75"
              strokeWidth="10"
            />
          </g>
          <g filter="url(#filter7sad_tully)">
            <path
              d="M232.499 373.363L254.913 359.985L277.328 346.606L322.473 373.781"
              stroke="#837A75"
              strokeWidth="10"
            />
          </g>
          <g filter="url(#filter8sad_tully)">
            <path
              d="M321.499 373.363L366.328 346.606L411.473 373.781"
              stroke="#837A75"
              strokeWidth="10"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0sad_tully"
          x="0"
          y="0"
          width="654"
          height="554"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="50" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter1sad_tully"
          x="96"
          y="100"
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
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter2sad_tully"
          x="336.077"
          y="101.143"
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
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter3sad_tully"
          x="97.1924"
          y="101.143"
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
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter4sad_tully"
          x="286"
          y="278.007"
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
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter5sad_tully"
          x="365.894"
          y="217.3"
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
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter6sad_tully"
          x="189.894"
          y="217.3"
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
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter7sad_tully"
          x="225.936"
          y="340.777"
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
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter8sad_tully"
          x="314.936"
          y="340.777"
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
            result="effect1sad_tullyropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1sad_tullyropShadow"
            result="shape"
          />
        </filter>
        <clipPath id="clip0">
          <rect width="638" height="540" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BrightSadTully;
