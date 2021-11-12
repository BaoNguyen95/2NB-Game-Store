import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { User } from '../../../login/model/login.model';
import MyRadioButtons from '../../../../shared/components/my-radio-button';
import { GENDER } from '../../models/profile.model';
import MyPicker from '../../../../shared/components/my-picker';
import MyBorderButton from '../../../../shared/components/my-border-button';
import ProfileService from '../../service/profile.service';
import AuthorizedService from '../../../../service/authorized.service';
import { useStateValue } from '../../../../hooks/reducer/app.reducer';
import { ACTION_TYPE } from '../../../../constants/actionTypes';
import { VARIANT_TYPE, LOCAL_STORAGE } from '../../../../constants/common.constants';
import { MESSAGE_COMMON } from '../../../../constants/message.constants';
import { useLoading } from '../../../../hooks';

const InformationTab = (props: any) => {

    const classes = styles();
    const [user, setUser] = useState(new User());
    const profileService = new ProfileService();
    const authorService = new AuthorizedService();

    const userLocal = authorService.getUserInfo();
    const [state, dispatch]: any = useStateValue();
    const setLoading: any = useLoading();

    useEffect(() => {
        getUserInfo();
    }, []);


    const getUserInfo = () => {
        setLoading(true);
        profileService.getUserInfo(userLocal.id, (response: any) => {
            setLoading(false);
            if (response.message) {
                dispatch({ type: ACTION_TYPE.SHOW_SNACKBAR, data: { message: response.message, open: true, variant: VARIANT_TYPE.ERROR } });
            } else {
                setUser(response);
            }
        });
    }

    const onChangeTextField = (prop: keyof User) => (event: any) => {
        if (prop == 'dateOfBirth') {
            setUser({ ...user, [prop]: event });
        } else {
            setUser({ ...user, [prop]: event.target.value });
        }
    }

    const onRadioGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, gender: event.target.value == 'true' });
    }

    const onClickUpdate = (): void => {
        profileService.updateUser(user, response => {
            if (response.message) {
                dispatch({ type: ACTION_TYPE.SHOW_SNACKBAR, data: { message: response.message, variant: VARIANT_TYPE.ERROR, open: true, } });
            } else {
                const token = authorService.getToken();
                const picture = authorService.getUserInfo().picture;
                const userInfo = { ...response, token: token, id: response._id, picture: picture };
                localStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(userInfo));
                dispatch({ type: ACTION_TYPE.SHOW_SNACKBAR, data: { message: MESSAGE_COMMON.SUCCESS, variant: VARIANT_TYPE.SUCCESS, open: true, } });
                dispatch({ type: ACTION_TYPE.USER_LOGIN, data: userInfo });
            }
        })
    }

    return (
        <Box className={classes.container}>
            <Typography variant='h6'>About Me</Typography>
            <div className={classes.content}>
                <TextField
                    disabled={true}
                    value={user.userId}
                    variant='outlined'
                    label='User ID'
                    className={classes.textField}
                    onChange={onChangeTextField('userId')}
                />
                <TextField
                    value={user.displayName}
                    variant='outlined'
                    label='Display Name'
                    className={classes.textField}
                    onChange={onChangeTextField('displayName')}
                />
                <TextField
                    value={user.email}
                    variant='outlined'
                    label='E-mail'
                    className={classes.textField}
                    onChange={onChangeTextField('email')}
                />
                <div className={classes.textField} >
                    <MyRadioButtons
                        label='Gender'
                        direction={classes.radioDirection}
                        value={user.gender}
                        onChange={onRadioGenderChange}
                        data={GENDER}
                    />
                    <MyPicker
                        value={user.dateOfBirth}
                        onChange={onChangeTextField('dateOfBirth')}
                        label="Date Of Birth"
                        max={new Date()}
                    />
                </div>
                <TextField
                    value={user.phoneNumber}
                    variant='outlined'
                    label='Phone Number'
                    className={classes.textField}
                    onChange={onChangeTextField('phoneNumber')}
                />
                <TextField
                    value={user.address}
                    variant='outlined'
                    label='Address'
                    className={classes.textField}
                    onChange={onChangeTextField('address')}
                />
            </div>
            <div className={classes.button}>
                <MyBorderButton
                    label='Update'
                    onClick={onClickUpdate}
                    noneRadius={true}
                />
            </div>
        </Box>
    );
}

const styles = makeStyles({
    container: {

    },
    content: {
        paddingTop: 20,
    },
    textField: {
        display: 'flex',
        marginTop: 20,
        flexWrap: 'wrap',
    },
    radioDirection: {
        flexDirection: 'row',
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 20
    }
});

export default InformationTab;