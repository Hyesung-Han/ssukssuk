import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setInit } from '../../redux/reducers/AuthReducer';

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
    // Need props function
    // 나중에 여기서 컴포넌트 바꾸는거 context쓰면 관련된거 다시 렌더링되니까 auth에서 바꾸도록 props줘서 변경하는 방법으로 가고싶다ㅎㅎ
    // 다른 사람들이랑 충돌 안나도록 일단은 이렇게 하고 나중에 다 만들고 나서 바꿀 수 있으면 바꾸자
    if(name==='SignIn')
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
          <Grid
            className="appbar-wrap"
            container
            justify="space-between"
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
                  src={history.location.pathname.indexOf("/CommunityDetail")==-1?"images/ssug_green.png":"../images/ssug_green.png"}
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
                {user.status === 'login' && (
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
      <VoteDetailResponsiveDialog />
    </>
  );
};

export default Header;
