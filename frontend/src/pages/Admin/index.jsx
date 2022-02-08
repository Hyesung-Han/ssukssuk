// import { Grid, Button } from '@material-ui/core';
import { Grid } from '@mui/material';
// import BoardList from '../../components/Board/BoardList/';
import AdminBoardList from '../../components/Board/AdminBoardList/';
import Layout from '../../layout/';
import { ViewContext } from '../../context/ViewContext';
import Wrapper from './styles';

const Admin = () => {
  return (
    <ViewContext.Provider>
      <Layout>
        <Wrapper>
          <Grid
            container
            direction="row"
            className="top-box"
            justifyContent="space-between"
            alignItems="end"
          ></Grid>
          {/* {searchValue && <div className="result">{searchValue} 검색 결과</div>} */}
          <AdminBoardList />
        </Wrapper>
      </Layout>
    </ViewContext.Provider>
  );
};

export default Admin;
