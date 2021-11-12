import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Tabs, AppBar, Tab, Tooltip, CircularProgress, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useFetch, useLoading, useSnackbar } from '../../../hooks';
import { PRODUCT_API } from '../../../constants/api.constants';
import { STRING_REPLACE, BASE64, VARIANT_TYPE } from '../../../constants/common.constants';
import { TabProps, TabPanel } from '../../../shared/components/my-tab-panel';
import { GridSetting } from '../../../models/common.model';
import ProductService from '../service/product.service';
import LazyLoad from 'react-lazyload';
import { ROUTER_PRODUCT } from '../../../constants/router.constants';
import { onScrollToTop } from '../../../helper/helper';
import imageDefault from '../../../assets/no-product-image.png';
import { ProductDetailStyle } from './styles';
import './product-detail.scss';
import { MY_ICON } from '../../../shared/models/shared.component.model';
import CartService from '../../profile/service/cart.service';
import AuthorizedService from '../../../service/authorized.service';
import { MESSAGE_COMMON, MESSAGE_CART } from '../../../constants/message.constants';
import { useStateValue } from '../../../hooks/reducer/app.reducer';
import { ACTION_TYPE } from '../../../constants/actionTypes';
import CommonService from '../../../service/common.service';

const ProductDetail = (props: any) => {

    const { location: { state } } = useHistory();
    const history = useHistory();

    const [data, error, fetchProductDetail] = useFetch(PRODUCT_API.GET_PRODUCT_DETAIL.replace(STRING_REPLACE.REPLACE_0, state.id));
    const [trailer, trailerErr, fetchTrailer] = useFetch(PRODUCT_API.GET_TRAILER.replace(STRING_REPLACE.REPLACE_0, state.id));
    const setSnackbar: any = useSnackbar();

    const [relateProduct, setRelateProduct] = useState();
    const [{ cart }, dispatch]: any = useStateValue();
    const [tab, setTab] = useState(0);

    let [currentStateId, setCurrentState] = useState(state.id);
    let [gridSetting, setGridSetting] = useState(new GridSetting);

    const productService = new ProductService();
    const cartService = new CartService();
    const authorService = new AuthorizedService();
    const commonService = new CommonService();

    const setLoading: any = useLoading();

    const classes = ProductDetailStyle();

    let photo = data ? data.image ? data.image.file : '' : '';

    const userInfo = authorService.getUserInfo();

    useEffect(() => {
        onScrollToTop();
        getRelateItem();
        state.id !== currentStateId && fetchProductDetail();
        state.id !== currentStateId && fetchTrailer();
    }, [gridSetting.PageSize, state.id]);

    const handleChangeTabs = (event: any, newTab: number) => {
        setTab(newTab);
    }

    const getRelateItem = (): void => {
        setLoading(true);
        let body = {
            id: state.id,
            categoryId: state.categoryId,
            gridSetting
        }
        productService.getRelateProducts(body, relateProducts => {
            if (relateProducts.count || relateProducts.count === 0) {
                setLoading(false);
                setRelateProduct(relateProducts);
            } else {
                setLoading(false);
            }
        });
        setCurrentState(state.id);

    }

    const handleClickRelateProduct = (product: any): void => {
        history.push({
            pathname: ROUTER_PRODUCT.PRODUCT_DETAIL,
            search: product.name,
            state: { id: product.id, categoryId: state.categoryId }
        });

        setTab(0);
    }

    const handleAddProduct = () => {
        if (checkUser()) {
            setLoading(true);
            cartService.addCart(state.id, result => {
                setLoading(false);
                if (result.message) {
                    setSnackbar({ message: MESSAGE_COMMON.ERROR, variant: VARIANT_TYPE.WARNING, open: true });
                } else {
                    dispatch({ type: ACTION_TYPE.CART, data: cart.total + 1 });
                }
            });
        }
    }

    const handleDecreaseProduct = () => {
        if (checkUser()) {
            setLoading(true);
            cartService.decreaseCart(state.id, result => {
                setLoading(false);
                if (result.message) {
                    setSnackbar({ message: MESSAGE_COMMON.ERROR, variant: VARIANT_TYPE.WARNING, open: true });
                } else {
                    dispatch({ type: ACTION_TYPE.CART, data: cart.total - 1 });
                }
            });
        }
    }

    const checkUser = () => {
        if (userInfo.id) {
            return true;
        } else {
            setSnackbar({ message: MESSAGE_CART.REQUIRE_USER, variant: VARIANT_TYPE.WARNING });
            return false;
        }
    }

    return (
        <Box className={classes.container}>
            <Paper className={classes.detailContent}>
                <div className={classes.topContent}>
                    <div>
                        <Typography variant='h5' >{data.name}</Typography>
                        <Typography variant='caption'>{commonService.renderTextCategory(data.category)}</Typography>
                    </div>
                    <div>
                        <Tooltip title='Add To Cart'>
                            <IconButton className={classes.shopIcon} onClick={handleAddProduct}>
                                {MY_ICON.AddShoppingCartIcon}
                            </IconButton>
                        </Tooltip>
                        {/* <Tooltip title='Decrease'>
                            <IconButton className={classes.shopIcon} onClick={handleDecreaseProduct}>
                                {MY_ICON.RemoveShoppingCartIcon}
                            </IconButton>
                        </Tooltip> */}
                    </div>
                </div>
                <LazyLoad placeholder={<CircularProgress />}>
                    <div className={classes.imageContent}>
                        {
                            data.name ?
                                <img className={classes.image} src={BASE64 + photo} width='700px' /> :
                                <img className={classes.image} src={imageDefault} width='700px' />
                        }
                    </div>
                </LazyLoad>
                <AppBar className={classes.tabContent} position='static'>
                    <Tabs classes={{ indicator: classes.indicator }} value={tab} onChange={handleChangeTabs} aria-label="simple tabs example">
                        <Tab label='Information' {...TabProps(0)} />
                        <Tab label='System Requirement' {...TabProps(1)} />
                        <Tab label='Trailer/Screenshot' {...TabProps(2)} />
                        <Tab label='Download' {...TabProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={tab} index={0}>
                    <Typography>
                        {data.description ? data.description.split("\n").map((i: string, key: number) => {
                            return <p key={key}>{i}</p>;
                        }) : null}
                    </Typography>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    System Requirement
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    Screenshot
                    {
                        trailer.url ?
                            <div>
                                <Typography variant='h5' >Trailer/Gameplay</Typography>
                                <div className={classes.trailerContent}>
                                    <iframe
                                        className={classes.trailer}
                                        src={trailer.url}
                                        frameBorder='0'
                                        allow='autoplay; encrypted-media'
                                        allowFullScreen
                                        title='video'
                                    />
                                </div>
                            </div> : null
                    }
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    Download
                </TabPanel>
            </Paper>
            <Paper className={classes.relateProduct}>
                <div className={classes.titleRelate}>
                    <Typography variant='h5'>Relate Products</Typography>
                </div>
                {
                    relateProduct ?
                        relateProduct.result.map((s: any, i: number) => {
                            return (
                                <>
                                    <div key={i} className={classes.relateProContent} onClick={e => handleClickRelateProduct(s)}>
                                        <Tooltip title={s.name} placement='top'>
                                            <img className={classes.relateItem} src={BASE64 + s.image} width='100%' />
                                        </Tooltip>
                                    </div>
                                </>
                            )
                        }) : null
                }
            </Paper>
        </Box>
    );
}

export default ProductDetail;