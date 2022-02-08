import React, { useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import { Grid } from '@material-ui/core';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';

const Footer = () => {
  const { drawerOpen } = useContext(CommonContext);
  const history = useHistory();
  return (
    <Wrapper>
      <Grid container className="footer">
        <Grid item sm={12} md={8} className="left-box">
          <ul className="page">
            <li>
              <span
                onClick={() => {
                  history.push('/Terms');
                  window.scrollTo(0, 0);
                }}
              >
                개인정보처리방침
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  history.push('/AboutTeam');
                  window.scrollTo(0, 0);
                }}
              >
                👖청바지
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  history.push('/ContactUs');
                  window.scrollTo(0, 0);
                }}
              >
                회사소개
              </span>
            </li>
          </ul>
          <ul className="info">
            <li>쑥쑥</li>
            <li>powered by TEAM 청바지</li>
          </ul>
          <p>Copyright by Multicampus Co., Ltd. All rights reserved.</p>
        </Grid>
        <Grid item sm={12} md={4} className="right-box">
          <Grid className="text-box">
            <h2>For Help</h2>
            <h3>help@samsungsupport.com</h3>
            <h4>Contact Out Customer Support Team</h4>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Footer;
