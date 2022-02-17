import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { CommonContext } from '../../../../context/CommonContext';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from '../../../../components/Card/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#EDE7F6',
  color: '#424242',
  overflow: 'hidden',
  position: 'relative',
  alignSelf: 'center',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.success[100],
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

const InfoCard = () => {
  const theme = useTheme();
  const farm = useSelector(state => state.Farm.farm);
  const { parsingDate } = useContext(CommonContext);

  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2.25 }}>
        <Grid item>
          <Grid container>
            <Grid item>
              <Typography
                sx={{
                  fontSize: '28px',
                  fontWeight: 700,
                  mr: 1,
                  mt: 0.75,
                  mb: 0.5,
                  fontFamily: `'Do Hyeon', sans-serif`,
                }}
              >
                {farm.farm_name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  mr: 1,
                  mb: 0.75,
                  fontFamily: `'Do Hyeon', sans-serif`,
                }}
              >
                {farm.farm_text}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ mb: 1 }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: theme.palette.secondary[200],
              fontFamily: `'Do Hyeon', sans-serif`,
            }}
          >
            쑥쑥 시작일 : {parsingDate(farm.farm_regidate)}
          </Typography>
        </Grid>
      </Box>
    </CardWrapper>
  );
};

export default InfoCard;
