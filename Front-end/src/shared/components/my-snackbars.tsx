import React, { SyntheticEvent } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SnackbarModel } from '../../models/common.model';
import { useStateValue } from '../../hooks/reducer/app.reducer';
import { ACTION_TYPE } from '../../constants/actionTypes';

interface Props {
    className?: string;
    message?: string;
    onClose?: () => void;
    variant: keyof typeof variantIcon;
}

const MySnackbar = (props: SnackbarModel) => {
    const { message, variant, open, onClose } = props;

    const [state, dispatch]: any = useStateValue();

    const onCloseSnackbar = () => {
        dispatch({ type: ACTION_TYPE.SHOW_SNACKBAR, data: new SnackbarModel() })
        onClose();
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            autoHideDuration={2000}
            open={open}
            onClose={onCloseSnackbar}
        >
            <SnackBarContent
                message={message}
                onClose={onCloseSnackbar}
                variant={variant}
            />
        </Snackbar>
    )
}

const SnackBarContent = (props: Props) => {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
    return (
        <>
            <SnackbarContent
                className={clsx(classes[variant], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                {...other}
            />
        </>
    );
}

export const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles1 = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export default MySnackbar;