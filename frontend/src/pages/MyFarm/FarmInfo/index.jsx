import { styled } from '@mui/material/styles';
import MainCard from '../../../components/Card/MainCard';
import InfoCard from './InfoCard';
import CurrentImage from './CurrentImage';
import FarmImage from './FarmImage';
import { Grid } from '@mui/material';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fafafa',
  position: 'relative',
  justifyContent: 'center',
  border: 'none',
  margin: '30px 0px 40px 0px',
  padding: '5px 30px 5px 30px',
}));

const FarmPicture = () => {
  return (
    <CardWrapper>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={7}>
          <FarmImage />
        </Grid>
        <Grid item xs={5} alignSelf="center">
          <InfoCard />
          <CurrentImage />
        </Grid>
      </Grid>
    </CardWrapper>
  );
};

export default FarmPicture;
