import React from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

const calIsGood = (temp, humi, date) => {
  // 12~2월 : 겨울 (10도 이하면 알람)
  // 3 ~ 5월 / 9 ~ 11월 : 봄가을 (18 ~ 24도 벗어나면 알람)
  // 6 ~ 8월 : 여름 (25도 넘으면 알람)

  if (parseFloat(temp) < 10 || parseFloat(temp) >= 25) {
    return false;
  } else {
    return true;
  }
};

class Status extends React.Component {
  render() {
    const temp = this.props.curSensorData.temp;
    const humi = this.props.curSensorData.humi;
    const sensor_date = this.props.curSensorData.sensor_date;
    const isGood = calIsGood(temp, humi, sensor_date);

    return (
      <Box>
        <div
          className={
            isGood == 1
              ? 'status-card status-card-color1'
              : 'status-card status-card-color2'
          }
        >
          <Box sx={{ px: 4, py: 3.5 }}>
            <Grid container direction="row">
              <Grid item>
                <Grid container>
                  <Grid item>
                    <img
                      className="emoji_img"
                      src={isGood == 1 ? 'images/smile.png' : 'images/bad.png'}
                      alt="logo"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ ml: 2 }}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '25px',
                        fontWeight: 500,
                        color: '#ffffff',
                        mb: 0.75,
                        fontFamily: `'Do Hyeon', sans-serif`,
                      }}
                    >
                      온도 : {parseFloat(temp).toFixed(1)}°C
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '25px',
                        fontWeight: 500,
                        color: '#ffffff',
                        mb: 0.75,
                        fontFamily: `'Do Hyeon', sans-serif`,
                      }}
                    >
                      습도 : {parseFloat(humi).toFixed(1)}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Grid container justifyContent="flex-end">
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 300,
              color: '#555555',
              mt: 1,
              fontFamily: `'Do Hyeon', sans-serif`,
            }}
          >
            측정 시간 : {sensor_date}
          </Typography>
        </Grid>
      </Box>
    );
  }
}

export default Status;
