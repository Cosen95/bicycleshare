import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Admin from './admin';
// import Home from './pages/route_demo/route1/Home'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Admin />, document.getElementById('root'));
registerServiceWorker();
