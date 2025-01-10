import React from 'react';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import MainContainer from '../../components/MainContainer/MainContainer';
import MainTitle from '../../components/MainTitle/MainTitle';
import MainInput from '../../components/MainInput/MainInput';
import { setSearchWordAuthors } from '../../store/authorsSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import AuthorList from '../../components/AuthorList/AuthorList';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={"/"+props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));

const AllAuthors = () => {
  const {searchWord} = useAppSelector(s => s.authors)
  const dispatch = useAppDispatch()
  const setValueSearch = (word:string) => dispatch(setSearchWordAuthors({searchWord:word}))

  return (
    <>
        <HeaderAdmin/>
        <MainContainer>
            <MainTitle>Редактирование списка авторов</MainTitle>
            <Typography 
                component={MyNavLink}
                to={`admin/authors/create`}
                color='black' sx={{textDecoration:'none', padding: "10px 20px", border: '1px solid black', borderRadius:'10px'}}
                variant='h3'
            >
                Создать нового автора
            </Typography>
            <Box mb={4}></Box>
            <MainInput 
                placeholder='Поиск авторов' 
                onClick={()=>{}}
                onChange={(e)=>setValueSearch(e.target.value)}
                value={searchWord}
            ></MainInput>
            <AuthorList></AuthorList>
        </MainContainer>
    </>
  );
};

export default AllAuthors;