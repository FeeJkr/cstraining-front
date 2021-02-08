import React from "react";
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {classes} from "istanbul-lib-coverage";

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    ФейситСтатист+
                </Typography>
                <Button color="primary" variant="contained" disableElevation style={{marginLeft: '20px'}}>
                    <Link to={"/"} style={{'color': 'white', textDecoration: 'none'}}>Главная страница</Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
}