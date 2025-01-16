import React, { useEffect } from 'react';
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
import LoadingData from '../../components/LoadingData/LoadingData';
import TextList from '../../components/TextList/TextList';
import { fetchTexts, setSearchWordTexts } from '../../store/textsSlice';

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={"/"+props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));

const AllTexts = () => {
  const {listTexts, error, isLoading, searchWord} = useAppSelector(s => s.texts)
  const dispatch = useAppDispatch()

  const handler = (word:string)=>dispatch(setSearchWordTexts({searchWord:word}))
  useEffect(()=>{
      dispatch(fetchTexts({word:searchWord}))
  },[searchWord])

  return (
    <>
        <HeaderAdmin/>
        <MainContainer>
            <MainTitle>Редактирование списка текстов</MainTitle>
            <Typography 
                component={MyNavLink}
                to={`admin/texts/create`}
                color='black' sx={{textDecoration:'none', padding: "10px 20px", border: '1px solid black', borderRadius:'10px'}}
                variant='h3'
            >
                Создать новый текст
            </Typography>
            <Box mb={4}></Box>
            <MainInput placeholder='Поиск текстов' value={searchWord} onChange={(e)=>handler(e.target.value)}></MainInput>

            <LoadingData error={error} isLoading={isLoading} listlength={listTexts.length} >
              <TextList data={listTexts} isAdmin={true}></TextList>
            </LoadingData>
        </MainContainer>
    </>
  );
};

export default AllTexts;