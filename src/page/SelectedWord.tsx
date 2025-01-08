import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchWords } from '../store/wordSlice';
import { useAppDispatch, useAppSelector } from '../hook';
import { ClipLoader } from 'react-spinners';
import Grid from '@mui/material/Grid2';
import TextList from '../components/TextList/TextList';
import { toCamelCase } from '../const/const';

function SelectedWord() {
  const {isLoading, error, ru, en, listTexts, meaningsEN,meaningsRU} = useAppSelector(state => state.word)
  const dispatch= useAppDispatch()
  const id = useLocation().pathname.replace('/words/', '')
  const [visible, setVisible] = useState(true)

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
            <Typography variant='h5' component='h3'>Главная {'>'} Словарь понятий  {'>'}  {toCamelCase(ru)}</Typography>
            <Typography variant='h1' component='h1' mt={4} mb={1} color='#9A7E5F'>{toCamelCase(ru)} </Typography>
            <Typography variant='h3' component='h2'>{en.toLowerCase()}</Typography>
          </Box>

          <button 
            style={
              {
                backgroundColor:'inherit', 
                border:'0px',
                color: '#576265',
                textDecoration:'underline',
              }
            }
            onClick={()=> setVisible((visible:boolean) => !visible)}>
              <Typography variant='h4' component='span'>
                {visible ? 'Скрыть понятия' :'Показать понятия '}
              </Typography>
          </button>
          {visible && <Grid  mt={4} container spacing={2}>
            <Grid size={6} >
              {meaningsRU.map((meanings,index) => {
                return (
                  <>
                  <Typography mb={2} variant='h4' component='h2'>
                    <Typography variant='h4' component='span' color='#9A7E5F'>{index+1}. </Typography>
                    {meanings}
                  </Typography>
                  </>
                )
              })}
            </Grid>
            <Grid size={6} >
              {meaningsEN.map((meanings,index) => {
                return (
                  <Typography mb={2} variant='h4' component='h2'>
                    <Typography variant='h4' component='span' color='#9A7E5F'>{index+1}. </Typography>
                    {meanings}
                  </Typography>
                )
              })}
            </Grid>
          </Grid>}
          {/* <TextsByWordId /> */}
          <Typography textAlign="center" variant='h2' component='h2' mt={12} mb={3} color='#9A7E5F'>Тексты</Typography>
          {listTexts.length > 0 && <TextList data={listTexts}></TextList>}
          {listTexts.length <= 0 && 
          <Box sx={{textAlign:'center'}}>
            <Typography textAlign="center" variant='h3' component='p'>Тексты не найдены</Typography>
          </Box>}
        </MainContainer>
      </>
      }
    </>
  )
}

export default SelectedWord
