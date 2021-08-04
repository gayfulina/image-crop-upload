import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import RenderSnackBar from "./components/snackbar/snackbar";
import SimpleBackdrop from "./components/backdrop/backdrop";

ReactDOM.render(
    <RenderSnackBar>
        <SimpleBackdrop>
            <App/>
        </SimpleBackdrop>
    </RenderSnackBar>,
    document.getElementById('root')
);

