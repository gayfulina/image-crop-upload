import React, {useState, useContext, createContext} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const SnackbarContext = createContext();

export default function RenderSnackBar({children}) {
    const classes = useStyles();
    const [stateSnackBar, setStateSnackBar] = useState({
        open: false,
        severity: '',
        message: '',
    })
    const {open, severity, message} = stateSnackBar;

    const setStateSnackBarContext = (open, severity, message) => setStateSnackBar({
...stateSnackBar, open, severity, message
    })

    const handleClose = () => setStateSnackBar({...stateSnackBar, open: false});

    return (
        <SnackbarContext.Provider value={setStateSnackBarContext}>
        <div className={classes.root}>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
            {children}
        </SnackbarContext.Provider>
    );
}
