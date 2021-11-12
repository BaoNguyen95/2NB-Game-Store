import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MY_ICON } from '../../../shared/models/shared.component.model';
import MyBadges from '../../../shared/components/my-badges';
import { PROFILE_MENU } from '../../profile/constants/profile.constants';

interface Props {
    onClickLogout: () => void,
    onClickProfile: () => void,
    disableProfile?: boolean,
    badges: number,
}

const DrawerList = (props: Props) => {
    const { onClickLogout, onClickProfile, disableProfile, badges } = props;
    return (
        <List className='content'>
            <ListItem button onClick={onClickProfile} disabled={disableProfile || false}>
                <ListItemIcon>{MY_ICON.AccountBoxIcon}</ListItemIcon>
                <ListItemText primary={PROFILE_MENU.PROFILE} />
            </ListItem>
            <ListItem button onClick={onClickProfile}>
                <ListItemIcon>{MY_ICON.LocalGroceryStoreRoundedIcon}</ListItemIcon>
                <ListItemText primary={PROFILE_MENU.MY_CART} />
                {badges !== 0 ? <MyBadges value={badges.toString()} /> : null}
            </ListItem>
            <ListItem button onClick={onClickLogout}>
                <ListItemIcon>{MY_ICON.ExitToAppIcon}</ListItemIcon>
                <ListItemText primary={PROFILE_MENU.LOGOUT} />
            </ListItem>
        </List>
    );
}

export default DrawerList;