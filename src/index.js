import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Admin from './admin';
// import Home from './pages/route_demo/route1/Home'
import Router from './router'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
