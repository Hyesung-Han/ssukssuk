import styled from 'styled-components';

const Wrapper = styled.div`
  .root {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
    max-width: 1920px;
    margin: 0 auto;
  }
  .grid-list {
    transform: translateZ(0);
  }
  .title-bar {
    background: rgba(255, 255, 255, 1);
  }
  .icon {
    color: white;
  }
  .grid-list-title {
    max-width: 1200px;
  }
  .title {
    color: #383836;
  }
  .input1 {
    width:200px;
    height:40px;
  }
  .input2 {
    height: 28px;
    font-size: 2em;
  }
  .cover-grid {
  }
  .search-component-grid {
    padding: 10px 0 10px 0;
  }
  .search-component-grid-item-se-icon {
    color: #ccc;
  }
  & .write-button{
    font-weight: 600;
    font-size: 16px;
    padding:5px 13px;
    color:#ffffff;
    background-color: #9aba11;

    &:hover {
      color:#ffffff;
      background-color: #9aba11;
    }
  }
  .select-box{
    width:100px;
    height:40px;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #212121;
    }
  }
`;
export default Wrapper;
