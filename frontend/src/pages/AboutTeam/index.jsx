import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from '../../layout';
import Wrapper from './styles';

const AboutTeam = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid className="about-team">
          <h2>👖청바지 개발자</h2>
          <Grid container className="license">
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img
                  src="/images/emoji_sowon.png"
                  alt="emoji_sowon"
                  className="emoji-image"
                />
              </Grid>
              <h2>최소원</h2>
              <p>팀장, Back-end, Kiosk</p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img
                  src="/images/emoji_yoontaek.png"
                  alt="emoji_yoontaek"
                  className="emoji-image"
                />
              </Grid>
              <h2>오윤택</h2>
              <p>Back-end 리더, 서버</p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img
                  src="/images/emoji_hyeseong.png"
                  alt="emoji_hyeseong"
                  className="emoji-image"
                />
              </Grid>
              <h2>한혜성</h2>
              <p>Back-end, QA</p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img
                  src="/images/emoji_junga.png"
                  alt="emoji_junga"
                  className="emoji-image"
                />
              </Grid>
              <h2>이정아</h2>
              <p>Front-end 리더, Git</p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img
                  src="/images/emoji_sohyun.png"
                  alt="emoji_sohyun"
                  className="emoji-image"
                />
              </Grid>
              <h2>황소현</h2>
              <p>Front-end, QA, Kiosk</p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid className="license-img">
                <img
                  src="/images/emoji_dongjun.png"
                  alt="emoji_dongjun"
                  className="emoji-image"
                />
              </Grid>
              <h2>이동준</h2>
              <p>Front-end, 영상, Jira</p>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default AboutTeam;
