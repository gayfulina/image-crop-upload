import React, {useState, useContext, createContext} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const BackDropContext = createContext();

export default function SimpleBackdrop({children}) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const closeBackDrop = () => {
        setOpen(false);
    };
    const showBackDrop = () => {
        setOpen(!open);
    };

    return (
        <BackDropContext.Provider value={{closeBackDrop, showBackDrop}}>
            <Backdrop className={classes.backdrop}
                      open={open}
                    //  onClick={closeBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </BackDropContext.Provider>
    );
}
