import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import RenderSnackBar from "./components/snackbar/snackbar";

ReactDOM.render(
    <RenderSnackBar>
        <App />
    </RenderSnackBar>,
    document.getElementById('root')
);

