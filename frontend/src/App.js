// react
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// ui
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

// hook
import { CommonContext } from './context/CommonContext';
import { useLocalStorageSetState } from './common/CommonHooks';

// page
import Main from './pages/Main/';
import Auth from './pages/Auth/';
import Terms from './pages/Terms/';
import MyVote from './pages/MyVote/';
import AboutTeam from './pages/AboutTeam/';
import NotFound from './pages/NotFound/';
import MainVote from './pages/MainVote/';
import ContactUs from './pages/ContactUs/';
import CreateVote from './pages/CreateVote/';
import SearchVote from './pages/SearchVote/';
import Ask from './pages/Ask/';
import Community from './pages/Community/';
import Admin from './pages/Admin/';
import MyFarm from './pages/MyFarm/';

// css
// import './index.css';

// const
const defaultThumbnailImage = 'default_user.jpg';
const HOST = '127.0.0.1:3001';
const serverUrl = `http://${HOST}/v1`;
const serverUrlBase = `http://${HOST}`;
const serverImgUrl = `https://ssafy-viba-s3.s3.ap-northeast-2.amazonaws.com/public/`;

/// theme
const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR'].join(','),
    button: {
      fontFamily: 'Noto Sans KR',
    },
    body1: {
      fontWeight: 500,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'white',
        },
      },
    },
  },
});

// app
const App = () => {
  const [user, setUser] = useLocalStorageSetState(
    {
      id: '',
      name: '',
      token: '',
      status: '',
      type:'',
    },
    'user',
  );
  const [infoData, setInfoData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userDialogIndex, setUserDialogIndex] = useState(0);
  const [isShowKeyborad, setIsShowKeyborad] = useState(false);
  const [isSignUp, setIsSignUp] = useState('SignIn');
  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDetailDialogOpen] = useState(false);
  const [userDialogOpen, setUserDetailDialogOpen] = useState(false);

  return (
    <CommonContext.Provider
      value={{
        serverUrl,
        user,
        setUser,
        drawerOpen,
        setDrawerOpen,
        signDialogOpen,
        setSignDialogOpen,
        infoDialogOpen,
        setInfoDetailDialogOpen,
        infoData,
        setInfoData,
        userDialogOpen,
        setUserDetailDialogOpen,
        userDialogIndex,
        setUserDialogIndex,
        serverUrlBase,
        serverImgUrl,
        isShowKeyborad,
        setIsShowKeyborad,
        defaultThumbnailImage,
        isSignUp,
        setIsSignUp,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/MainVote" component={MainVote} />
            <Route exact path="/Auth" component={Auth} />
            <Route exact path="/Terms" component={Terms} />
            <Route exact path="/MyVote" component={MyVote} />
            <Route exact path="/AboutTeam" component={AboutTeam} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/SearchVote" component={SearchVote} />
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/CreateVote" component={CreateVote} />
            <Route exact path="/Ask" component={Ask} />
            <Route exact path="/Community" component={Community} />
            <Route exact path="/MyFarm" component={MyFarm} />
            <Route exact path="/Admin" component={Admin} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </CommonContext.Provider>
  );
};

export default App;
