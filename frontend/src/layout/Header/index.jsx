import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setInit } from '../../redux/reducers/AuthReducer';
import { setFarmInit } from '../../redux/reducers/FarmReducer';

import { CommonContext } from '../../context/CommonContext';
import SignResponsiveDialog from '../../components/Auth/SignResponsiveDialog/';
import UserResponsiveDialog from '../../components/User/UserResponsiveDialog/';

import {
  Grid,
  Typography,
  AppBar,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import Wrapper from './styles';

const Header = props => {
  const dispatch = useDispatch();
  let history = useHistory();
  const isTablet = useMediaQuery('(max-width:1100px)');

  const {
    drawerOpen,
    setDrawerOpen,
    setSignDialogOpen,
    setIsSignUp,
    setUserDetailDialogOpen,
    setInfoDetailDialogOpen,
  } = useContext(CommonContext);

  const user = useSelector(state => state.Auth.user);
  const handleSignInDialogOpen = name => e => {
    if (name === 'SignIn') {
      setIsSignUp('SignIn');
    } else if (name === 'SignUp') {
      setIsSignUp('SignUp');
    }
    history.push('/Auth');
  };

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    if (name === '/SearchVote') {
      if (history.location.pathname === name) {
        history.goBack();
      } else {
        history.push(name);
      }
    } else {
      history.push(name);
    }
  };

  // 로그아웃
  const onClickSignOutOpenHandler = () => {
    setDrawerOpen(false);
    dispatch(setInit());
    dispatch(setFarmInit());

    alert('You are logged out.');

    history.push('/');
  };

  useEffect(() => {
    setSignDialogOpen(false);
    setDrawerOpen(false);
    setInfoDetailDialogOpen(false);
    setUserDetailDialogOpen(false);
  }, []);

  return (
    <>
      <Wrapper>
        {isTablet && (
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            aria-label="open drawer"
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
            className={drawerOpen ? 'menu-button on' : 'menu-button'}
          >
            <Grid></Grid>
            <Grid></Grid>
            <Grid></Grid>
          </Grid>
        )}
        <AppBar
          position="fixed"
          align-content="center"
          align-items="center"
          className={drawerOpen ? 'appbar appbar-shift' : 'appbar'}
        >
          <Grid
            className="appbar-wrap"
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h6"
                className="logo"
                onClick={onClickRedirectPathHandler('/')}
              >
                <img
                  className="logo_img"
                  src={
                    history.location.pathname.indexOf('/CommunityDetail') ==
                      -1 &&
                    history.location.pathname.indexOf('/NoticeDetail') == -1
                      ? 'images/ssug_green.png'
                      : '../images/ssug_green.png'
                  }
                  alt="logo"
                />
              </Typography>
            </Grid>

            <Grid item className="title display-none">
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={onClickRedirectPathHandler('/Community')}
                    className="display-none header-button"
                  >
                    게시판
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={onClickRedirectPathHandler('/Notice')}
                    className="display-none header-button"
                  >
                    문의사항
                  </Button>
                </Grid>
                {user.status === 'login' && (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onClickRedirectPathHandler('/MyFarm')}
                      className="display-none header-button"
                    >
                      내 농장
                    </Button>
                  </Grid>
                )} 
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                {(user.user_code === 'U03' || user.user_code === 'U04') && (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onClickRedirectPathHandler('/Admin')}
                      className="display-none header-button"
                    >
                      관리자 페이지
                    </Button>
                  </Grid>
                )}
                {!user.status && (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleSignInDialogOpen('SignUp')}
                      className="display-none header-button"
                    >
                      회원가입
                    </Button>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSignInDialogOpen('SignIn')}
                    className="display-none header-button"
                  >
                    {user.status === 'login' ? '내 정보' : '로그인'}
                  </Button>
                </Grid>
                {user.status === 'login' && (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onClickSignOutOpenHandler}
                      className="display-none header-button"
                    >
                      로그아웃
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
      </Wrapper>
      <SignResponsiveDialog />
      <UserResponsiveDialog />
    </>
  );
};

export default Header;
