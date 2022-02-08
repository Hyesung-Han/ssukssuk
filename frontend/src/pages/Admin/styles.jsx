import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  padding-top: 100px;
  width: 1100px;
  margin: 0 auto;

  & .bottom-box {
    padding: 10px 0;
  }

  & .top-box {
    border-bottom: solid 1px #e9ecef;
    margin: 10px 0;
  }

  & .write-button {
    font-weight: 700;
    font-size: 16px;
    padding: 5px 13px;
    color: #ffffff;
    background-color: #9aba11;

    &:hover {
      color: #ffffff;
      background-color: #9aba11;
    }
  }

  .tab-style {
    // color:#9aba11;
    font-weight: 500;
    font-size: 18px;

    margin: 0px 5px;
  }

  .tabs-style: {
    & .muitabs-indicator: {
      // display: "none"
      backgroundcolor: secondary;
    }
  }
`;

export default Wrapper;
