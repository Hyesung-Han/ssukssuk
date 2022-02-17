import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  let history = useHistory();
  const onGoBack = async e => {
    history.goBack();
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          mt: 40,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              align="center"
              color="textPrimary"
              sx={{
                fontSize: '54px',
                fontWeight: 500,
                fontFamily: `'Do Hyeon', sans-serif`,
              }}
            >
              404: 찾고 계신 페이지가 여기엔 없습니다!
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="subtitle2"
              sx={{
                fontSize: '22px',
                fontWeight: 300,
                fontFamily: `'Do Hyeon', sans-serif`,
              }}
            >
              당신은 잘못된 경로 혹은 실수로 페이지에 접근하셨습니다. 메인
              페이지 상단의 헤더를 통해 접근해보세요!
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <img
                alt="Under development"
                src="/images/undraw_page_not_found_su7k.svg"
                style={{
                  marginTop: 50,
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 560,
                }}
              />
            </Box>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3 }}
              variant="contained"
              onClick={onGoBack}
            >
              이전 페이지로
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default NotFound;
