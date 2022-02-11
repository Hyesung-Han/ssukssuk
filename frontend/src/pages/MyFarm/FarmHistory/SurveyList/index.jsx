import { Grid } from '@mui/material';
import MyFarmBoardList from '../../../../components/Board/MyFarmBoardList/';
import { ViewContext } from '../../../../context/ViewContext';

const SurveyList = () => {
  return (
    <ViewContext.Provider>
      <Grid
        container
        direction="row"
        className="top-box"
        justifyContent="space-between"
        alignItems="end"
      ></Grid>
      <MyFarmBoardList />
    </ViewContext.Provider>
  );
};

export default SurveyList;
