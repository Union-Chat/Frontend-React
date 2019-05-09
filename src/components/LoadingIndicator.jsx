import React from 'react';
import UnionSvg from './UnionSvg';

import './LoadingIndicator.scss';

const LoadingIndicator = React.memo(
  () => <div className='loader'>
    <UnionSvg className='loader' fill='#fff'/>
  </div>
);

LoadingIndicator.displayName = 'LoadingIndicator';
export default LoadingIndicator;
