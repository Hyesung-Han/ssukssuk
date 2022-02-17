import { Grid } from '@mui/material';
import MyFarmBoardList from '../../../../components/Board/MyFarmBoardList/';

const SurveyList = () => {
  return (
    <Grid
      container
      direction="row"
      className="top-box"
      justifyContent="space-between"
      alignItems="end"
    >
      <MyFarmBoardList />
    </Grid>
  );
};

export default SurveyList;
