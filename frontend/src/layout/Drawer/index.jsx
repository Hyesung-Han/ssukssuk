import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setInit } from '../../redux/reducers/AuthReducer';
import { setFarmInit } from '../../redux/reducers/FarmReducer';
import { CommonContext } from '../../context/CommonContext';

import {
  Button,
  Grid,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import Wrapper from './styles';
import Swal from 'sweetalert2';

const DrawerHeaderGroup = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user);

  const { setDrawerOpen } = useContext(CommonContext);

  const handleSignInDialogOpen = () => {
    history.push('/Auth');
  };

  const onClickSignOutOpenHandler = () => {
    setDrawerOpen(false);
    dispatch(setInit());
    dispatch(setFarmInit());
    Swal.fire(
      '로그아웃 되었습니다.',
      '오늘도 쑥쑥을 이용해 주셔서 감사합니다',
      'info',
    );

    history.push('/');
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
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
  const user = useSelector(state => state.Auth.user);

  const { setDrawerOpen } = useContext(CommonContext);

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
          key={'Notice'}
          onClick={onClickRedirectPathHandler('/Notice')}
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
        {user.user_code === 'U04' && (
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
  const user = useSelector(state => state.Auth.user);
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
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
