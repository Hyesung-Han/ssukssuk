import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setInit } from '../../../redux/reducers/AuthReducer';
import { setFarmInit } from '../../../redux/reducers/FarmReducer';

import MyInfo from './../MyInfo/';
import ChangePassword from './../ChangePassword/';
import DeleteAccount from './../DeleteAccount/';
import { CommonContext } from '../../../context/CommonContext';

import {
  useMediaQuery,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import Wrapper from './styles';
function TabPanel(props) {
  const { value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{props && props.children ? props.children : ''}</Box>
      )}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  let history = useHistory();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const { userDialogIndex, setUserDialogIndex, setDrawerOpen } = useContext(
    CommonContext,
  );
  const labels = ['회원정보 수정', '비밀번호 변경', '로그아웃', '회원탈퇴'];
  const handleChange = (event, newValue) => {
    setUserDialogIndex(newValue);
  };
  const onClickSignOutOpenHandler = () => {
    setDrawerOpen(false);
    dispatch(setInit());
    dispatch(setFarmInit());

    alert('You are logged out.');

    history.push('/');
  };

  return (
    <Wrapper className="root">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={userDialogIndex}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className="tabs"
        classes={{ indicator: 'bigIndicator' }}
        style={{ paddingTop: 32 }}
      >
        {labels.map((x, index) => {
          return (
            !fullScreen &&
            (x === '로그아웃' ? (
              <Tab
                key={index}
                label={x}
                style={{ opacity: 1, marginTop: 20 }}
                onClick={onClickSignOutOpenHandler}
                {...a11yProps(index)}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="sign-out-btn"
                >
                  {x}
                </Button>
              </Tab>
            ) : (
              <Tab
                key={index}
                label={x}
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Noto Sans KR',
                  lineHeight: '22px',
                  color: index === userDialogIndex ? '#9aba11' : '#3c3c3c',
                }}
                {...a11yProps(index)}
              />
            ))
          );
        })}
      </Tabs>

      <TabPanel value={userDialogIndex} index={0} className="profile info">
        <MyInfo />
      </TabPanel>
      <TabPanel value={userDialogIndex} index={1} className="password info">
        <ChangePassword />
      </TabPanel>
      <TabPanel value={userDialogIndex} index={2} className="test"></TabPanel>
      <TabPanel value={userDialogIndex} index={3} className="password info">
        <DeleteAccount />
      </TabPanel>
    </Wrapper>
  );
}
