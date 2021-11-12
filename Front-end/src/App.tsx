import React, { useState } from 'react';
import './App.scss';
import TopBarComponent from './screens/top-bar/top-bar';
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from './hooks/reducer/app.reducer';
import { LinearProgress, makeStyles } from '@material-ui/core';
import AppNavigation from './app.navigation';
import MySnackbar from './shared/components/my-snackbars';
import { SnackbarModel } from './models/common.model';
import MyChatBox from './shared/components/chatbox/my-chatbox';
import AuthorizedService from './service/authorized.service';
import { MESSAGE_LOGIN } from './constants/message.constants';
import { VARIANT_TYPE, ROLE } from './constants/common.constants';

const App = () => {

  const classes = styles();

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(new SnackbarModel());
  const [openChatbox, setOpenChatbox] = useState(false);

  const userInfo = new AuthorizedService().getUserInfo();

  const handleLoading = (isLoading: boolean): void => {
    setLoading(isLoading);
  }

  const onCloseSnackbar = (): void => setSnackbar({ ...snackbar, open: false });

  const handleOpenChatBox = () => {
    if (userInfo.id) {
      setOpenChatbox(!openChatbox);
    } else {
      setSnackbar({ message: MESSAGE_LOGIN.REQUIRE_USER_LOGIN, variant: VARIANT_TYPE.INFO, open: true });
    }
  }

  const renderChatButton = () => {
    if (userInfo.roleId === ROLE.CUSTOMER || userInfo.roleId === '') {
      return < MyChatBox
        open={openChatbox}
        onOpen={handleOpenChatBox}
      />
    }
  }

  return (
    <StateProvider >
      <Router>
        <TopBarComponent />
        {loading ? <LinearProgress className={classes.LinearProgress} /> : <div className={classes.space}></div>}
        <div className='switchView'>
          <AppNavigation
            setLoading={handleLoading}
            setSnackbar={setSnackbar}
          />
        </div>
        {renderChatButton()}
        <MySnackbar
          message={snackbar.message}
          open={snackbar.open}
          variant={snackbar.variant}
          onClose={onCloseSnackbar}
        />
      </Router >
    </StateProvider >
  );
}

const styles = makeStyles({
  LinearProgress: {
  },
  space: {
    height: 4
  }
});

export default App;
