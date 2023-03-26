import React, { useState, useContext } from 'react';
import { makeStyles, Menu, MenuItem, Box, Typography, Badge, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import Profile from './Profile';



const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
       
    },
    component: {
        marginTop: 40,
    },
    wrapper: {
        margin: '0 5% 0 24rem',
        display: 'flex',
        '& > *': {
            marginRight: 20,
            textDecoration: 'none',
            color: '#FFFFFF',
            fontSize: 12,
            alignItems: 'center',
            
        },
        [theme.breakpoints.down('sm')]: {
                margin: '0 5% 0 .5rem',
        }
    },
    login: {
        color: '#2874f0',
        background: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 20px',
        height: 32,
        boxShadow: 'none',
        
    }
}));


const CustomButtons = () => {
    const { user } = useSelector((state) => state.user)
    const classes = useStyle();

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;



    return (
        <Box className={classes.wrapper}>
            {
                user ? <Profile user={user} /> :
                    <Link to="/login">
                        <Button className={classes.login} variant="contained">Login</Button>
                    </Link>

            }
            <Link to='/products' className={classes.container}>
                <Typography style={{ marginLeft: 10 }}>Product</Typography>
            </Link>
           
            <Link to='/cart' className={classes.container}>

                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Link>
        </Box>
    )
}

export default CustomButtons;