import React, { useEffect, useState } from 'react';
import { List, ListItemText, Typography, ListItem, ListItemIcon } from '@material-ui/core';
import MyAvatar from '../../../shared/components/my-avatar';
import { useStateValue } from '../../../hooks/reducer/app.reducer';
import { LOCAL_STORAGE } from '../../../constants/common.constants';
import { makeStyles } from '@material-ui/styles';
import { User } from '../../login/model/login.model';
import { ProfileMenuItem } from '../models/profile.model';
import { PROFILE_MENU } from '../constants/profile.constants';
import { MY_ICON } from '../../../shared/models/shared.component.model';
import MyBadges from '../../../shared/components/my-badges';
import AuthorizedService from '../../../service/authorized.service';

const MenuProfile = (props: any) => {

    const { onClick } = props;

    const classes = styles();
    let [user, setUser] = useState(new User());
    const [{ UserInfo, cart }]: any = useStateValue();
    const userLocal = localStorage.getItem(LOCAL_STORAGE.USER_INFO);

    const authorService = new AuthorizedService();

    useEffect(() => {
        if (userLocal) {
            setUser(JSON.parse(userLocal));
        } else {
            UserInfo && setUser(UserInfo);
        }
    }, [UserInfo, userLocal])
    return (
        <div>
            <div className={classes.avatarContent}>
                <MyAvatar data={user} variant='h4' pixel={95} />
                <div className={classes.accountInfo}>
                    <Typography variant='h6'>{user.displayName}</Typography>
                    <Typography variant='caption'>{user.email}</Typography>
                    <Typography variant='caption'>{authorService.getRoleName()}</Typography>
                    <Typography variant='caption'>Last Login - {new Date(user.lastLogin).toLocaleDateString()}</Typography>
                </div>
            </div>
            <List>
                {MenuItems.map((item: ProfileMenuItem, i: number) => {
                    return (
                        <ListItem key={i} button onClick={e => onClick(i)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                            {item.label == PROFILE_MENU.MY_CART && cart.total ? <MyBadges value={cart.total} /> : null}
                        </ListItem>
                    )
                })}
            </List>
        </div >
    );
}

const MenuItems: ProfileMenuItem[] = [
    { label: PROFILE_MENU.INFORMATION, icon: MY_ICON.AccountBoxIcon },
    { label: PROFILE_MENU.MY_CART, icon: MY_ICON.LocalGroceryStoreRoundedIcon },
    { label: PROFILE_MENU.FAVORITE, icon: MY_ICON.BookmarkIcon },
    { label: PROFILE_MENU.QUESTION_AND_ANSWER, icon: MY_ICON.LiveHelpIcon }
]

const styles = makeStyles({
    avatarContent: {
        display: 'flex',
    },
    accountInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        marginLeft: 20
    }
});

export default MenuProfile;