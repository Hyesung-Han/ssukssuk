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
  const isTablet = useMediaQuery('(max-width:960px)');

  const {
    user,
    drawerOpen,
    setDrawerOpen,
    setSignDialogOpen,
    setUserDetailDialogOpen,
    setInfoDetailDialogOpen,
  } = useContext(CommonContext);


  const handleSignInDialogOpen = () => {
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
          className={drawerOpen ? 'appbar appbar-shift' : 'appbar'}
        >
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography
                variant="h6"
                className="logo"
                onClick={onClickRedirectPathHandler('/')}
              >
                <img className='logo_img' src="images/ssug_orange.png" alt="logo"/>
              </Typography>
            </Grid>

            <Grid item className="title display-none">
              <Grid container justify="center" spacing={2}>
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

                {/* 로그인 해야지만 내 농장 페이지 보임 ==================== */}
                { user.status === "login"?
                <Grid item onClick={onClickRedirectPathHandler('/MyFarm')}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={window.scrollTo(0, 0)}
                    className="header-button"
                  >
                    내 농장
                  </Button>
                </Grid>
                : null}
                {/* ======================================================= */}

                {/* 관리자 페이지 ==================== */}
                {/* 임시로 유저 타입이 A인 사람이 관리자로 설정 */}
                { user.user_type === "A"?
                <Grid item onClick={onClickRedirectPathHandler('/Admin')}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={window.scrollTo(0, 0)}
                    className="header-button"
                  >
                    관리자 페이지
                  </Button>
                </Grid>
                : null}
                {/* ======================================================= */}
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSignInDialogOpen}
                    className="display-none header-button"
                  >
                    {user.status === 'login' ? 'My' : 'Sign In'}
                  </Button>
                </Grid>
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
