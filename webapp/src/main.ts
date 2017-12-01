/* eslint-env browser */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app/App';


function handleNewHash() {
    const urlArgs = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
    ReactDOM.render(
        React.createElement(App, { urlArg: urlArgs[0] }),
        document.getElementById('mount'),
    );
}

// Handle the initial route and browser navigation events
handleNewHash();
window.addEventListener('hashchange', handleNewHash, false);
