import React, { useContext, useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { CommonContext } from '../../../../context/CommonContext';
import { setPath } from '../../../../redux/reducers/FarmReducer';

// material-ui
import { styled } from '@mui/material/styles';
import { CardActionArea, CardMedia } from '@mui/material';

// project imports
import MainCard from '../../../../components/Card/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  width: '95%',
  height: 310,
  border: 'none',
}));

const FarmImage = () => {
  const { serverUrlBase } = useContext(CommonContext);
  const farm = useSelector(state => state.Farm.farm);
  const [defaultImage, setDefaultImage] = useState(farm.file_path);
  const dispatch = useDispatch();

  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append('farm_no', farm.farm_no);
    formData.append('farm', acceptedFiles[0]);

    getList(formData);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const getList = async formData => {
    console.log('image', formData);
    try {
      const res = await Axios.post(serverUrlBase + '/myfarm/upload', formData);
      const { data } = res;
      if (data.result === 'success') {
        dispatch(setPath(data.path));
        setDefaultImage(data.path);
      }
    } catch (e) {
      console.log('farm image upload error', e);
    }
  };

  useEffect(() => {}, [defaultImage]);

  return (
    <>
      <CardWrapper
        style={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'center',
        }}
      >
        <CardActionArea {...getRootProps()}>
          <input {...getInputProps()} />
          <CardMedia
            component="img"
            image={defaultImage}
            alt="myFarmImg"
            width="100%"
            height="280"
          />
        </CardActionArea>
      </CardWrapper>
    </>
  );
};

export default FarmImage;
