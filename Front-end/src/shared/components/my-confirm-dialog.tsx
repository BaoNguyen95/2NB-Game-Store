import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import MyBorderButton from './my-border-button';
import { ConfirmDialogModel } from '../models/shared.component.model';
import { DIALOG_CONSTANTS } from '../../constants/dialog.constants';

const MyConfirmDialog = (props: ConfirmDialogModel) => {

    const { title, message, open, actionText, onConfirm, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <MyBorderButton label={actionText || DIALOG_CONSTANTS.ACTION.YES} noneRadius={true} onClick={onConfirm} />
                <Button variant='outlined' onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MyConfirmDialog;
