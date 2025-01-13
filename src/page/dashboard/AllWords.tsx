import React from 'react';
import HeaderAdmin from './components/HeaderAdmin/HeaderAdmin';
import MainContainer from '../../components/MainContainer/MainContainer';
import MainTitle from '../../components/MainTitle/MainTitle';
import MainInput from '../../components/MainInput/MainInput';
import { useAppDispatch, useAppSelector } from '../../hook';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { setInput } from '../../store/dictionarySlice';
import ListWordsSelectedLetter from '../../components/ListWordsSelectedLetter/ListWordsSelectedLetter';
import Alphabet from '../../components/Alphabet/Alphabet';

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={"/"+props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));

const AllWords = () => {
  const {input} = useAppSelector(s => s.dictionary)
  const dispatch = useAppDispatch()
  const setValueSearch = (word:string) => dispatch(setInput({input:word}))

  return (
    <>
        <HeaderAdmin/>
        <MainContainer>
            <MainTitle>Редактирование списка слов</MainTitle>
            <Typography 
                component={MyNavLink}
                to={`admin/words/create`}
                color='black' sx={{textDecoration:'none', padding: "10px 20px", border: '1px solid black', borderRadius:'10px'}}
                variant='h3'
            >
                Создать новое слово
            </Typography>
            <Box mb={4}></Box>
            <MainInput 
                placeholder='Поиск слов' 
                onClick={()=>{}}
                onChange={(e)=>setValueSearch(e.target.value)}
                value={input}
            ></MainInput>
            <Alphabet />
            <ListWordsSelectedLetter/>
        </MainContainer>
    </>
  );
};

export default AllWords;