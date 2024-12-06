import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { fetchWords } from '../store/wordSlice';
import { useAppDispatch, useAppSelector } from '../hook';
import { ClipLoader } from 'react-spinners';
import TextsByWordId from '../components/SelectedWordsModules/TextsByWordId/TextsByWordId';

function SelectedWord() {
  const {isLoading, error, ru, en} = useAppSelector(state => state.word)
  const dispatch= useAppDispatch()
  const id = useLocation().pathname.replace('/words/', '')

  useEffect(()=>{
    dispatch(fetchWords({id}))
  },[id])

  return (
    <>
      {isLoading && <Box  display="flex" justifyContent="center" alignItems="center"><ClipLoader /></Box>}
      {error &&  <Box  display="flex" justifyContent="center" alignItems="center">Не удалось загрузить страницу ошибка: {error}</Box>}
      {!isLoading && !error && 
      <>
        <Header/>
        <MainContainer>
          <Box mt={2} mb={6} sx={{marginLeft:3}}>
            <Typography variant='h5' component='h3'>Главная {'>'} Словарь понятий  {'>'}  {ru}</Typography>
            <Typography variant='h1' component='h1' mt={4} mb={1} color='#9A7E5F'>{ru} </Typography>
            <Typography variant='h3' component='h2'>{en.toLowerCase()}</Typography>
          </Box>
          <TextsByWordId />
        </MainContainer>
      </>
      }
    </>
  )
}

export default SelectedWord
