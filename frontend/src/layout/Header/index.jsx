import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import store from 'store';

import { CommonContext } from '../../context/CommonContext';
import SignResponsiveDialog from '../../components/Auth/SignResponsiveDialog/';
import UserResponsiveDialog from '../../components/User/UserResponsiveDialog/';
import VoteDetailResponsiveDialog from '../../components/Main/VoteDetailResponsiveDialog/';

import {
  Grid,
  Typography,
  AppBar,
  Button,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';

const Header = props => {
  let history = useHistory();
  const isTablet = useMediaQuery('(max-width:1100px)');

  const {
    user,
    setUser,
    drawerOpen,
    setDrawerOpen,
    setSignDialogOpen,
    setIsSignUp,
    setUserDetailDialogOpen,
    setInfoDetailDialogOpen,
  } = useContext(CommonContext);

  const handleSignInDialogOpen = name => e => {
    if(name==='me')
    {
      setIsSignUp('SignIn')
    }
    else if(name==="SignUp")
    {
      setIsSignUp('SignUp');
    }
    history.push('/Auth');
  };

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    if (name === '/SearchVote') {
      if (history.location.pathname === name) {
        history.goBack();
        store.remove('search');
      } else {
        history.push(name);
      }
    } else {
      history.push(name);
    }
  };

  const onClickSignOutOpenHandler = () => {
    setDrawerOpen(false);
    setUser({
      user_no: 0,
      user_id: '',
      user_nm: '',
      user_pwd: '',
      user_img_url: '',
      status: '',
      web_site: '',
      token: '',
    });

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
            justify="space-between"
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
          <Grid className='appbar-wrap' container justify="space-between" alignItems="center">
            <Grid item>
              <Typography
                variant="h6"
                className="logo"
                onClick={onClickRedirectPathHandler('/')}
              >
                <img
                  className="logo_img"
                  src="images/ssug_green.png"
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
                    onClick={onClickRedirectPathHandler('/Ask')}
                    className="display-none header-button"
                  >
                    문의사항
                  </Button>
                </Grid>
                {user.status &&
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={onClickRedirectPathHandler('/Ask')}
                    className="display-none header-button"
                  >
                    내 농장
                  </Button>
                </Grid>
                }
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                {user.user_type === 'A' && (
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
                {!user.status&&
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
                }
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSignInDialogOpen('me')}
                    className="display-none header-button"
                  >
                    {user.status === 'login' ? '내 정보' : '로그인'}
                  </Button>
                </Grid>
                {user.status&&
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
                }
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
      </Wrapper>
      <SignResponsiveDialog />
      <UserResponsiveDialog />
      <VoteDetailResponsiveDialog />
    </>
  );
};

export default Header;
