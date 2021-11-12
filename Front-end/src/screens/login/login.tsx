import React, { useState, ChangeEvent, useEffect } from 'react';
import { Box, makeStyles, Paper, TextField, Typography, Fade } from '@material-ui/core';
import './login.scss'
import { MaterialBoxShadow, TextHoverStyle } from '../../shared/material-styles/styles';
import MyBorderButton from '../../shared/components/my-border-button';
import { User } from './model/login.model';
import LoginService from './service/login.service';
import MySnackbar from '../../shared/components/my-snackbars';
import { initSnackbarState } from '../../models/common.model';
import { VARIANT_TYPE, LOCAL_STORAGE } from '../../constants/common.constants';
import CommonService from '../../service/common.service';
import { MESSAGE_LOGIN } from '../../constants/message.constants';
import MyCheckbox from '../../shared/components/my-checkbox';
import { useHistory } from 'react-router';
import { ROUTER_PRODUCT } from '../../constants/router.constants';
import { useStateValue } from '../../hooks/reducer/app.reducer';
import { ACTION_TYPE } from '../../constants/actionTypes';
import FacebookLogin from 'react-facebook-login';
import { FACEBOOK_APP_ID } from './constant/login.constants';
import AuthorizedService from '../../service/authorized.service';

export default function LoginPage() {
    const classes = styles();
    const history = useHistory();
    const [displaySignUp, setDisplaySinUp] = useState(false);
    const [user, setUser] = useState(new User());
    const [snackbar, setSnackbar] = useState(initSnackbarState);
    const [isExistUser, setExistUser] = useState(false);
    const [isIncorrectPassword, setCorrectPassword] = useState(false);
    const [isValidForm, setValidForm] = useState<boolean | undefined>(true);
    const [rememberMe, setRememberMe] = useState(false);


    const loginService = new LoginService;
    const commonService = new CommonService;
    const authorService = new AuthorizedService;

    const [state, dispatch]: any = useStateValue();

    useEffect(() => {
        const rememberMeLocal = localStorage.getItem(LOCAL_STORAGE.REMEMBER_ME);
        if (rememberMeLocal !== undefined) {
            setRememberMe(rememberMeLocal === 'true');
            const value = localStorage.getItem(LOCAL_STORAGE.REMEMBER_ME_VALUE) || '';
            value && setUser({ ...user, userId: value })
        }
    }, [rememberMe])

    const handleClickSignUp = () => {
        onReset();
        setDisplaySinUp(!displaySignUp);
    }

    const handleChangeTextRegister = (prop: keyof User) => (event: ChangeEvent<HTMLInputElement>) => {
        if (prop === 'userId') {
            setExistUser(false);
        }
        if (prop === 'confirmPassword' || prop === 'password') {
            setCorrectPassword(false);
        }

        // const isValidForm = commonService.onCheckValidForm(user);

        setUser({ ...user, [prop]: event.target.value });
        // setValidForm(isValidForm);
        setValidForm(true);
    }

    const handleSignIn = (): void => {
        if (!user.password || !user.userId) {
            setSnackbar({
                open: true,
                variant: VARIANT_TYPE.WARNING,
                message: MESSAGE_LOGIN.REQUIRE_ID_PASSWORD,
            })
        } else {
            let body = { userId: user.userId, password: user.password, remember: rememberMe };
            loginService.login(body, result => {
                if (result.message) {
                    setSnackbar({
                        open: true,
                        variant: VARIANT_TYPE.ERROR,
                        message: result.message,
                    })
                } else {
                    configLocalStore(result);
                    dispatch({ type: ACTION_TYPE.USER_LOGIN, data: result });
                    history.push(ROUTER_PRODUCT.ALL_PRODUCT);
                    setSnackbar({
                        open: true,
                        variant: VARIANT_TYPE.SUCCESS,
                        message: `Welcome ${result.displayName}`,
                    })
                }
            })
        }
    }

    const onSignUp = (): void => {
        loginService.signUpUser(user, response => {
            if (response.message) {
                setSnackbar({
                    message: response.message,
                    open: true,
                    variant: VARIANT_TYPE.ERROR,
                })
            } else {
                setSnackbar({
                    message: MESSAGE_LOGIN.REGISTER_SUCCESS,
                    open: true,
                    variant: VARIANT_TYPE.SUCCESS,
                })
                setDisplaySinUp(false);
                onReset();
            }
        });
    }

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    }

    const checkExistUser = () => {
        if (user.userId) {
            loginService.checkExistUser(user, ({ existed }: any) => {
                setExistUser(existed);
            });
        }
    }

    const onCheckConfirmPassword = () => {
        if (user.password && user.confirmPassword) {
            setCorrectPassword(user.confirmPassword !== user.password);
        }
    }

    const onReset = () => {
        setExistUser(false);
        setCorrectPassword(false);
        setValidForm(true);
        setUser(new User());
    }

    const onClickRememberMe = (event: any) => {
        setRememberMe(!rememberMe);
        localStorage.setItem(LOCAL_STORAGE.REMEMBER_ME, `${!rememberMe}`);
    }

    const configLocalStore = (user: User) => {
        localStorage.removeItem(LOCAL_STORAGE.USER_INFO);
        authorService.setUserInfo(user);
        if (rememberMe && !user.is3rdPartyUser) {
            localStorage.setItem(LOCAL_STORAGE.REMEMBER_ME_VALUE, user.userId)
        } else {
            localStorage.removeItem(LOCAL_STORAGE.REMEMBER_ME_VALUE);
            setRememberMe(false);
        }
    }

    const responseFacebook = (user: any) => {
        if (user.id) {
            const picture = user.picture;
            loginService.login({ user3rdParty: user }, response => {
                if (response.userId) {
                    const userInfo = { ...response, picture: picture };
                    configLocalStore(userInfo);
                    dispatch({ type: ACTION_TYPE.USER_LOGIN, data: userInfo });
                    history.push(ROUTER_PRODUCT.ALL_PRODUCT);
                    setSnackbar({
                        open: true,
                        variant: VARIANT_TYPE.SUCCESS,
                        message: `Welcome ${user.displayName}`,
                    })
                } else {
                    dispatch({ type: ACTION_TYPE.SHOW_SNACKBAR, data: { message: MESSAGE_LOGIN.LOGIN_FAILURE, variant: VARIANT_TYPE.WARNING, open: true } });
                }
            });
        }
    }

    return (
        <Box className={classes.container} height="100%">
            {
                displaySignUp ?
                    // Register
                    <Paper className={classes.content}>
                        <Typography className={classes.title} variant='h4' align='center'>Register</Typography>
                        <Typography className={classes.signUp} variant='caption' align='center'>
                            Create your account. It's free and only takes a minute.
                        </Typography>
                        <TextField
                            value={user.displayName}
                            required={true}
                            className={classes.inputText}
                            variant='outlined'
                            label='Display Name'
                            onChange={handleChangeTextRegister('displayName')}
                        />
                        <TextField
                            error={isExistUser}
                            value={user.userId}
                            required={true}
                            className={classes.inputText}
                            variant='outlined'
                            label='Username'
                            onChange={handleChangeTextRegister('userId')}
                            onBlur={checkExistUser}
                            helperText={isExistUser ? 'User ID already exists !' : ''}
                        />
                        <TextField
                            value={user.password}
                            required={true}
                            className={classes.inputText}
                            variant='outlined'
                            label='Password'
                            type='password'
                            onChange={handleChangeTextRegister('password')}
                            onMouseLeave={onCheckConfirmPassword}
                        />
                        <TextField
                            error={isIncorrectPassword}
                            required={true}
                            value={user.confirmPassword}
                            className={classes.inputText}
                            variant='outlined'
                            label='Confirm Password'
                            type='password'
                            onChange={handleChangeTextRegister('confirmPassword')}
                            onMouseLeave={onCheckConfirmPassword}
                            helperText={isIncorrectPassword ? 'Password not correct !' : ''}
                        />
                        <div className={classes.rememberMe}>
                            <Typography className={classes.signUpText} variant='caption' onClick={onReset} align='left'>Clear Form</Typography>
                            <Typography className={classes.signUpText} variant='caption' onClick={handleClickSignUp} align='right'>Back To Sign In</Typography>
                        </div>
                        <MyBorderButton
                            disabled={isIncorrectPassword || isExistUser || !isValidForm}
                            className={classes.button}
                            label='Sign Up'
                            onClick={onSignUp}
                        />
                    </Paper> :
                    // Login
                    <Paper className={classes.content}>
                        <Typography className={classes.title} variant='h4' align='center'>Welcome</Typography>
                        <TextField
                            value={user.userId}
                            required={true}
                            className={classes.inputText}
                            variant='outlined'
                            label='Username'
                            onChange={handleChangeTextRegister('userId')}
                        />
                        <TextField
                            required={true}
                            className={classes.inputText}
                            variant='outlined'
                            label='Password'
                            type='password'
                            onChange={handleChangeTextRegister('password')}
                        />
                        <div className={classes.rememberMe}>
                            <MyCheckbox label='Remember Me' checked={rememberMe} onChange={onClickRememberMe} id={'remember'} />
                            <Typography className={classes.signUpText} variant='caption' align='right'>Forgot Password</Typography>
                        </div>

                        <MyBorderButton
                            className={classes.button}
                            label='Sign In'
                            onClick={handleSignIn}
                        />
                        <Typography className={classes.signUp} variant='caption' align='center'>
                            Don't have an account? <Typography variant='caption' className={classes.signUpText} onClick={handleClickSignUp}>Sign Up</Typography>
                        </Typography>

                        <Typography className={classes.signUp} variant='caption' align='center'>
                            Sign In Using
                            <FacebookLogin
                                appId={FACEBOOK_APP_ID}
                                callback={responseFacebook}
                                fields="name,email,picture.type(large)"
                                cssClass={classes.signUpTextFacebook}
                                textButton='Facebook'
                            />
                            Or <Typography variant='caption' className={classes.signUpTextGoogle} onClick={handleClickSignUp}>Google</Typography>
                        </Typography>
                    </Paper>
            }
            <MySnackbar
                message={snackbar.message}
                open={snackbar.open}
                variant={snackbar.variant}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
}

const styles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        transition: '0.3s'
    },
    content: {
        minWidth: 320,
        maxHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        ...MaterialBoxShadow,
        padding: 20,
        margin: 10,
        transition: '0.3s',
    },
    title: {
        paddingBottom: 50,
        fontWeight: 'bold',
        color: '#3f4d60'
    },
    inputText: {
        marginTop: 10,
        fontSize: 12
    },
    rememberMe: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        marginTop: 20,
        marginBottom: 20
    },
    signUp: {
        paddingTop: 10,
        userSelect: 'none'
    },
    signUpText: {
        ...TextHoverStyle,
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: 10,
    },
    signUpTextFacebook: {
        cursor: 'pointer',
        fontWeight: 'bold',
        '&:hover': {
            color: '#3578E5'
        },
        transition: '0.3s',
        border: 'none',
        background: 'none',
    },
    signUpTextGoogle: {
        cursor: 'pointer',
        fontWeight: 'bold',
        '&:hover': {
            color: '#ea4335'
        },
        transition: '0.3s',
    }
})