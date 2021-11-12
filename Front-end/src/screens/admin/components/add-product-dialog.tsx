import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, TextField, FormGroup, Select,
    MenuItem, InputLabel, DialogActions, Button, IconButton, Chip
} from '@material-ui/core';
import { ManageProductDialog, ProductManage, TrailerModel } from '../models/admin.model';
import { RELEASE_YEAR, MESSAGE_ADMIN } from '../constants/admin.constants';
import { useFetch } from '../../../hooks';
import { CATEGORY_API } from '../../../constants/api.constants';
import { Dropdown } from '../../../models/common.model';
import { MODE, BASE64, VARIANT_TYPE } from '../../../constants/common.constants';
import DeleteIcon from '@material-ui/icons/Delete';
import { convertFileToBase64 } from '../../../helper/helper';
import { deletePhoto } from '../../../service/file.service';
import { MESSAGE_FILE } from '../../../constants/message.constants';
import { productDialogStyles } from './styles';
import MyExpansionPanel from '../../../shared/components/my-expansion-panel';
import AdminService from '../service/admin.service';
import { useStateValue } from '../../../hooks/reducer/app.reducer';
import { ACTION_TYPE } from '../../../constants/actionTypes';

const initState: ProductManage = {
    _id: '',
    name: '',
    categoryId: [],
    category: [],
    description: '',
    isChecked: false,
    image: {
        file: '',
        foreignId: '',
    },
    release_year: '',
    price: '',
    discountPercent: '',
};

