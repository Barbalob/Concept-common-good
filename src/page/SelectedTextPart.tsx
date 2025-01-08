import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import { Box, ListItem, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hook';
import { NavLink, useLocation } from 'react-router-dom';
import { fetchAuthor } from '../store/selectedAuthorSlice';
import Grid from '@mui/material/Grid2';
import srvPlaceholder from '../assets/photo/photo-placeholder.png'
import TextList from '../components/TextList/TextList';
import LoadingData from '../components/LoadingData/LoadingData';
import { fetchTextsById } from '../store/selectedTextSlice';

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={"/"+props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));

const defaultStyles = { 
  paddingLeft:3,
  paddingRight:3,
}
 
 const SelectedTextPart = () => {
  const {
    isLoading, 
    error, 
    author, 
    pubYear, 
    description,
    texts,
    title,
    titleRU,
    translator
} = useAppSelector(state => state.selectedText)
  const dispatch = useAppDispatch()
  const idPath = useLocation().pathname.replace('/text/', '')


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
            <Grid container spacing={2} >
              <Grid size={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
                <Typography sx={{...defaultStyles, fontWeight:500, }} variant='h3' component='p' >{titleRU}</Typography> 
                <Typography sx={{...defaultStyles, fontWeight:500, }} variant='h3' component='p' color='#9A7E5F' >{translator?.name}</Typography> 
              </Grid>
              <Grid size={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Typography sx={{...defaultStyles, fontWeight:500}} variant='h3' component='p' >{title}</Typography> 
                <Typography sx={{...defaultStyles, fontWeight:500}} variant='h3' component='p' color='#9A7E5F' >{author?.name}</Typography> 
              </Grid>
            </Grid>

            <Box mt={6} mb={6} sx={{width:'100%', height:'1px', backgroundColor:'#988C7A'}}></Box>

            {texts && texts?.map(partlist=>{
              return (
                <Grid container spacing={8}>
                  <Grid size={6}>
                  {
                    partlist.translations.filter(el => el.language === 'ru').map(part => {
                      return (
                        <Typography mb={3} sx={{...defaultStyles, textAlign:'justify', textIndent: '30px' }} variant='h4' component='p' >{part.text}</Typography> 
                    )})
                  }
                  </Grid>
                  <Grid size={6}>
                  {
                    partlist.translations.filter(el => el.language === 'en').map(part => {
                      return (
                        <Typography mb={3} sx={{...defaultStyles, textAlign:'justify', textIndent: '30px' }} variant='h4' component='p' >{part.text}</Typography> 
                    )})
                  }
                  </Grid>
                </Grid>
            )
            })}


          </MainContainer>
        </LoadingData>
    </>
  );
 };
 
 export default SelectedTextPart;