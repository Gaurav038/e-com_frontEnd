import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {logout} from "../../../actions/userAction";



const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        
    },
    component: {
        marginTop: 40,
    },
    logout: {
        fontSize: 14,
        marginLeft: 10
    }
}))

const Profile = ({ user }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const classes = useStyle();

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function dashboard() {
        history.push("/admin/dashboard");
    }

    function orders() {
        history.push("/orders");
    }
    function account() {
        history.push("/account");
    }

    const logoutUser = () => {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    return (
        <>
            <div onClick={handleClick} className={classes.container}> 
                <Typography style={{ marginTop: 2 }}>{user.name}</Typography>
                <ArrowDropDownIcon />
            </div>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                className={classes.component}
            >
               {user.role === "admin" &&
                    <MenuItem onClick={() => { handleClose(); dashboard(); }}>
                    <DashboardIcon fontSize='small' color='primary' />
                    <Typography className={classes.logout}>Dashboard</Typography>
                    </MenuItem>
                }
                <MenuItem onClick={() => { handleClose(); orders(); }}>
                    <FormatListBulletedIcon fontSize='small' color='primary' />
                    <Typography className={classes.logout}>Orders</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); account(); }}>
                    <AccountBoxIcon fontSize='small' color='primary' />
                    <Typography className={classes.logout}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => {logoutUser(); }}>
                    <PowerSettingsNew fontSize='small' color='primary' />
                    <Typography className={classes.logout}>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Profile;