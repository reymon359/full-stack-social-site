import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { size } from 'styled-system';
// import { getColor, filterProps } from './theme';

/**
 * Styled conponents loading spinner.
 * credits to jdacosta from https://codepen.io/jdacosta/pen/dobzpM
 */
const StyledLoadingSpinner = styled(({ children, ...props }) => (
  <svg>{children}</svg>
))`
  height: 30px;
  width: 30px;
  transform: rotate(-90deg);
  stroke-linecap: round;
  stroke-width: 4;
  fill: none;

  .internal-circle,
  .external-circle {
    stroke: ${(props) => props.theme.colors.lightBlue};
    stroke-dashoffset: 0;
    transform-origin: center;
    opacity: 0.8;
  }

  .internal-circle {
    stroke-dasharray: 187;
    animation: internal 1s ease-in-out infinite;
    opacity: 0.4;
  }

  .external-circle {
    stroke-dasharray: 312;
    animation: external 1s linear infinite;
  }
  @keyframes internal {
    0% {
      stroke-dashoffset: 187;
    }
    25% {
      stroke-dashoffset: 80;
    }
    100% {
      stroke-dashoffset: 187;
      transform: rotate(360deg);
    }
  }

  @keyframes external {
    0% {
      stroke-dashoffset: 312;
      transform: rotate(70deg);
    }
    60% {
      stroke-dashoffset: -312;
    }
    100% {
      stroke-dashoffset: -312;
      transform: rotate(450deg);
    }
  }
`;

const LoadingSpinner = () => (
  <StyledLoadingSpinner
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">
    <circle className="internal-circle" cx="60" cy="60" r="30"></circle>
    <circle className="external-circle" cx="60" cy="60" r="50"></circle>
  </StyledLoadingSpinner>
);

LoadingSpinner.propTypes = {
  /**
   * Styled-system size generated width=height=props.size
   */
  size: PropTypes.number,
  /**
   * Spinner color from the theme
   */
  color: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  size: 120,
  color: 'primary',
};

export default LoadingSpinner;
