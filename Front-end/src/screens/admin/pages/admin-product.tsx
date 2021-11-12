import React, { useEffect, useState } from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Table, TableBody, Checkbox, Fab, Tooltip, Paper, Typography, TextField } from '@material-ui/core';
import { Product, Image, GridSetting, initSnackbarState, Dropdown } from '../../../models/common.model';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { ProductManage, TrailerModel } from '../models/admin.model';
import AddProductDialog from '../components/add-product-dialog';
import { MODE, BASE64, VARIANT_TYPE } from '../../../constants/common.constants';
import AdminService from '../service/admin.service';
import { uploadImage } from '../../../service/file.service';
import { MyPagination } from '../../../shared/components/my-pagination';
import MySnackbar from '../../../shared/components/my-snackbars';
import { MESSAGE_ADMIN } from '../constants/admin.constants';
import { MESSAGE_COMMON } from '../../../constants/message.constants';
import defaultPhoto from '../../../assets/no-product-image.png';
import { useLoading } from '../../../hooks';
import AuthorizedService from '../../../service/authorized.service';

const AdminProductPage = (props: any) => {

    let [products, setProduct] = useState();
    let [isCheckAll, setCheckAll] = useState(false);
    let [openDialog, setOpenDialog] = useState(false);
    let [mode, setMode] = useState(MODE.ADD);
    let [item, setItem] = useState();
    let [gridSetting, setGridSetting] = useState({ ...new GridSetting, PageSize: 5 });
    const [snackbar, setSnackbar] = useState(initSnackbarState);
    const [searchProduct, setSearchProduct] = useState('');
    const setLoading: any = useLoading();

    const authorService = new AuthorizedService();
    const adminService = new AdminService();

    let search = {};
    const classes = styles({});

    useEffect(() => {
        onSearch();
    }, [gridSetting.PageIndex, gridSetting.PageSize, searchProduct]);

    const onSearch = () => {
        search = { ...search, gridSetting, productName: searchProduct };
        getProduct();
    }

    const getProduct = () => {
        setLoading(true);
        adminService.getAdminProducts(search, (result) => {
            setLoading(false);
            if (result && result.count) {
                formatData(result);
            } else {

            }
        });
    }

    const formatData = (data: any) => {
        let products = {
            ...data,
            result: data.result.map((s: Product) => ({ ...s, isChecked: false })),
        }
        setProduct(products);
    };

    const handleCheckboxClick = (id: string) => {
        let list: any = products.map((s: ProductManage) => ({ ...s, isChecked: id == s._id ? !s.isChecked : s.isChecked }));
        let _isCheckAll = list.every(({ isChecked }: ProductManage) => isChecked == isCheckAll);
        setProduct(list);
        setCheckAll(_isCheckAll);
    };

    const handleClickAll = () => {
        let checkAll = !isCheckAll;
        setCheckAll(checkAll);
        let list: any = products.map((s: any) => ({ ...s, isChecked: checkAll }));
        setProduct(list);
    };

    const handleOpenDialog = (mode: string): void => {
        setMode(mode);
        setOpenDialog(true);
    };

    const handelCloseDialog = (): void => {
        setOpenDialog(false);
        setItem(null);
    }

    const handleClickSubmit = (item: ProductManage, trailerURL: string) => {
        let body = item;
        body.userId = authorService.getUserInfo().id;
        adminService.addProduct(body, (itemId: any) => {
            if (itemId.response === false) {
                setSnackbar({
                    message: MESSAGE_COMMON.ERROR,
                    variant: VARIANT_TYPE.ERROR,
                    open: true,
                })
            } else {
                if (itemId && item.image.file) {
                    let image: Image = { file: item.image.file, foreignId: itemId };
                    uploadImage(image, (resImage) => {
                        if (resImage) {
                            onSearch();
                        }
                    });
                    handleAddTrailer({ url: trailerURL, productId: item._id });
                } else if (itemId) {
                    onSearch();
                }
                setSnackbar({
                    message: mode === MODE.ADD ? MESSAGE_ADMIN.CREATE_PRODUCT_SUCCESS : MESSAGE_ADMIN.EDIT_PRODUCT_SUCCESS,
                    variant: VARIANT_TYPE.SUCCESS,
                    open: true,
                })
            }
        });
    };

    const handleAddTrailer = (body: TrailerModel) => {
        if (body.url) {
            adminService.addTrailer(body, result => {
                if (result.message) {
                    setSnackbar({
                        message: result.message,
                        variant: VARIANT_TYPE.ERROR,
                        open: true,
                    })
                }
            });
        }
    }

    const handleClickDelete = async (data: any) => {
        adminService.deleteProduct(data, ({ response }: any) => {
            if (response) {
                onSearch();
                setSnackbar({
                    message: MESSAGE_ADMIN.DELETE_PRODUCT_SUCCESS,
                    open: true,
                    variant: VARIANT_TYPE.SUCCESS,
                });
            } else {
                setSnackbar({
                    message: MESSAGE_COMMON.ERROR,
                    open: true,
                    variant: VARIANT_TYPE.ERROR,
                });
            }
        });
    }

    const onRowClick = (item: Product) => {
        setMode(MODE.EDIT);
        setItem(item);
        handleOpenDialog(MODE.EDIT);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGridSetting({
            ...gridSetting,
            PageSize: parseInt(event.target.value),
            PageIndex: 0,
        })
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setGridSetting({
            ...gridSetting,
            PageIndex: newPage
        })
    }

    const handleCloseSnackbar = (): void => {
        setSnackbar({ ...snackbar, open: false });
    }

    const handleDeleteImage = (snackbar: any): void => {
        setSnackbar({ ...snackbar });
        onSearch();
    }

    const handleSearchProduct = (event: any) => {
        setSearchProduct(event.target.value);
    }

    const renderCategory = (category: Dropdown[]) => {
        return category.map((s, i) => i === category.length - 1 ? s.name : s.name + ', ');
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.topContent}>
                    <Paper className={classes.searchProduct}>
                        <TextField
                            label='Search...'
                            value={searchProduct}
                            onChange={handleSearchProduct}
                        />
                    </Paper>
                    <div className={classes.iconContent}>
                        <Tooltip title={'Add Product'}>
                            <Fab className={classes.fabIcon} color='secondary' onClick={e => handleOpenDialog(MODE.ADD)}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </div>
                    <MyPagination
                        rowsPerPage={[5, 10, 20]}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        gridSetting={gridSetting}
                        onChangePage={handleChangePage}
                        total={products ? products.count : 0}
                    />
                </div>
                <Paper className={classes.tableContainer}>
                    <Table >
                        <TableHeadComponent checked={isCheckAll} onClickSelectAll={handleClickAll} classes={classes} />
                        <TableBody>
                            {
                                products ? products.result.map((s: any, i: number) => (
                                    <TableRow hover onClick={item => onRowClick(s)} key={i}>
                                        {/* <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={s.isChecked}
                                                inputProps={{ 'aria-labelledby': s._id }}
                                                onChange={c => handleCheckboxClick(s._id)}
                                            />
                                        </TableCell> */}
                                        {
                                            s.image ?
                                                <img className={classes.image} src={BASE64 + s.image.file} ></img> :
                                                <img className={classes.image} src={defaultPhoto} />
                                        }
                                        <TableCell className={classes.column}>{s.name}</TableCell>
                                        <TableCell className={classes.column}>{renderCategory(s.category)}</TableCell>
                                        <TableCell className={classes.column}>{s.release_year || 'N/A'}</TableCell>
                                        <TableCell className={classes.column}>
                                            <Typography component='p'>{s.description.substring(0, 80) + '...'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )) : 'Loading...'
                            }
                        </TableBody>
                    </Table>
                </Paper>

                <AddProductDialog
                    onOpen={openDialog}
                    onClose={handelCloseDialog}
                    mode={mode}
                    onClickSubmit={handleClickSubmit}
                    onClickDelete={handleClickDelete}
                    itemEdit={item}
                    onDeleteImageFile={handleDeleteImage}
                />

                <MySnackbar
                    message={snackbar.message}
                    variant={snackbar.variant}
                    open={snackbar.open}
                    onClose={handleCloseSnackbar}
                />
            </div>
        </>
    );
}

const TableHeadComponent = (props: any) => {
    const tableHead = ['', 'Name', 'Category', 'Release Year', 'Description',];
    const { onClickSelectAll, checked, classes } = props;
    return (
        <>
            <TableHead>
                {/* <TableCell padding="checkbox">
                    Select All <Checkbox checked={checked} onChange={onClickSelectAll} />
                </TableCell> */}
                {tableHead.map((content: string, i: number) => (
                    <TableCell className={classes.column} key={i}>
                        <TableSortLabel>
                            {content}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableHead>
        </>
    )
}

const styles = makeStyles({
    container: {
        margin: 20,
    },
    topContent: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    tableContainer: {
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    iconContent: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: 20,
        marginRight: 20,
    },
    fabIcon: {
    },
    image: {
        height: 100,
        width: 150,
    },
    column: {
    },
    searchProduct: {
        paddingLeft: 10,
        paddingRight: 10,
    }
})

export default AdminProductPage;