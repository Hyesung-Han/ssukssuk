import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 100px;
  width: 1100px;
  margin: 0 auto;

  .root-box {
    .body-box {
      border-bottom: solid 2px #868e96;
      border-top: solid 2px #868e96;
    }

    .title-text-filed {
      border: none;
      bordercolor: #000000;
      width: 900px;
    }

    .body-header {
      width: 200px;
      font-weight: 500;
      font-size: 20px;
      color: #868e96;

      text-align: center;
    }

    .category-box {
      height: 60px;
    }

    .title-box {
      height: 60px;

      border-bottom: solid 1px #ced4da;
      border-top: solid 1px #ced4da;
    }

    .body-content {
    }

    .text-box {
      height: 400px;
    }

    .body-content-text {
      width: 900px;
      height: 350px;
      overflow: auto;
    }

    .body-content-input {
      width: 850px;
    }
  }

  & .write-button {
    margin: 10px 0;

    font-weight: 400;
    font-size: 20px;
    padding: 3px 10px;
    color: #ffffff;
    background-color: #9aba11;

    &:hover {
      color: #ffffff;
      background-color: #9aba11;
    }
  }
`;

export default Wrapper;
