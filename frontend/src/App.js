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
import AboutTeam from './pages/AboutTeam/';
import NotFound from './pages/NotFound/';
import ContactUs from './pages/ContactUs/';
import Notice from './pages/Notice';
import NoticeDetail from './pages/Notice/Detail/';
import NoticeWrite from './pages/Notice/Write/';
import NoticeUpdate from './pages/Notice/Update/';
import Community from './pages/Community/';
import Admin from './pages/Admin/';
import MyFarm from './pages/MyFarm/';
import CommunityDetail from './pages/Community/Detail';
import CommunityWrite from './pages/Community/Write';
import CommunityUpdate from './pages/Community/Update';

// css
// import './index.css';
import './App.css';

// const
const defaultThumbnailImage = 'default_user.jpg';
const HOST = '52.79.38.33:3001';
const serverUrl = `http://${HOST}/v1`;
const serverUrlBase = `http://${HOST}`;
const serverImgUrl = `https://ssafy-viba-s3.s3.ap-northeast-2.amazonaws.com/public/`;

/// theme
const theme = createTheme({
  // fontFamily: `'Do Hyeon', sans-serif`,
  typography: {
    // fontFamily: ['Noto Sans KR'].join(','),
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  Button: {
    //fontFamily: 'Noto Sans KR',
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  body1: {
    fontWeight: 500,
  },
  TableBody: {
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  TableCell: {
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  TableRow: {
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  TableContainer: {
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  TableHead: {
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  Grid: {
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  InputBase: {
    fontFamily: `'Do Hyeon', sans-serif`,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'white',
          fontFamily: `'Do Hyeon', sans-serif`,
        },
      },
    },
  },
});

function parsingDate(date) {
  const day = date.substr(0, 10);
  const time = date.substr(11, 5);

  return day + ' ' + time;
}

// app
const App = () => {
  const [user, setUser] = useLocalStorageSetState(
    {
      user_id: '',
      user_nickName: '',
      token: '',
      status: '',
      user_code: '',
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
  const [regiIoTDialogOpen, setRegiIotDialogOpen]=useState(false);


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
        parsingDate,
        regiIoTDialogOpen,
        setRegiIotDialogOpen
      }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/Auth" component={Auth} />
            <Route exact path="/Terms" component={Terms} />
            <Route exact path="/AboutTeam" component={AboutTeam} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/Notice" component={Notice} />
            <Route exact path="/NoticeDetail/:no" component={NoticeDetail} />
            <Route exact path="/NoticeWrite" component={NoticeWrite} />
            <Route exact path="/NoticeUpdate/:no" component={NoticeUpdate} />
            <Route exact path="/Community" component={Community} />
            <Route
              exact
              path="/CommunityDetail/:no"
              component={CommunityDetail}
            />
            <Route exact path="/CommunityWrite" component={CommunityWrite} />
            <Route
              exact
              path="/CommunityUpdate/:no"
              component={CommunityUpdate}
            />
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
