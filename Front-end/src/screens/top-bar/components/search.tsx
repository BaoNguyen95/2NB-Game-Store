import React, { useState, useEffect } from 'react';
import { Image } from '../../../models/common.model';
import ProductService from '../../product/service/product.service';
import { makeStyles } from '@material-ui/styles';
import { ListItem, List, Typography, Paper, InputBase, IconButton } from '@material-ui/core';
import { BASE64 } from '../../../constants/common.constants';
import { useHistory } from 'react-router';
import { ROUTER_PRODUCT } from '../../../constants/router.constants';
import { MaterialBoxShadow } from '../../../shared/material-styles/styles';
import { MY_ICON } from '../../../shared/models/shared.component.model';
import clsx from 'clsx';

interface SearchItem {
    _id: string;
    name: string;
    image: Image;
    categoryId: string;
}

const SearchTopBar = (props: any) => {
    const [data, setData] = useState();
    const [searchItem, setSearchData] = useState([]);
    const [search, setSearch] = useState();
    const history = useHistory();

    const classes = styles();

    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = (): void => {
        new ProductService().getAllProduct(result => {
            if (result) {
                setData(result);
            }
        });
    }

    const onChangeValue = (e: any) => {
        let text = e.target.value.toLowerCase();
        setSearch(text);
        data && onFilter(text);
    }

    const onFilter = (text: string) => {
        let filtered = text ? data.result.filter((s: SearchItem) => s.name.toLowerCase().includes(text)) : [];
        setSearchData(filtered);
    }

    const onClickDetail = (item: SearchItem) => {
        history.push({
            pathname: ROUTER_PRODUCT.PRODUCT_DETAIL,
            search: item.name,
            state: { id: item._id, categoryId: item.categoryId }
        });
        onReset();
    }

    const onReset = () => {
        setSearchData([]);
        setSearch([]);
    }

    return (
        <div className='searchContent'>
            <Paper className={classes.content}>
                <InputBase
                    placeholder='Search...'
                    value={search}
                    onChange={onChangeValue}
                />
                <IconButton className={classes.icon} color='primary' onClick={onReset}>{MY_ICON.HighlightOffIcon}</IconButton>
            </Paper>
            <List className={classes.list}>
                {searchItem.map((s: SearchItem, i: number) => {
                    return (
                        <ListItem button onClick={() => onClickDetail(s)}>
                            <img src={BASE64 + s.image.file} alt={s.name} width='100' height='60' />
                            <Typography className={classes.text}>{s.name}</Typography>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}

const styles = makeStyles({
    content: {
        display: 'flex',
    },
    list: {
        position: 'absolute',
        background: 'white',
        maxHeight: 400,
        overflow: 'overlay',
        ...MaterialBoxShadow,
        zIndex: 99,
    },
    text: {
        marginLeft: 20,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    icon: {
        padding: 4,
    },

});

export default SearchTopBar;