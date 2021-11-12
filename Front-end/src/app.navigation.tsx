
import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router';
import { ROUTER_PRODUCT, ROUTER_LOGIN, ROUTER_USER } from './constants/router.constants';
import ProductsPage from './screens/product/product';
import ProductDetail from './screens/product/product-detail/product-detail';
import LoginPage from './screens/login/login';
import UserProfilePage from './screens/profile/user.profile';
import AdminRouter from './screens/admin/admin';
import { useStateValue } from './hooks/reducer/app.reducer';

const AppNavigation = (props: any) => {

    const { setLoading, setSnackbar } = props;

    const [{ isLoading, snackbar }]: any = useStateValue();

    useEffect(() => {
        onAppChange();
    }, [isLoading, snackbar]);

    const onAppChange = () => {
        setLoading(isLoading);
        snackbar && snackbar.open && setSnackbar(snackbar);
    }

    return (
        <Switch>
            <Redirect path='/' to={ROUTER_PRODUCT.ALL_PRODUCT} exact />
            <Route path={ROUTER_PRODUCT.ALL_PRODUCT} exact >
                <ProductsPage />
            </Route>
            <Route path={ROUTER_PRODUCT.PRODUCT_DETAIL}>
                <ProductDetail />
            </Route>
            <Route path={ROUTER_LOGIN.LOGIN}>
                <LoginPage />
            </Route>
            <Route path={ROUTER_USER.PROFILE}>
                <UserProfilePage />
            </Route>
            <AdminRouter />
        </Switch>
    )
}

export default AppNavigation;

