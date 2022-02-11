import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Button, Typography } from '@mui/material';
import Layout from '../../layout';
import Wrapper from './styles';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
});

const Main = () => {
  return (
    <Layout>
      <Wrapper>
        <Container
          sx={{
            mt: 3,
            mb: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            color="inherit"
            align="center"
            variant="h2"
            marked="center"
          >
            Upgrade your Farm
          </Typography>
          <Background
            sx={{
              backgroundColor: '#FBF7F2',
              backgroundPosition: 'center',
            }}
          />
          <Container
            component="section"
            sx={{ mt: 20, display: 'flex' }}
            className="top-area"
          >
            <Grid container>
              <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    bgcolor: '#ffc071',
                    py: 8,
                    px: 3,
                    boxShadow: 3,
                  }}
                >
                  <Box component="form" sx={{ maxWidth: 400 }}>
                    <Typography variant="h2" gutterBottom className="title">
                      쑥쑥
                    </Typography>
                    <Typography variant="h5">
                      IoT를 이용한 농장 관리
                      <br />
                      농장이 멀리있어도 안심돼요
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: { md: 'block', xs: 'none' },
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -67,
                    left: -67,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    boxShadow: 3,
                    background:
                      'url(https://mui.com/static/themes/onepirate/productCTAImageDots.png)',
                  }}
                />
                <Box
                  component="img"
                  src="https://www.kenan-asia.org/wp-content/uploads/2021/02/farmers-thailand.png.webp"
                  alt="call to action"
                  sx={{
                    position: 'absolute',
                    top: -28,
                    left: -28,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    maxWidth: 600,
                    boxShadow: 3,
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Container>
        <Box
          component="section"
          sx={{
            display: 'flex',
            bgcolor: '#E6F3E6',
            overflow: 'hidden',
          }}
        >
          <Container
            sx={{
              mt: 10,
              mb: 15,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src="/static/themes/onepirate/productCurvyLines.png"
              alt="curvy lines"
              sx={{
                pointerEvents: 'none',
                position: 'absolute',
                top: -180,
                opacity: 0.7,
              }}
            />
            <p sx={{ mb: 14 }} className="what_to_do">
              무엇을 할 수 있나요?
            </p>
            <div className="desc">
              <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <p className="sub_title">1. 농작물 기록</p>
                    <Box
                      component="img"
                      src="https://cdn-icons-png.flaticon.com/128/4478/4478100.png"
                      alt="suitcase"
                      sx={image}
                    />
                    <p>
                      Kiosk를 통해
                      <br />
                      농작물의 상태 변화를
                      <br />
                      기록해요
                    </p>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <p className="sub_title">2. 농작물 감시</p>
                    <Box
                      component="img"
                      src="https://cdn-icons-png.flaticon.com/128/4481/4481323.png"
                      alt="graph"
                      sx={image}
                    />
                    <p>
                      IoT 기기를 이용해
                      <br />
                      멀리서도 농작물의
                      <br />
                      환경을 확인해요
                    </p>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <p className="sub_title">3. 멘토링 커뮤니티</p>
                    <Box
                      component="img"
                      src="https://cdn-icons-png.flaticon.com/128/4185/4185445.png"
                      alt="clock"
                      sx={image}
                    />
                    <p>
                      도움이 필요할 땐<br />
                      언제든 공유해요
                    </p>
                  </Box>
                </Grid>
              </Grid>
            </div>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              component="a"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ mt: 8 }}
            >
              시작하기
            </Button>
          </Container>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default Main;