const AddProductDialog = (props: ManageProductDialog) => {
    const classes = productDialogStyles();
    const { onOpen, onClose, mode, onClickSubmit, itemEdit, onClickDelete, onDeleteImageFile } = props;

    const [item, setItem] = useState<ProductManage>(initState);
    let [categoryData] = useFetch(CATEGORY_API.GET_ALL);
    const [category, setCategory] = useState<Dropdown[]>([{ _id: '', name: '' }]);
    const [image, setImage] = useState();
    const [trailerURL, setTrailerURL] = useState<TrailerModel>({ url: '' });

    const [state, dispatch]: any = useStateValue();

    const adminService = new AdminService();

    useEffect(() => {
        if (mode == MODE.EDIT && itemEdit) {
            itemEdit.image = {
                ...itemEdit.image,
                foreignId: itemEdit._id,
            }
            if (categoryData) {
                itemEdit.categoryId = itemEdit.category;
                categoryData = categoryData.map((s: Dropdown) => ({ ...s, disabled: itemEdit.category.some((x: Dropdown) => x._id === s._id) }));
            }
            setItem(itemEdit);
            adminService.getTrailer(itemEdit._id, url => setTrailerURL(url));
        }
        setCategory(categoryData);
    }, [categoryData, itemEdit])


    const onChangeDialogValue = (e: any, type: string): void => {
        let value = e.target.value;
        switch (type) {
            case 'Title':
                setItem({ ...item, name: value })
                break;
            case 'Description':
                setItem({ ...item, description: value })
                break;
            case 'Release Year':
                setItem({ ...item, release_year: value })
                break;
            case 'Category':
                if (item.categoryId.length < 4) {
                    const cate = category.filter((s: Dropdown) => value.includes(s._id)) || { _id: '', name: '' };
                    cate.map(s => s.disabled = true);
                    setItem({ ...item, categoryId: item.categoryId.concat(cate), image: { ...item.image, foreignId: value } })
                } else {
                    dispatch({ type: ACTION_TYPE.SHOW_SNACKBAR, data: { message: MESSAGE_ADMIN.LIMIT_CATEGORY, variant: VARIANT_TYPE.WARNING, open: true } });
                }
                break;
            case 'URL':
                setTrailerURL({ url: value });
                break;
            case 'Price':
                setItem({ ...item, price: value });
                break;
            case 'Discount':
                setItem({ ...item, discountPercent: value });
                break;
            default:
                break;
        }
    }

    const onDropImage = (picture: any) => {
        convertFileToBase64(picture[0], res => {
            setImage(res);
            setItem({
                ...item,
                image: {
                    ...item.image,
                    file: picture[0],
                },
            })
        });

    }

    const handelClose = (event: any): void => {
        onClose(event);
        onResetItem();
    }

    const handleSubmit = (event: any): void => {
        item.price = parseInt(item.price);
        item.discountPercent = parseInt(item.discountPercent);
        onClickSubmit(item, trailerURL.url);
        onClose(event)
        onResetItem();
    }

    const handleDelete = (event: any): void => {
        onClickDelete({ id: item._id });
        onClose(event);
        onResetCategory();
    }

    const onResetItem = () => {
        setItem(initState);
        setTrailerURL({ url: '' });
        onResetCategory();
        setImage('');
    }

    const onDeleteImage = (): void => {
        if (mode === MODE.ADD) {
            setImage('');
        } else if (mode === MODE.EDIT && !item.image.id) {
            resetImageItemEdit();
        } else {
            deletePhoto(itemEdit.image, ({ response }) => {
                if (response) {
                    resetImageItemEdit();
                    onDeleteImageFile({
                        message: MESSAGE_FILE.DELETE_FILE_SUCCESS,
                        open: true,
                        variant: VARIANT_TYPE.SUCCESS,
                    });
                } else {
                    onDeleteImageFile({
                        message: MESSAGE_FILE.DELETE_FILE_SUCCESS,
                        open: true,
                        variant: VARIANT_TYPE.SUCCESS,
                    });
                }
            });
        }
    }

    const resetImageItemEdit = () => {
        setItem({
            ...item,
            image: {
                file: '',
                id: '',
                foreignId: item.image.foreignId
            }
        })
    }

    const renderImage = () => {
        if (mode === MODE.ADD) {
            return (
                <>
                    <div className={classes.image}>
                        {
                            image ?
                                <>
                                    <img className={classes.imageContent} src={image} />
                                    <IconButton aria-label="delete" className={classes.removeImageIcon} onClick={onDeleteImage}>
                                        <DeleteIcon className={classes.deleteIcon} />
                                    </IconButton>
                                </>

                                :
                                <div className={classes.imageEmptyContent}>
                                    <label className={classes.textChooseFile}>
                                        <input className={classes.imageEmpty} type='file' onChange={e => onDropImage(e.target.files)} />
                                        Choose a file
                                    </label>
                                    or drag here
                                </div>
                        }
                    </div>

                </>
            );
        } else {
            const photo = typeof item.image.file === 'string' ? BASE64 + item.image.file : image;
            return (
                <div className={classes.image}>
                    {
                        item.image.file ?
                            <>
                                <img className={classes.imageContent} src={photo} />
                                <IconButton aria-label="delete" className={classes.removeImageIcon} onClick={onDeleteImage}>
                                    <DeleteIcon className={classes.deleteIcon} />
                                </IconButton>
                            </>
                            :
                            <div className={classes.imageEmptyContent}>
                                <label className={classes.textChooseFile}>
                                    <input className={classes.imageEmpty} type='file' onChange={e => onDropImage(e.target.files)} />
                                    Choose a file
                                    </label>
                                or drag here
                            </div>
                    }
                </div>
            );
        }
    }

    const onRenderChip = () => {
        return item.categoryId.map((s: Dropdown, i: number) => {
            return <Chip key={i} label={s.name} onDelete={e => onDeleteChip(s._id)} />
        })
    }

    const onDeleteChip = (id: string) => {
        const categories = item.categoryId.filter((s: Dropdown) => s._id != id);
        onResetCategory(id);
        setItem({ ...item, categoryId: categories })
    }

    const onResetCategory = (id?: string) => {
        if (id) {
            setCategory(category.map((s: Dropdown) => {
                if (s._id === id) s.disabled = false;
                return s;
            }));
        } else {
            setCategory(category.map(s => ({ ...s, disabled: false })));
        }
    }

    return (
        <>
            <FormGroup >
                <Dialog className={classes.container} open={onOpen} onClose={handelClose}>
                    <DialogTitle>{mode === MODE.ADD ? 'Add' : 'Edit'} Product</DialogTitle>
                    <DialogContent className={classes.content}>
                        {renderImage()}
                        {/* Information */}
                        <MyExpansionPanel header="Information" className={classes.expansion} expanded={true}>
                            <TextField
                                label='Title'
                                value={item.name}
                                onChange={value => onChangeDialogValue(value, 'Title')}
                            />
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={item.categoryId}
                                onChange={value => onChangeDialogValue(value, 'Category')}
                                renderValue={onRenderChip}
                                multiple
                                multiline={true}
                            >
                                {category.map((s: Dropdown, i: number) => (<MenuItem key={i} value={s._id} disabled={s.disabled}>{s.name}</MenuItem>))}
                            </Select>
                            <InputLabel>Release Year</InputLabel>
                            <Select value={item.release_year} onChange={value => onChangeDialogValue(value, 'Release Year')}>
                                {RELEASE_YEAR.map((year: string) => (<MenuItem value={year}>{year}</MenuItem>))}
                            </Select>
                            <TextField
                                multiline={true}
                                label='Description'
                                value={item.description}
                                onChange={value => onChangeDialogValue(value, 'Description')}
                            />
                            <TextField
                                label='Price'
                                value={item.price}
                                onChange={value => onChangeDialogValue(value, 'Price')}
                            />
                            <TextField
                                label='Discount'
                                value={item.discountPercent}
                                onChange={value => onChangeDialogValue(value, 'Discount')}
                            />
                        </MyExpansionPanel>
                        {/* System Requirement */}
                        <MyExpansionPanel header="System Requirement" className={classes.expansion}>

                        </MyExpansionPanel>
                        {/* Trailer/Gameplay Link */}
                        <MyExpansionPanel header="Trailer/Gameplay" className={classes.expansion} expanded={true}>
                            <TextField
                                label='URL'
                                multiline={true}
                                value={trailerURL.url}
                                onChange={value => onChangeDialogValue(value, 'URL')}
                            />
                        </MyExpansionPanel>
                        {/* Screenshot */}
                        <MyExpansionPanel header="Screenshot" className={classes.expansion}>

                        </MyExpansionPanel>
                        {/* Download Link */}
                        <MyExpansionPanel header="Download Link" className={classes.expansion}>

                        </MyExpansionPanel>
                        <DialogActions>
                            <Button onClick={handleSubmit} color='primary'>Submit</Button>
                            <Button onClick={handleDelete} color='secondary' disabled={mode === MODE.ADD}>Delete</Button>
                            <Button onClick={handelClose}>Close</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </FormGroup>
        </>
    );
};

export default AddProductDialog;