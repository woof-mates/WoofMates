import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './app';
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './theme/theme'

ReactDom.render(
    <Provider store={ store }>
        <ThemeProvider theme = {theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.querySelector('#main')
);
