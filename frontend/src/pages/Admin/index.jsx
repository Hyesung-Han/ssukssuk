import { Grid } from '@mui/material';
import AdminBoardList from '../../components/Board/AdminBoardList/';
import Layout from '../../layout/';
import Wrapper from './styles';

const Admin = () => {
  return (
    <Layout>
      <Wrapper>
        <Grid
          container
          direction="row"
          className="top-box"
          justifyContent="space-between"
          alignItems="end"
        ></Grid>
        <AdminBoardList />
      </Wrapper>
    </Layout>
  );
};

export default Admin;
