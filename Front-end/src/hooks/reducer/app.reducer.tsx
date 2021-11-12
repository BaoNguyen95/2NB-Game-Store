import React, { createContext, useReducer, useContext } from 'react';
import { ACTION_TYPE } from '../../constants/actionTypes';
import { Cart } from '../../models/common.model';

export const StateContext = createContext({});

const initialState = {
    category: '',
    categories: [],
    isLoading: false,
    cart: new Cart(),
}

const AppReducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTION_TYPE.CATEGORY:
            return { ...state, category: action.data };
        case ACTION_TYPE.CATEGORY_DATA:
            return { ...state, categories: action.data };
        case ACTION_TYPE.LOADING:
            return { ...state, isLoading: action.data }
        case ACTION_TYPE.USER_LOGIN:
            return { ...state, UserInfo: action.data }
        case ACTION_TYPE.USER_LOGOUT:
            return { ...state, UserInfo: null }
        case ACTION_TYPE.SHOW_SNACKBAR:
            return { ...state, snackbar: action.data }
        case ACTION_TYPE.CART:
            return { ...state, cart: action.data }
        default:
            return state;
    }
};

export const StateProvider = ({ children }: any) => (

    <StateContext.Provider value={useReducer(AppReducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext);