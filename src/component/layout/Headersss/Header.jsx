import { AppBar, Toolbar, makeStyles, Box, Typography, withStyles, IconButton, Drawer, List, ListItem} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomButtons from './CustomButtons';
import Search from './Search';
import { Menu } from '@material-ui/icons';
import { useState } from 'react';

const useStyle = makeStyles(theme => ({
    header: {
        background: '#211f1ce6',
        height: 55,
        display: 'flex',
        alignItems: 'center'
    },
    component: {
        marginLeft: '3%',
        lineHeight: 0,
        color: '#FFFFFF',
        textDecoration: 'none'
    },
    logo: {
        width: '4rem'
    },
    container: {
        display: 'flex',
    },
    list: {
        width: 250
    },
  
}));

const ToolBar = withStyles({
    root: {
      minHeight: 55,
      width: '90%'
    },
})(Toolbar);

const Header = () => {
    const classes = useStyle();
    const logoURL = 'https://w7.pngwing.com/pngs/17/58/png-transparent-web-development-responsive-web-design-e-commerce-business-ecommerce-blue-angle-web-design.png';

    const [open, setOpen] = useState(false);
 


    return (
        <AppBar position="fixed" className={classes.header}>
            <ToolBar>

                <Link to='/' className={classes.component}>
                    <img src={logoURL} className={classes.logo} />
                </Link>
                <Search />
                <span className={classes.customButtons}><CustomButtons /></span>
            </ToolBar>
        </AppBar>
    )
}

export default Header;