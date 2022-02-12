import React from 'react';
import ReactLoading from 'react-loading';
function Loader({ type, color }) {
  const titleStyle = {
    textAlign: 'center',

    padding: '20px',
    fontSize: '20px',
  };

  const roaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'center',
    marginBottom: '30px',
  };

  const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    height: '100%',
  };

  return (
    <div style={bodyStyle}>
      {' '}
      <div style={titleStyle}>내 농장 가져오는 중</div>
      <div style={roaderStyle}>
        <ReactLoading
          type={type}
          color={color}
          height={'100px'}
          width={'100px'}
        />{' '}
      </div>
    </div>
  );
}
export default Loader;
