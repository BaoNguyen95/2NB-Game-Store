import React, { Fragment } from 'react';
import {
    Route,
} from "react-router-dom";
import { ROUTER_ADMIN } from '../../constants/router.constants';
import AdminManageCategoryPage from './pages/admin-category';
import AdminProductPage from './pages/admin-product';
import AdminChatPage from './pages/admin-chat';

export default function AdminRouter() {
    return (
        <Fragment>
            <Route path={ROUTER_ADMIN.MANAGE_CATEGORY}>
                <AdminManageCategoryPage />
            </Route>
            <Route path={ROUTER_ADMIN.MANAGE_PRODUCT}>
                <AdminProductPage />
            </Route>
            <Route path={ROUTER_ADMIN.CHAT_LIST}>
                <AdminChatPage />
            </Route>
        </Fragment>
    );
}