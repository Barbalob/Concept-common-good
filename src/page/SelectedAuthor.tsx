 import { useEffect } from 'react';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hook';
import { useLocation } from 'react-router-dom';
import { fetchAuthor } from '../store/selectedAuthorSlice';
import Grid from '@mui/material/Grid2';
import TextList from '../components/TextList/TextList';
import LoadingData from '../components/LoadingData/LoadingData';

const defaultStyles = { 
  paddingLeft:3,
  paddingRight:10,
}
 
 const SelectedAuthor = () => {
  const {isLoading, error, name, years, translationName, listTexts, biography, photoUrl} = useAppSelector(state => state.selectedAuthors)
  const dispatch= useAppDispatch()
  const id = useLocation().pathname.replace('/authors/', '')

  // const {isLoading, error, name, year, translationName, listTexts, biography} = {
  //   isLoading:false, 
  //   error: null, 
  //   name: 'Джон', 
  //   year: '1588 - 1679', 
  //   translationName:'Testoviz', 
  //   biography:'Английский философ, один из основателей современной политической философии теории общественного договора и теории государственного суверенитета. Известен идеями, получившими распространение в таких дисциплинах, как этика, теология, физика, геометрия и история.', 
  //   listTexts: []
  // }


  useEffect(()=>{
    dispatch(fetchAuthor({id}))
  },[id])
  return (
    <>
        <Header></Header>
        <LoadingData error={error} isLoading={isLoading} listlength={1} >
          <MainContainer>
            <Box mt={2} mb={6} sx={{marginLeft:3}}>
              <Typography variant='h5' component='h3'>Главная {'>'} Словарь понятий  {'>'}  {name}</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid size={8} >
                  <Typography sx={{...defaultStyles, fontWeight:600}} variant='h1' component='p' color='#9A7E5F' >{name}</Typography>
                  <Typography sx={{...defaultStyles, fontWeight:500}} mt={1} variant='h4' component='p' >{translationName}</Typography>
                  <Box mt={6} mb={6} sx={{width:'100%', height:'1px', backgroundColor:'#988C7A'}}></Box>
                  <Typography sx={{...defaultStyles}} variant='h5' component='p' color='#8C8C8C'>Годы жизни</Typography>
                  <Typography sx={{...defaultStyles}} mt={1} variant='h5' component='p'>{years}</Typography>
                  <Typography sx={{...defaultStyles}} mt={3} variant='h5' component='p' color='#8C8C8C'>Краткая биография</Typography>
                  <Typography sx={{...defaultStyles}} mt={1} variant='h5' component='p'>{biography}</Typography>
                </Grid>
                <Grid size={4}>
                  <img src={`http://localhost:3000${photoUrl}`} style={
                    {objectFit:'contain', 
                    width:'100%', 
                    height:'100%',
                    // boxShadow: "10px 10px 30px 0px #00000040",
                    borderRadius:'10px'
                    }} 
                  alt="" />
                </Grid>
              </Grid>
              <Typography textAlign="center" variant='h2' component='h2' mt={12} mb={3} color='#9A7E5F'>Тексты</Typography>
              {listTexts.length > 0 && <TextList data={listTexts}></TextList>}
              {listTexts.length <= 0 && 
              <Box sx={{textAlign:'center'}}>
                <Typography textAlign="center" variant='h3' component='p'>Тексты не найдены</Typography>
              </Box>
              }
          </MainContainer>
        </LoadingData>
    </>
  );
 };
 
 export default SelectedAuthor;