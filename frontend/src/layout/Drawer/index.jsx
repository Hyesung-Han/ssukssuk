import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setInit } from '../../redux/reducers/AuthReducer';
import { CommonContext } from '../../context/CommonContext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  Button,
  Grid,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Wrapper from './styles';

const DrawerHeaderGroup = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user);

  const { setDrawerOpen } = useContext(CommonContext);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const onClickRedirectPathHandler = name => () => {
    setDrawerOpen(false);
    history.push(name);
  };

  const handleSignInDialogOpen = () => {
    history.push('/Auth');
  };

  const onClickSignOutOpenHandler = () => {
    setDrawerOpen(false);
    dispatch(setInit());

    alert('You are logged out.');

    history.push('/');
  };

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        {user.status ? (
          <Button
            variant="outlined"
            className="up-cancel-fab"
            onClick={onClickSignOutOpenHandler}
          >
            로그아웃
          </Button>
        ) : (
          <Fragment>
            <Button
              variant="outlined"
              className="up-cancel-fab"
              onClick={handleSignInDialogOpen}
            >
              로그인
            </Button>
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
};

const DrawerListGroup = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user);

  const {
    setUserDetailDialogOpen,
    setUserDialogIndex,
    setDrawerOpen,
  } = useContext(CommonContext);

  const onClickEditProfileOpenHandler = () => {
    setDrawerOpen(false);
    setUserDialogIndex(0);
    setUserDetailDialogOpen(true);
  };

  const onClickChangePasswordOpenHandler = () => {
    setDrawerOpen(false);
    setUserDialogIndex(1);
    setUserDetailDialogOpen(true);
  };

  const onClickRedirectPathHandler = name => () => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
    history.push(name);
  };

  return (
    <>
      <List className="drawer-list-group-list">
        <ListItem
          button
          key={'Community'}
          onClick={onClickRedirectPathHandler('/Community')}
        >
          <ListItemText primary={'게시판'} disableTypography />
        </ListItem>
        <ListItem
          button
          key={'Ask'}
          onClick={onClickRedirectPathHandler('/Ask')}
        >
          <ListItemText primary={'문의 사항'} disableTypography />
        </ListItem>
        {user.status && (
          <ListItem
            button
            key={'MyFarm'}
            onClick={onClickRedirectPathHandler('/MyFarm')}
          >
            <ListItemText primary={'내 농장'} disableTypography />
          </ListItem>
        )}
        <ListItem
          button
          key={'AboutTeam'}
          onClick={onClickRedirectPathHandler('/AboutTeam')}
        >
          <ListItemText primary={'우리 팀 소개'} disableTypography />
        </ListItem>
        {(user.user_code === 'U03' || user.user_code === 'U04') && (
          <ListItem
            button
            key={'Admin'}
            onClick={onClickRedirectPathHandler('/Admin')}
          >
            <ListItemText primary={'관리자 페이지'} disableTypography />
          </ListItem>
        )}
        {user.status && (
          <ListItem
            button
            key={'Auth'}
            onClick={onClickRedirectPathHandler('/Auth')}
          >
            <ListItemText primary={'내 정보 수정'} disableTypography />
          </ListItem>
        )}
      </List>
    </>
  );
};

const DrawerFooterGroup = () => {
  const { user } = useContext(CommonContext);

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={6}>
        {!user.status && <Fragment></Fragment>}
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default function PersistentDrawerLeft(props) {
  const { drawerOpen } = useContext(CommonContext);

  return (
    <Wrapper>
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <div className="drawer-header">
          <DrawerHeaderGroup />
        </div>
        <Divider />
        <DrawerListGroup />
        <div className="drawer-header">
          <DrawerFooterGroup />
        </div>
      </Drawer>
    </Wrapper>
  );
}
