import { height, textAlign } from '@mui/system';
import React from 'react';
import ReactLoading from 'react-loading';
function Loader({ type, color }) {
  
  const titleStyle = {
    textAlign: 'center',

    padding:"20px",
    fontSize:"20px",
  };

  const roaderStyle={
    display: "flex",
    justifyContent:"center",
    flexFlow:"center",
  }

  const bodyStyle={
    display: "flex",
    flexDirection: "column",
    // justifyContent:"center",

    width:"100%",
    height:"100%"
  }

  return (
    <div style={bodyStyle}>
      {' '}
      <div style={titleStyle}>차트 그리는 중</div>
      <div style={roaderStyle}>
        <ReactLoading
          type={type}
          color={color}
          height={'50px'}
          width={'50px'}
        />{' '}
        </div>
    </div>
  );
}
export default Loader;
