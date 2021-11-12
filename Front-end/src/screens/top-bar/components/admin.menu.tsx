import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';
import { ROUTER_ADMIN } from '../../../constants/router.constants';

export default function AdminListMenu() {

    const DROPDOWN_VALUE = {
        MANAGE_CATEGORY: 'Manage Category',
        MANAGE_PRODUCT: 'Manage Product',
        CHAT_LIST: 'Chat',
    }
    const [isOpenMenu, setOpenMenu] = useState(null);

    const onOpenMenu = (event: any) => {
        setOpenMenu(event.currentTarget);
    }

    const onCloseMenu = () => {
        setOpenMenu(null);
    }

    const classes = useStyles();

    return (
        <>
            <Button
                onClick={onOpenMenu}
            >
                Admin
            </Button>
            <Menu
                open={Boolean(isOpenMenu)}
                anchorEl={isOpenMenu}
                onClose={onCloseMenu}
                keepMounted
            >
                <NavLink className={classes.link} to={ROUTER_ADMIN.MANAGE_CATEGORY}>
                    <MenuItem onClick={onCloseMenu}>
                        {DROPDOWN_VALUE.MANAGE_CATEGORY}
                    </MenuItem>
                </NavLink>
                <NavLink className={classes.link} to={ROUTER_ADMIN.MANAGE_PRODUCT}>
                    <MenuItem onClick={onCloseMenu}>
                        {DROPDOWN_VALUE.MANAGE_PRODUCT}
                    </MenuItem>
                </NavLink>
                <NavLink className={classes.link} to={ROUTER_ADMIN.CHAT_LIST}>
                    <MenuItem onClick={onCloseMenu}>
                        {DROPDOWN_VALUE.CHAT_LIST}
                    </MenuItem>
                </NavLink>
            </Menu>
        </>
    );
}

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
        color: 'black'
    }
});

