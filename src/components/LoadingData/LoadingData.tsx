import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { ClipLoader } from 'react-spinners';

interface TypesLoadingData{
  children:ReactNode, 
  isLoading:boolean, 
  error: null|string, 
  listlength: number,
  errorMassege?:string
}

const LoadingData: FC<TypesLoadingData> = ({children, isLoading, error, listlength, errorMassege}) => {
  return (
    <>
      {isLoading && <Box  display="flex" justifyContent="center" alignItems="center"><ClipLoader /></Box>}
      {error && <Box>{errorMassege ? error : errorMassege}</Box>}
      {!isLoading && !error && listlength !== 0 &&
        children
      }
      {!isLoading && !error && listlength == 0 &&
        <>
          <Box  display="flex" justifyContent="center" alignItems="center">По данному запросу ничего не найдено</Box>
        </>
      }
    </>
  );
};

export default LoadingData;