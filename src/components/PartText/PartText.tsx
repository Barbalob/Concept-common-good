import { FC, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { TypePartText, TypesAuthor, TypeTranslator } from '../../const/types';
import HighlightedWords from '../HighlightedWords/HighlightedWords';

const defaultStyles = { 
  paddingLeft:3,
  paddingRight:3,
}

interface TypeProps {
  title:string,
  author:TypesAuthor | null,
  titleRU:string,
  translators:TypeTranslator[] | null,
  texts:TypePartText[] | null,
  words: string[];
}

const PartText:FC<TypeProps> = ({title, author, titleRU, translators,texts, words=[]}) => {
  const [selectTranslator, setSelectTranslator] = useState('')

  useEffect(()=>{
    if (translators && translators.length > 0){
      setSelectTranslator(translators[0].author.id)
    }
  },[translators])

  return (
    <>
      <Grid container spacing={2} >
        <Grid size={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <Typography sx={{...defaultStyles, fontWeight:500}} variant='h3' component='p' >{title}</Typography> 
          <Typography sx={{...defaultStyles, fontWeight:500}} variant='h3' component='p' color='#9A7E5F' >{author?.name}</Typography> 
        </Grid>
        <Grid size={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
          <Typography sx={{...defaultStyles, fontWeight:500, }} variant='h3' component='p' >{titleRU}</Typography> 
          <Typography 
            sx={{...defaultStyles, fontWeight:500, }} 
            variant='h3' 
            component='p' 
            color='#9A7E5F' >
              {translators && translators.length > 0 && (
                translators.length === 1 ?
              <Typography sx={{...defaultStyles, fontWeight:500}} variant='h3' component='p' color='#9A7E5F' >{translators[0].author.name}</Typography> 
              :
              <Select
              value={selectTranslator}
              sx={{marginTop:1}}
              onChange={(e)=>setSelectTranslator(e.target.value)}
              >
              {translators && translators.map(translator => {
                return (
                  <MenuItem key={translator.author.id} value={translator.author.id}>{translator.author.name}</MenuItem>
                )
              })}
              </Select>
              )
              }
            </Typography> 
        </Grid>
      </Grid>

      <Box mt={6} mb={6} sx={{width:'100%', height:'1px', backgroundColor:'#988C7A'}}></Box>

      {texts && texts?.map((partlist, index:number)=>{
        return (
          <Grid container spacing={8} key={index}>
            <Grid size={6}>
            {
              partlist.translations.filter(el => el.translatorId === author?.id).map(part => {
                return (
                  <Typography 
                  key={part.id} 
                  mb={3} 
                  sx={{...defaultStyles, textAlign:'justify', textIndent: '30px' }} 
                  variant='h4' 
                  component='p'
                  >
                    <HighlightedWords text={part.text} words={words} />
                  </Typography> 
              )})
            }
            </Grid>
            <Grid size={6}>
            {
              partlist.translations.filter(el => el.translatorId === selectTranslator).map(part => {
                return (
                  <Typography
                    key={part.id}
                    mb={3} 
                    sx={{...defaultStyles, textAlign:'justify', textIndent: '30px' }} 
                    variant='h4' 
                    component='p' 
                  >
                    <HighlightedWords text={part.text} words={words} />
                  </Typography> 
              )})
            }
            </Grid>
          </Grid>
      )
    })}
    </>
  );
};

export default PartText;