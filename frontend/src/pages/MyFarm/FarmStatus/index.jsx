import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import Status from './Status';
import { CommonContext } from '../../../context/CommonContext';
import Wrapper from './styles';
import { Grid, Typography } from '@mui/material';
import ScatterPlot from './ScatterPlot';
import Loader from './Loader';

import { styled } from '@mui/material/styles';
import MainCard from '../../../components/Card/MainCard';

import '../../../App.css';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fafafa',
  position: 'relative',
  justifyContent: 'center',
  border: 'none',
  margin: '30px 0px 40px 0px',
  padding: '5px 30px 5px 30px',
}));

const FarmInfo = props => {
  const { serverUrlBase, parsingDate } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const farm = useSelector(state => state.Farm.farm);

  const [chartData, setChartData] = useState('');
  const [curSensorData, setCurSensorData] = useState(false);

  const getFarmChartData = () => {
    const parsingdata = [[], [], []];

    Axios.get(serverUrlBase + `/myfarm_survey/graph`, {
      params: {
        user_id: user.user_id,
        farm_no: farm.farm_no,
      },
    })
      .then(data => {
        const list = data.data.data;

        if (list.list_cnt != 0) {
          list.forEach((cur, index, source) => {
            parsingdata[cur.survey_result].push({
              y: cur.humidity,
              x: cur.temperature,
            });
          });
        }
      })
      .catch(function(error) {
        console.log('survey graph error: ' + error);
      });

    const result = [
      { id: '상', data: parsingdata[0] },
      { id: '중', data: parsingdata[1] },
      { id: '하', data: parsingdata[2] },
    ];
    return result;
  };

  const getFarmSensorData = () => {
    Axios.get(serverUrlBase + `/myfarm_survey/status`, {
      params: {
        user_id: user.user_id,
        farm_no: farm.farm_no,
      },
    })
      .then(data => {
        const list = data.data.data[0];
        console.log(list.sensor_date);
        const result = {
          humi: list.humidity,
          temp: list.temperature,
          sensor_date: parsingDate(list.sensor_date),
        };
        setCurSensorData(result);
      })
      .catch(function(error) {
        console.log('sensor data error: ' + error);
      });
  };

  let [alert, alertSet] = useState(false);
  useEffect(() => {
    const result = getFarmChartData();
    setChartData(result);
    setCurSensorData(getFarmSensorData());

    setTimeout(() => {
      alertSet(true);
    }, 1000);
  }, []);

  return (
    <CardWrapper>
      <Wrapper>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid className="chart-grid" item md={7}>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 500,
                    fontFamily: `'Do Hyeon', sans-serif`,
                    mb: 2,
                  }}
                  variant="h6"
                  component="div"
                >
                  📈차트
                </Typography>
                {alert && <ScatterPlot chartData={chartData} />}
                {!alert && <Loader type="spin" color="#3e7925" />}
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item md={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify-content="space-between"
                    >
                      <Typography
                        sx={{
                          fontSize: '20px',
                          fontWeight: 500,
                          fontFamily: `'Do Hyeon', sans-serif`,
                          mb: 1,
                        }}
                        variant="h6"
                        component="div"
                      >
                        🔅온도 / 💧습도
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {curSensorData && <Status curSensorData={curSensorData} />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </CardWrapper>
  );
};

export default FarmInfo;
