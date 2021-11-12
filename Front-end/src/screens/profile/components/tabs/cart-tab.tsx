import React, { useEffect } from 'react';
import { useStateValue } from '../../../../hooks/reducer/app.reducer';
import { makeStyles } from '@material-ui/styles';
import { MaterialBoxShadowHover, TextHoverStyle } from '../../../../shared/material-styles/styles';
import { Typography, IconButton, Tooltip, Button } from '@material-ui/core';
import { BASE64, VARIANT_TYPE } from '../../../../constants/common.constants';
import { MY_ICON } from '../../../../shared/models/shared.component.model';
import CartService from '../../service/cart.service';
import { ACTION_TYPE } from '../../../../constants/actionTypes';
import { useSnackbar, useLoading } from '../../../../hooks';
import { MESSAGE_COMMON } from '../../../../constants/message.constants';
import { useHistory } from 'react-router';
import { Product, Dropdown } from '../../../../models/common.model';
import { ROUTER_PRODUCT } from '../../../../constants/router.constants';
import emptyCart from '../../../../assets/empty-cart.png';

const CartTab = (props: any) => {

    const classes = styles();

    const history = useHistory();
    const setSnackbar: any = useSnackbar();
    const setLoading: any = useLoading();

    const [{ cart }, dispatch]: any = useStateValue();

    const cartService = new CartService();

    useEffect(() => {

    }, [])

    const onClickIncrease = (id: string) => {
        setLoading(true);
        cartService.addCart(id, result => {
            setLoading(false);
            if (result.message) {
                setSnackbar({ message: MESSAGE_COMMON.ERROR, variant: VARIANT_TYPE.WARNING, open: true });
            } else {
                dispatch({ type: ACTION_TYPE.CART, data: { ...cart, total: cart.total + 1 } });
            }
        });
    }

    const onClickDecrease = (id: string) => {
        setLoading(true);
        cartService.decreaseCart(id, result => {
            setLoading(false);
            if (result.message) {
                setSnackbar({ message: MESSAGE_COMMON.ERROR, variant: VARIANT_TYPE.WARNING, open: true });
            } else {
                dispatch({ type: ACTION_TYPE.CART, data: { ...cart, total: cart.total - 1 } });
            }
        });
    }

    const onDelete = (cartItemId: string) => {
        setLoading(true);
        cartService.deleteProductCart(cart.id, cartItemId, result => {
            setLoading(false);
            if (result.message) {
                setSnackbar({ message: MESSAGE_COMMON.ERROR, variant: VARIANT_TYPE.WARNING, open: true });
            } else {
                dispatch({ type: ACTION_TYPE.CART, data: { ...cart, total: cart.total + 1 } });
            }
        });
    }

    const onClickTitle = (item: Product) => {
        history.push({
            pathname: ROUTER_PRODUCT.PRODUCT_DETAIL,
            search: item.name,
            state: { id: item.id, categoryId: item.categoryId }
        });
    }

    const onClickCategory = (category: Dropdown) => {
        dispatch({ type: ACTION_TYPE.CATEGORY, data: { id: category._id, name: category.name } });
        history.push({ pathname: ROUTER_PRODUCT.ALL_PRODUCT });
    }

    const renderCategory = (category: Dropdown[]) => {
        return category.map((s, i) => <Button key={i} color='primary' onClick={() => onClickCategory(s)}>{s.name}</Button>);
    }


    return (
        <>
            {
                cart.result.length ?
                    <div >
                        {cart.result.map((s: any, i: number) => {
                            return (
                                <div className={classes.content} key={i}>
                                    <div className={classes.firstContent} >
                                        <img className={classes.title} src={BASE64 + s.product.image.file} alt={s.product.name} width='250' onClick={() => onClickTitle(s.product)} />
                                        <div className={classes.infoContent}>
                                            <Typography
                                                variant='h6'
                                                className={classes.title}
                                                onClick={() => onClickTitle(s.product)}
                                            >
                                                {s.product.name}
                                            </Typography>
                                            <div className={classes.category}>
                                                <Typography >Category: </Typography>
                                                <Typography>{renderCategory(s.product.category)}</Typography>
                                            </div>
                                            <div className={classes.button}>
                                                <Tooltip title='Delete' placement='right' onClick={() => onDelete(s._id)}>
                                                    <IconButton>{MY_ICON.DeleteForeverIcon}</IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.secondContent}>
                                        <div className={classes.quality}>
                                            <Tooltip title='Increase' placement='top'>
                                                <IconButton onClick={() => onClickIncrease(s.productId)}>{MY_ICON.ExpandLessIcon}</IconButton>
                                            </Tooltip>
                                            <Typography variant='h6'>{s.count}</Typography>
                                            <Tooltip title='Decrease' onClick={() => onClickDecrease(s.productId)}>
                                                <IconButton disabled={s.count == '1'}>{MY_ICON.ExpandMoreIcon}</IconButton>
                                            </Tooltip>
                                        </div>

                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className={classes.emptyCart}><img src={emptyCart} ></img></div>
            }
        </>
    );
}

const styles = makeStyles({
    emptyCart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        display: 'flex',
        padding: 10,
        marginTop: 10,
        ...MaterialBoxShadowHover,
        justifyContent: 'space-between',
    },
    infoContent: {
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        cursor: 'pointer',
        ...TextHoverStyle,
    },
    firstContent: {
        display: 'flex',
    },
    quality: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        display: 'flex',
        alignItems: 'flex-end',
        flex: 1,
    },
    secondContent: {
        display: 'flex',
    },
    category: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
export default CartTab;
