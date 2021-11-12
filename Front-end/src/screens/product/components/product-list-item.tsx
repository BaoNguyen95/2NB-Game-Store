import React from 'react';
import { Product, Dropdown } from '../../../models/common.model';
import { Card, makeStyles, CardContent, Typography, CardMedia, Tooltip } from '@material-ui/core';
import { BASE64, STRING_REPLACE } from '../../../constants/common.constants';
import imageDefault from '../../../assets/no-product-image.png';
import LazyLoad from 'react-lazyload';
import { ROUTER_PRODUCT } from '../../../constants/router.constants';
import { useHistory } from 'react-router';
import { MaterialBoxShadowHover, TextHoverStyle } from '../../../shared/material-styles/styles';
export default function ProductItems(props: any) {

    const { data: { result, count } } = props;
    const classes = styles({});
    const history = useHistory();

    const handleClick = (item: Product) => {
        history.push({
            pathname: ROUTER_PRODUCT.PRODUCT_DETAIL,
            search: item.name,
            state: { id: item._id, categoryId: item.categoryId }
        });
    }

    const renderCategory = (category: Dropdown[]) => {
        return category.map((s, i) => i === category.length - 1 ? s.name : s.name + ', ');
    }

    return (
        <div className='productContent'>
            {
                result ? result.map((s: Product, i: number) => {
                    return (
                        <LazyLoad key={i} placeholder={<div>Loading...</div>}>
                            <Card className={classes.card} onClick={e => handleClick(s)}>
                                {
                                    s.image ?
                                        <img src={BASE64 + s.image.file} className={classes.cardMedia} width='100%' ></img>
                                        :
                                        <img src={imageDefault} className={classes.cardMedia} width='100%' />
                                }
                                <div className={classes.cardContent}>
                                    <div className={classes.cardInfo}>
                                        <Typography variant='h6' noWrap={true} >{s.name}</Typography>
                                        <Typography noWrap={true}>{renderCategory(s.category)}</Typography>
                                    </div>
                                </div>
                            </Card>
                        </LazyLoad>
                    );
                }) : null
            }
        </div>
    );
}

const styles = makeStyles({
    card: {
        margin: 10,
        width: 340,
        cursor: 'pointer',
        ...MaterialBoxShadowHover,

    },
    cardMedia: {

    },
    cardContent: {
        padding: 10,
        ...TextHoverStyle,
    },
    cardInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
});