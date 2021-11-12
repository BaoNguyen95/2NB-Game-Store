import LocalGroceryStoreRoundedIcon from '@material-ui/icons/LocalGroceryStoreRounded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';

import React from 'react';
import { DIALOG_CONSTANTS } from '../../constants/dialog.constants';
export interface RadioModel {
    label: string,
    value: any,
    disabled?: boolean,
}

export class ConfirmDialogModel {
    title: string;
    message: string;
    open: boolean;
    actionText?: string;
    onClose?: () => void;
    onConfirm?: () => void;
    constructor() {
        this.message = '';
        this.title = '';
        this.open = false;
        this.actionText = DIALOG_CONSTANTS.ACTION.YES;
    }
}

export const MY_ICON = {
    LocalGroceryStoreRoundedIcon: <LocalGroceryStoreRoundedIcon className='custom-icon' ></LocalGroceryStoreRoundedIcon>,
    AccountBoxIcon: <AccountBoxIcon className='custom-icon'></AccountBoxIcon>,
    BookmarkIcon: <BookmarkIcon className='custom-icon'></BookmarkIcon>,
    ExitToAppIcon: <ExitToAppIcon className='custom-icon'></ExitToAppIcon>,
    LiveHelpIcon: <LiveHelpIcon className='custom-icon'></LiveHelpIcon>,
    AddShoppingCartIcon: <AddShoppingCartIcon className='custom-icon'></AddShoppingCartIcon>,
    HighlightOffIcon: <HighlightOffIcon className='custom-icon' fontSize='small'></HighlightOffIcon>,
    PhotoCameraIcon: <PhotoCameraIcon className='custom-icon'></PhotoCameraIcon>,
    RemoveShoppingCartIcon: <RemoveShoppingCartIcon color='secondary'></RemoveShoppingCartIcon>,
    ExpandLessIcon: <ExpandLessIcon className='custom-icon'></ExpandLessIcon>,
    ExpandMoreIcon: <ExpandMoreIcon className='custom-icon'></ExpandMoreIcon>,
    DeleteForeverIcon: <DeleteForeverIcon className='custom-icon'> </DeleteForeverIcon>,
    SendIcon: <SendIcon className='custom-icon'></SendIcon>,
    ChatIcon: <ChatIcon></ChatIcon>
}