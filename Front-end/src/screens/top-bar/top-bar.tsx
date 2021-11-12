import React, { useState, useEffect } from 'react';
import './top-bar.scss';
import MenuComponent from './components/menu';
import Button from '@material-ui/core/Button';
import AdminListMenu from './components/admin.menu';
import { useHistory } from 'react-router';
import { ROUTER_PRODUCT, ROUTER_LOGIN, ROUTER_USER } from '../../constants/router.constants';
import { useStateValue } from '../../hooks/reducer/app.reducer';
import { Drawer, Typography, Badge } from '@material-ui/core';
import { ACTION_TYPE } from '../../constants/actionTypes';
import { LOCAL_STORAGE, VARIANT_TYPE, ROLE } from '../../constants/common.constants';
import DrawerList from './components/drawer.list';
import MyAvatar from '../../shared/components/my-avatar';
import LoginService from '../login/service/login.service';
import AuthorizedService from '../../service/authorized.service';
import SearchTopBar from './components/search';
import CartService from '../profile/service/cart.service';
import { User } from '../login/model/login.model';
import { Dropdown } from '../../models/common.model';
import CommonService from '../../service/common.service';

const TopBarComponent = (props: any) => {

    const [openDrawer, setDrawer] = useState(false);
    const history = useHistory();
    let [user, setUser] = useState();
    const [badges, setBadges] = useState(0);

    const loginService = new LoginService();
    const authorService = new AuthorizedService();
    const cartService = new CartService;
    const commonService = new CommonService();

    let [{ UserInfo, cart, categories }, dispatch]: any = useStateValue();
    const userLocal = authorService.getUserInfo();

    useEffect(() => {
        setUserInfo();
        getCategories();
    }, [UserInfo, cart.total, categories.length])

    const getCategories = () => {
        commonService.getCategories((categories: Dropdown[]) => {
            if (categories.length) {
                dispatch({ type: ACTION_TYPE.CATEGORY_DATA, data: categories })
            }
        });
    }

    const setUserInfo = () => {
        if (userLocal.userId) {
            const expiredToken = authorService.checkExpiryToken(userLocal.token);
            if (expiredToken) {
                authorService.setUserInfo(new User());
                setUser(null);
            } else {
                setUser(userLocal);
                getCart();
            }
        } else {
            if (UserInfo) {
                setUser(UserInfo);
                getCart();
            }
        }
    }

    const onClickLogo = (): void => {
        dispatch({ type: ACTION_TYPE.CATEGORY, data: { id: '', name: 'All Games' } });
        history.push(ROUTER_PRODUCT.ALL_PRODUCT);
    }

    const onClickLogin = (): void => {
        history.push(ROUTER_LOGIN.LOGIN);
    }

    const toggleDrawer = (): void => {
        setDrawer(!openDrawer);
    }

    const onClickLogout = () => {
        const id = authorService.getUserInfo().id;
        dispatch({ type: ACTION_TYPE.USER_LOGOUT, data: null });
        localStorage.removeItem(LOCAL_STORAGE.USER_INFO);
        setUser(null);
        toggleDrawer();
        history.push(ROUTER_PRODUCT.ALL_PRODUCT);
        loginService.logout({ id: id }, res => {
            if (res.success) {

            } else {
                dispatch({ type: ACTION_TYPE.SHOW_SNACKBAR, data: { message: res.message, open: true, variant: VARIANT_TYPE.ERROR } });
            }
        });

    }

    const onClickProfile = () => {
        toggleDrawer();
        history.push(ROUTER_USER.PROFILE);
    }

    const getCart = () => {
        if (userLocal) {
            const userId = userLocal.id;
            cartService.getCarts(userId, carts => {
                if (carts.result) {
                    dispatch({ type: ACTION_TYPE.CART, data: carts });
                    setBadges(carts.total)
                }
            });
        }
    }

    const renderButtonAdmin = () => {
        const role = authorService.getUserInfo().roleId;
        const isAdmin = authorService.isAdmin();
        return <> {(isAdmin || role === ROLE.EDITOR) && < AdminListMenu />}</>
    }

    return (
        <>
            <div className='container'>
                <div className='logo no-select' onClick={onClickLogo} >
                    <span>2NB's Game Store</span>
                </div>
                <SearchTopBar />
                <div className='topBarButton'>
                    <MenuComponent data={categories} />
                    <Button >Software</Button>
                    <Button>FAQ</Button>
                    {renderButtonAdmin()}
                </div>
                <div className='loginContent'>
                    {
                        user ?
                            <>
                                <Badge badgeContent={badges} variant='standard' color='secondary'>
                                    <MyAvatar variant='caption' data={user} pixel={40} onClick={toggleDrawer} />
                                </Badge>
                                <Drawer className='drawer' open={openDrawer} onClose={toggleDrawer} anchor='right'>
                                    <div className='userBackground'>
                                        <MyAvatar variant='h4' data={user} pixel={95} onClick={onClickProfile} />
                                        <Typography className='userInfo' variant='h5' >{user.displayName}</Typography>
                                        <Typography className='userInfo' variant='h6' >{user.email}</Typography>
                                    </div>
                                    <DrawerList
                                        onClickProfile={onClickProfile}
                                        onClickLogout={onClickLogout}
                                        badges={badges}
                                    />
                                </Drawer>
                            </>
                            :
                            <Button onClick={onClickLogin}>Login</Button>
                    }
                </div>
            </div>

        </>
    );
}

export default TopBarComponent;

