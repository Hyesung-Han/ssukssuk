import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';

import StatusCard from './StatusCard';
import Status from './Status';
import { CommonContext } from '../../../context/CommonContext';

import Wrapper from './styles';

import { Grid } from '@mui/material';

// import dumpData from './dump.json';
import ScatterPlot from './ScatterPlot';
import Loader from './Loader';


const FarmInfo = props => {
  const gridSpacing = 3;

  const { serverUrlBase,parsingDate } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const farm = useSelector(state => state.Farm.farm);

  const [chartData,setChartData]=useState('');
  const [curSensorData,setCurSensorData]=useState(false)
  const [isGood,setIsGood]=useState(true)

  const calIsGood=(curSensorData)=>{
    // 12~2월 : 겨울 (10도 이하면 알람)
    // 3 ~ 5월 / 9 ~ 11월 : 봄가을 (18 ~ 24도 벗어나면 알람)
    // 6 ~ 8월 : 여름 (25도 넘으면 알람)
    // 우선은 간단하게 10도미만 25도 이상이면 나쁨으로 함

    const date=curSensorData.sensor_date;
    const temp=curSensorData.temp;
    const humi=curSensorData.humi;
    
    if(temp<10||temp>=25)
    {
      setIsGood(false);
    }
  }

  const getFarmChartData = () => {
    const parsingdata = [[],[],[]];

    Axios.get(serverUrlBase + `/myfarm_survey/graph`, {
      params: {
        user_id: user.user_id,
        // farm_no: farm.farm_no,
        farm_no: 2,
      },
    })
      .then(data => {
        // console.log(data.data.data);
        const list = data.data.data;
        
        if (list.list_cnt!=0) {
          list.map((cur, index, source) => {
            // console.log(cur)
            parsingdata[cur.survey_result].push({"x":cur.humidity,"y":cur.temperature});
          });
        }
      })
      .catch(function(error) {
        console.log('survey graph error: ' + error);
      });

      const result=[{ id: '상', data: parsingdata[0] },{ id: '중', data: parsingdata[1] },{ id: '하', data: parsingdata[2] }];
      return result
  };

  const getFarmSensorData=()=>{
    Axios.get(serverUrlBase + `/myfarm_survey/status`, {
      params: {
        user_id: user.user_id,
        // farm_no: farm.farm_no,
        farm_no: 2,
      },
    })
      .then(data => {
        const list = data.data.data[0];
        const result={"humi":list.humidity,"temp":list.temperature,"sensor_date":parsingDate(list.sensor_date)}
        setCurSensorData(result)
        // console.log(result)
      })
      .catch(function(error) {
        console.log('sensor data error: ' + error);
      });
  }

  let [ alert, alertSet ] = useState(false);
  useEffect(() => {
    // graph
    const result= getFarmChartData()
    setChartData(result)

    // Status card
    setCurSensorData(getFarmSensorData())
    calIsGood(curSensorData)

    let timer = setTimeout(()=>{ alertSet(true) }, 1000);
  }, []);

  return (
    <Wrapper>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid className="chart-grid" item md={8}>
              {alert&&<ScatterPlot chartData={chartData}/>}
              {!alert&&<Loader type="spin" color="#3e7925" />}
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              {/* {curSensorData && <StatusCard curSensorData={curSensorData}/>} */}
              {curSensorData && <Status curSensorData={curSensorData} isGood={isGood}/>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default FarmInfo;
