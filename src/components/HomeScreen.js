import React from 'react';

import { makeStyles } from '@material-ui/core';

const HomeScreen = () => {
    
    const styles = makeStyles((theme) => ({
        divContent: {
            width: '100%',
            height: '100%',
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
        },
        logo: {
            padding: "1rem",
            width: 500,
            maxWidth: 500,
            opacity: 0.5,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.down("sm")]: {
                width: 280,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            }
        },
    }));
    const classes = styles();
    //export const HomeScreen =()=><h1>HomeScreen</h1>;
    return (
        // Para pruebas comentar estas lineas
        <>
        </>
        // <ViewBinnacleScreen />

        // <div className={classes.divContent}>
        //     <img className={classes.logo} alt="Portal Logo" src={logo} align="center" />
        // </div>

    )
}

export default HomeScreen
