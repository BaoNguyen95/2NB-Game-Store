import React, { useState, useContext } from 'react';
import { Dropdown } from '../../../models/common.model';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';
import { ROUTER_PRODUCT } from '../../../constants/router.constants';
import { useStateValue } from '../../../hooks/reducer/app.reducer';
import { ACTION_TYPE } from '../../../constants/actionTypes';

const MenuComponent = (props: any) => {
    const { data } = props;
    const [isOpenMenu, setOpenMenu] = useState(null);
    const classes = useStyles();

    const [{ category }, dispatch]: any = useStateValue();

    const onOpenMenu = (event: any) => {
        setOpenMenu(event.currentTarget);
    }

    const onCloseMenu = () => {
        setOpenMenu(null);
    }

    const onClickItem = (data: Dropdown) => {
        dispatch({ type: ACTION_TYPE.CATEGORY, data: { id: data._id, name: data.name } })
        onCloseMenu();
    }

    return (
        <>
            <Button onClick={onOpenMenu}>
                Games
            </Button>
            {
                data.length ?
                    <Menu
                        open={Boolean(isOpenMenu)}
                        anchorEl={isOpenMenu}
                        onClose={onCloseMenu}
                        keepMounted
                    >
                        <NavLink className={classes.link} to={ROUTER_PRODUCT.ALL_PRODUCT}>
                            <MenuItem onClick={e => onClickItem({ _id: '', name: 'All Games' })} >
                                All Games
                            </MenuItem>
                        </NavLink>
                        {data.map((s: Dropdown, i: number) => {
                            return (
                                <NavLink key={i} className={classes.link} to={ROUTER_PRODUCT.ALL_PRODUCT}>
                                    <MenuItem onClick={e => onClickItem(s)} >
                                        {s.name}
                                    </MenuItem>
                                </NavLink>

                            )
                        })}
                    </Menu> : null
            }
        </>
    );
}

export default MenuComponent;

const useStyles = makeStyles({
    process: {
        margin: 2,
        color: '#fff',
        width: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    }
});

