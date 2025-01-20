import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hook';
import { useLocation } from 'react-router-dom';
import LoadingData from '../components/LoadingData/LoadingData';
import { fetchTextsById } from '../store/selectedTextSlice';
import PartText from '../components/PartText/PartText';


const SelectedTextPart = () => {
  const {
    error, 
    author, 
    texts,
    title,
    titleRU,
    word,
    translators
} = useAppSelector(state => state.selectedText)
  const dispatch = useAppDispatch()
  const idPath = useLocation().pathname.replace('/text/', '')
  const [selectWord, setSelectWord] = useState<string>(' ')
  const [arrayWord, setArrayWord] = useState<string[]>([])

  useEffect(()=>{
    const a = word.find(i => i.id === selectWord)
    setArrayWord(a ? a.forms : [])
  },[selectWord])


  useEffect(()=>{
    dispatch(fetchTextsById(idPath))
  },[idPath])

  return (
    <>
        <Header></Header>
        <LoadingData error={error} isLoading={false} listlength={1} >
          <MainContainer>
            <Box mt={2} mb={6} sx={{marginLeft:3}}>
              <Typography variant='h5' component='h3'>Главная {'>'} Словарь понятий  {'>'}  {titleRU}</Typography>
            </Box>
            {word && word.length > 0 &&
            <Box sx={{marginBottom:3}}>
              <Typography sx={{display:'inline-block', marginRight:1}}>Поиск по слову :</Typography>
              <Select
                value={selectWord}
                defaultValue=' '
                onChange={(e)=>setSelectWord(e.target.value)}
              >
                <MenuItem value={' '}>Не выбрано</MenuItem>
                  {word && word.map(i => {
                  return (
                    <MenuItem key={i.id} value={i.id}>{i.ru}</MenuItem>
                  )
                })}
              </Select>
            </Box>
            }
            <PartText
              author={author}
              texts={texts}
              title={title}
              titleRU={titleRU}
              translators={translators}
              words={arrayWord}
            />  
          </MainContainer>
        </LoadingData>
    </>
  );
 };
 
 export default SelectedTextPart;