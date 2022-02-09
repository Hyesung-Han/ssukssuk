import { useContext } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from '../../../../components/Card/MainCard';
import { CommonContext } from '../../../../context/CommonContext';


const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#FFE57F',
  color: '#424242',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140,
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70,
    },
  },
}));

const StatusCard = props => {
  const theme = useTheme();

  const {parsingDate } = useContext(CommonContext);

  const temp=props.curSensorData.temp;
  const humi=props.curSensorData.humi;
  const sensor_date=props.curSensorData.sensor_date;

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="row">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      // backgroundColor: theme.palette.secondary[800],
                      mt: 1,
                    }}
                  ></Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ ml: 2 }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 700,
                      mb: 0.75,
                    }}
                  >
                    온도 : {temp}°C
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 700,
                      mb: 0.75,
                    }}
                  >
                    습도 : {humi}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mb: 1 }}>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 500,
                color: theme.palette.secondary[200],
              }}
            >
              {parsingDate(sensor_date)}
            </Typography>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default StatusCard;
