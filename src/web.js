import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
//import jQuery from "jquery";
import Root from './client/Root';
import registerServiceWorker from './registerServiceWorker';

require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

//window.$ = window.jQuery = jQuery;

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();