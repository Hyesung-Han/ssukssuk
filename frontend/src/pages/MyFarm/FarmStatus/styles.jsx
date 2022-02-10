import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  .chart-grid{
    height:190px;
  }

  .status-card{
    border-radius: 10px 10px 10px 10px;
    box-sizing: border-box;
    box-shadow:0px 1px 2px #868e96

  }

  .status-card-color1{
    // Background:#008000;
    Background:#00828f;
  }
  .status-card-color2{
    // Background:#ff7f00;
    Background:#ef6c00;
  }

  .emoji_img{
    height:80px;
    width:80px;
  }

  .card-grid{
    display: flex,
    justifyContent:center,
    flexFlow:center,
  }
`;

export default Wrapper;
