
import { FC, ReactNode, useEffect } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useAppDispatch, useAppSelector } from '../hook';
import { checkAuth } from '../store/authSlice';
import { Box } from '@mui/material';
import { ClipLoader } from 'react-spinners';

interface TypesLoadingData{
  children?:ReactNode, 
}

const Auth:FC<TypesLoadingData> = ({children}) => {
  const {isAuth, isLoading} = useAppSelector(s=>s.auth)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if (localStorage.getItem('token')){
      dispatch(checkAuth())
    }
  },[])

  return (
    <>
        {isLoading && <Box  display="flex" justifyContent="center" alignItems="center"><ClipLoader /></Box>}
        {!isAuth && !isLoading  && <LoginForm/>  }
        {isAuth && !isLoading  && children}
    </>
  );
};

export default Auth;