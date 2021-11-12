import React, { useState } from 'react';
import '../admin.scss';
import { Card, CardContent, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, CardHeader, Box } from '@material-ui/core';
import { useLoading } from '../../../hooks';
import { Dropdown } from '../../../models/common.model';
import { makeStyles } from '@material-ui/styles';
import AdminService from '../service/admin.service';
import { MESSAGE_ADMIN } from '../constants/admin.constants';
import { VARIANT_TYPE } from '../../../constants/common.constants';
import { MESSAGE_COMMON, MESSAGE_CONFIRM } from '../../../constants/message.constants';
import { useStateValue } from '../../../hooks/reducer/app.reducer';
import { ACTION_TYPE } from '../../../constants/actionTypes';
import MyConfirmDialog from '../../../shared/components/my-confirm-dialog';
import { ConfirmDialogModel } from '../../../shared/models/shared.component.model';
import { DIALOG_CONSTANTS } from '../../../constants/dialog.constants';

const initState = {
    item: {
        _id: '',
        name: '',
    },
}

export default function AdminManageCategoryPage() {

    const classes = styles({});

    const adminService = new AdminService();

    const [openDialog, setOpenDialog] = useState(false);
    const [values, setValues] = useState(initState);
    const [isAdd, setMode] = useState(true);
    const [confirmDialog, setConfirmDialog] = useState(new ConfirmDialogModel);
    const [{ categories }, dispatch]: any = useStateValue();
    const setLoading: any = useLoading(false);

    const onOpenDialog = () => {
        setMode(true);
        setOpenDialog(true);
    }

    const onCloseDialog = () => {
        setOpenDialog(false);
        setValues(initState);
    }

    const onEdit = (item: any) => {
        setValues({ item: item });
        setMode(false);
        setOpenDialog(true);
    }

    const onSubmit = async () => {
        setLoading(true);
        adminService.addCategory(values.item, (response) => {
            setLoading(false);
            if (response || response._id) {
                dispatch({
                    type: ACTION_TYPE.SHOW_SNACKBAR,
                    data: {
                        message: isAdd ? MESSAGE_ADMIN.CREATE_CATEGORY_SUCCESS : MESSAGE_ADMIN.EDIT_CATEGORY_SUCCESS,
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true
                    }
                });
                dispatch({ type: ACTION_TYPE.CATEGORY, data: categories.push({}) })
            } else {
                dispatch({
                    type: ACTION_TYPE.SHOW_SNACKBAR,
                    data: {
                        message: MESSAGE_COMMON.ERROR,
                        variant: VARIANT_TYPE.ERROR,
                        open: true
                    }
                });
            }
        });
        onCloseDialog();
    }


    const onChangeDialogValue = (event: any) => {
        setValues({
            item: {
                _id: values.item._id,
                name: event.target.value
            }
        })
    }

    const onConfirmDelete = () => {
        setConfirmDialog({
            message: MESSAGE_CONFIRM.DELETE,
            title: DIALOG_CONSTANTS.TITLE.DELETE,
            actionText: DIALOG_CONSTANTS.ACTION.YES,
            open: true,
        })
    }

    const onConfirmDialog = (): void => {
        setConfirmDialog({ ...confirmDialog, open: false });
        switch (confirmDialog.title) {
            case DIALOG_CONSTANTS.TITLE.DELETE:
                onDelete()
                break;
        }
    }

    const onDelete = () => {
        let body = {
            id: values.item._id
        }
        setLoading(true);
        adminService.deleteCategory(body, ({ response }: any) => {
            setLoading(false);
            if (response == true) {
                dispatch({
                    type: ACTION_TYPE.SHOW_SNACKBAR,
                    data: {
                        message: MESSAGE_ADMIN.DELETE_CATEGORY_SUCCESS,
                        variant: VARIANT_TYPE.SUCCESS,
                        open: true
                    }
                });
                dispatch({ type: ACTION_TYPE.CATEGORY, data: categories.push({}) })
            } else {
                dispatch({
                    type: ACTION_TYPE.SHOW_SNACKBAR,
                    data: {
                        message: MESSAGE_COMMON.ERROR,
                        variant: VARIANT_TYPE.ERROR,
                        open: true
                    }
                });
            }
        });
        onCloseDialog();
    }

    return (
        <>
            <Box className={classes.listCategory}>
                <div className={classes.content}>
                    <Card className={classes.category} onClick={onOpenDialog}>
                        <CardHeader title='+'></CardHeader>
                    </Card>
                    {categories.length ? categories.map((s: Dropdown, i: number) => {
                        return (
                            <Card key={i} className={classes.category} onClick={item => onEdit(s)}>
                                <CardContent>{s.name}</CardContent>
                            </Card>
                        )
                    }) : null}
                    <Dialog open={openDialog} onClose={onCloseDialog}>
                        <DialogTitle>{isAdd ? 'Add' : 'Edit'} Category</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                label='Category Name'
                                value={values.item.name}
                                onChange={onChangeDialogValue}

                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onSubmit} color='primary' disabled={values.item.name === ''}>
                                Submit
                        </Button>
                            <Button onClick={onConfirmDelete} color='secondary' disabled={isAdd}>
                                Delete
                        </Button>
                            <Button onClick={onCloseDialog}>
                                Close
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <MyConfirmDialog
                    message={confirmDialog.message}
                    title={confirmDialog.title}
                    open={confirmDialog.open}
                    actionText={confirmDialog.actionText}
                    onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
                    onConfirm={onConfirmDialog}
                />

            </Box >
        </>
    );
}


const styles = makeStyles({
    listCategory: {
        display: 'flex',
        justifyContent: 'center',
    },
    content: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    category: {
        color: 'black',
        margin: 15,
        width: 210,
        textAlign: 'center',
        cursor: 'pointer',
    }
});
