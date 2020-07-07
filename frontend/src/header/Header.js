import React from 'react';
import './Header.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className="typography">Algorithms</Typography>
                <Button color="inherit" href="/shortest">Shortest path</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;