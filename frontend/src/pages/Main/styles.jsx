import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 100px;
  & .top-area {
    margin-bottom: 130px;
  }
  & .title1 {
    font-size: 36px;
    font-weight: 700;
  }
  & .title2 {
    font-size: 46px;
    font-weight: 700;
  }
  & .title_desc {
    font-size: 22px;
    font-weight: 700;
  }
  & .what_to_do {
    font-size: 50px;
    font-weight: 600;
    color: #000000c4;
    text-shadow: 1px 1px 5px #a4ab95;
    // text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  }
  & .desc {
    & .sub_title {
      color: #9c27b0;
      font-size: 32px;
      font-weight: 500;
      text-shadow: 1px 1px 2px #8d8181;
    }
    & p {
      font-size: 25px;
      font-weight: 500;
      text-shadow: 1px 1px 1px #afafaf;
      text-align: center;
      // text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
    }
  }
`;
export default Wrapper;
