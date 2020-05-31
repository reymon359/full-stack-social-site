import React from 'react';
import Loader from 'react-loader-spinner';

const LoadingSpinner: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      right: '15px',
      top: '6px',
    }}>
    <Loader type="Oval" color="#fff" height={30} width={30} />
  </div>
);

export default LoadingSpinner;
