import React from 'react';
import { render } from 'react-dom';

import LoadingIndicator from './components/LoadingIndicator';

const Root = React.lazy(() => import('./components/Root'));

// Render React App
render(
  <React.Suspense fallback={<LoadingIndicator big/>}>
    <Root/>
  </React.Suspense>,
  document.querySelector('#react-root')
);
