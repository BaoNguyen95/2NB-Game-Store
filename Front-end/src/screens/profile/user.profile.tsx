import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuProfile from './components/profile.menu';
import { TabPanel } from '../../shared/components/my-tab-panel';
import InformationTab from './components/tabs/information-tab';
import CartTab from './components/tabs/cart-tab';

const UserProfilePage = (props: any) => {

    const classes = styles();

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {

    }, [])

    const handleClickMenu = (index: number): void => {
        setTabIndex(index);
    }

    return (
        <Box className={classes.container}>
            <Paper className={classes.menu}>
                <MenuProfile onClick={handleClickMenu} />
            </Paper>
            <Paper className={classes.content}>
                <TabPanel value={tabIndex} index={0}>
                    <InformationTab />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <CartTab />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    Favorite
                </TabPanel>
            </Paper>
        </Box>
    );
}

const styles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    menu: {
        flex: 1,
        padding: 20,
        margin: 10,
    },
    content: {
        flex: 3,
        margin: 10,
    }
});

export default UserProfilePage;