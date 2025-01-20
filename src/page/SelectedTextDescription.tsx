import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import { Box, ListItem, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hook';
import { NavLink, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import LoadingData from '../components/LoadingData/LoadingData';
import { fetchTextsById } from '../store/selectedTextSlice';

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={"/text/"+props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));

const defaultStyles = { 
  paddingLeft:3,
  paddingRight:3,
}
 
 const SelectedTextDescription = () => {
  const {
    error, 
    author, 
    pubYear,
    title,
    titleRU,
    type,
    catalogNum,
    originalLang,
    pubPlace,
    publisher,
    rubric,
    size,
    storage,
    translators
} = useAppSelector(state => state.selectedText)
  const dispatch = useAppDispatch()
  const idPath = useLocation().pathname.replace('/textDescription/', '')

  const descriptionList = [
    {
      title:'Название оригинала',
      value:title
    },
    {
      title:'Язык оригинала, с которого сделан перевод',
      value:originalLang
    },
    {
      title:'Название в русском переводе',
      value:titleRU
    },
    {
      title:'Переводчик',
      value: translators ? translators.map(translator => translator.author.name).join(', ') : ''
    },
    {
      title:'Место публикации',
      value:pubPlace
    },
    {
      title:'Типография/Издатель',
      value:publisher
    },
    {
      title:'Год публикации',
      value:pubYear
    },
    {
      title:'Объём',
      value:size
    },
    {
      title:'Номер по сводному каталогу',
      value:catalogNum
    },
    {
      title:'Место хранения',
      value:storage
    },
    {
      title:'Тип',
      value:type
    }
  ]

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

            <Typography sx={{...defaultStyles, fontWeight:500}} variant='h1' component='p' color='#9A7E5F' >{titleRU}</Typography>
            <Typography sx={{...defaultStyles, fontWeight:500}} mt={1} variant='h3' component='p' >{author?.name}</Typography>
            
            <Box mt={6} mb={6} sx={{width:'100%', height:'1px', backgroundColor:'#988C7A'}}></Box>

            <Box mb={6} sx={{marginLeft:3}}>
              <Typography variant='h5' component='p' color='#8C8C8C' mb={2} >Оригинал</Typography>
              <Typography variant='h3' component='p' color='#9A7E5F'>{title.toUpperCase()}</Typography>
            </Box>
            <Box mb={6} sx={{marginLeft:3}}>
              <Typography variant='h5' component='p' color='#8C8C8C' mb={2} >Переводчик</Typography>
              <Typography variant='h3' component='p'>
                {translators && translators.map(translator => translator.author.name).join(', ')}
              </Typography>
            </Box>
            <Box mb={6} sx={{marginLeft:3}}>
              <Typography variant='h5' component='p' color='#8C8C8C' mb={2} >Рубрикатор</Typography>
              <Typography variant='h3' component='p'>{rubric}</Typography>
            </Box>

            <Box mt={6} mb={6} sx={{width:'100%', height:'1px', backgroundColor:'#988C7A'}}></Box>

            <Typography sx={{...defaultStyles}} variant='h2' component='p' color='#9A7E5F' mb={2} >Описание</Typography>
           
              {
                descriptionList.map(item=>{
                  return (
                    <Grid container key={item.title} spacing={2} sx={{...defaultStyles}}>
                      <Grid size={6} >
                        {item.title}
                      </Grid>
                      <Grid size={6} >
                        {item.value}
                      </Grid>
                    </Grid>  
                  )
                })
              }

              <Box mt={6} mb={6} sx={{width:'100%', height:'1px', backgroundColor:'#988C7A'}}></Box>
                <ListItem 
                  component={MyNavLink}
                  to={idPath}
                  sx={{display:'flex', justifyContent:'center'}}
                >
                    <Typography variant='h2' component='p' color='#9A7E5F' sx={{textDecoration:'underline'}}>Перейти к тексту</Typography>       
                </ListItem>
          </MainContainer>
        </LoadingData>
    </>
  );
 };
 
 export default SelectedTextDescription;