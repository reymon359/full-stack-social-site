import React from 'react';

type LogoProps = {
  readonly fill?: string;
  readonly width?: number;
  readonly height?: number;
};

const Logo: React.FC<LogoProps> = ({ fill, width, height }) => (
  <div
    style={{
      width: width,
      height: height,
    }}>
    <svg
      version="1.1"
      id="GraphQL_Logo"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 400 400"
      enable-background="new 0 0 400 400">
      <g>
        <g>
          <g>
            <rect
              x="122"
              y="-0.4"
              transform="matrix(-0.866 -0.5 0.5 -0.866 163.3196 363.3136)"
              fill={fill}
              width="16.6"
              height="320.3"
            />
          </g>
        </g>
        <g>
          <g>
            <rect x="39.8" y="272.2" fill={fill} width="320.3" height="16.6" />
          </g>
        </g>
        <g>
          <g>
            <rect
              x="37.9"
              y="312.2"
              transform="matrix(-0.866 -0.5 0.5 -0.866 83.0693 663.3409)"
              fill={fill}
              width="185"
              height="16.6"
            />
          </g>
        </g>
        <g>
          <g>
            <rect
              x="177.1"
              y="71.1"
              transform="matrix(-0.866 -0.5 0.5 -0.866 463.3409 283.0693)"
              fill={fill}
              width="185"
              height="16.6"
            />
          </g>
        </g>
        <g>
          <g>
            <rect
              x="122.1"
              y="-13"
              transform="matrix(-0.5 -0.866 0.866 -0.5 126.7903 232.1221)"
              fill={fill}
              width="16.6"
              height="185"
            />
          </g>
        </g>
        <g>
          <g>
            <rect
              x="109.6"
              y="151.6"
              transform="matrix(-0.5 -0.866 0.866 -0.5 266.0828 473.3766)"
              fill={fill}
              width="320.3"
              height="16.6"
            />
          </g>
        </g>
        <g>
          <g>
            <rect x="52.5" y="107.5" fill={fill} width="16.6" height="185" />
          </g>
        </g>
        <g>
          <g>
            <rect x="330.9" y="107.5" fill={fill} width="16.6" height="185" />
          </g>
        </g>
        <g>
          <g>
            <rect
              x="262.4"
              y="240.1"
              transform="matrix(-0.5 -0.866 0.866 -0.5 126.7953 714.2875)"
              fill={fill}
              width="14.5"
              height="160.9"
            />
          </g>
        </g>
        <path
          fill={fill}
          d="M369.5,297.9c-9.6,16.7-31,22.4-47.7,12.8c-16.7-9.6-22.4-31-12.8-47.7c9.6-16.7,31-22.4,47.7-12.8
   C373.5,259.9,379.2,281.2,369.5,297.9"
        />
        <path
          fill={fill}
          d="M90.9,137c-9.6,16.7-31,22.4-47.7,12.8c-16.7-9.6-22.4-31-12.8-47.7c9.6-16.7,31-22.4,47.7-12.8
   C94.8,99,100.5,120.3,90.9,137"
        />
        <path
          fill={fill}
          d="M30.5,297.9c-9.6-16.7-3.9-38,12.8-47.7c16.7-9.6,38-3.9,47.7,12.8c9.6,16.7,3.9,38-12.8,47.7
   C61.4,320.3,40.1,314.6,30.5,297.9"
        />
        <path
          fill={fill}
          d="M309.1,137c-9.6-16.7-3.9-38,12.8-47.7c16.7-9.6,38-3.9,47.7,12.8c9.6,16.7,3.9,38-12.8,47.7
   C340.1,159.4,318.7,153.7,309.1,137"
        />
        <path
          fill={fill}
          d="M200,395.8c-19.3,0-34.9-15.6-34.9-34.9c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9
   C234.9,380.1,219.3,395.8,200,395.8"
        />
        <path
          fill={fill}
          d="M200,74c-19.3,0-34.9-15.6-34.9-34.9c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9
   C234.9,58.4,219.3,74,200,74"
        />
      </g>
    </svg>
  </div>
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   fill={props.fill}
  //   className={props.class}></svg>
);

export default Logo;
