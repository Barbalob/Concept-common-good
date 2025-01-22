import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import MainTitle from '../../../components/MainTitle/MainTitle';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, FormControlLabel, Grow, Switch } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyboardEvent, useEffect, useState } from 'react';
import {  getTextsById } from '../../../api';
import SelectedAuthor from '../components/SelectAuthors/SelectAuthors';
import SelectedWords from '../components/SelectedWords/SelectedWords';
import { TypePartText, TypesWords, TypeTranslator } from '../../../const/types';
import SelectTranslators from '../components/SelectTranslators/SelectTranslators';
import TextAuthors from '../components/TextAuthors/TextAuthors';
import InputHookForm from '../components/InputHookForm/InputHookForm';
import { createText, deleteText, updateText } from '../../../api/services/Texts';
import style from './createTexts.module.scss'

interface IAuthor {
  id: string,
  name: string
}

interface IWords {
  id: string,
  ru: string
}

interface IFragment {
  id: string,
  language: string,
  text: string,
}

interface IForm {
  author: IAuthor,
  translators: IAuthor[],
  words: IWords[],
  parts: IFragment[][],
  title: string,
  titleRU: string,
  description: string,
  rubric:string,
  pubYear:string,
  originalLang:string,
  pubPlace:string,
  publisher:string,
  catalogNum:string,
  storage:string,
  size:string,
  type:string,
}

const defaultValues:IForm = {
  author:{id:'', name:''},
  translators:[],
  words:[],
  parts: [],
  // parts: [[{id:'', language:'',text:''}]],
  title: '',
  titleRU: '',
  description: '',
  rubric:'',
  pubYear:'',
  originalLang:'',
  pubPlace:'',
  publisher:'',
  catalogNum:'',
  storage:'',
  size:'',
  type:'',

}



const transformReturnId = (data: IAuthor[] | IWords[]): string[] => {
  return data.map(e => {return e.id})
}
const transformWords = (data: TypesWords[]): IWords[] => {
  return data.map(e => {return({id:e.id,ru:e.ru})})
}

const transformPart = (data:TypePartText[] | null): IFragment[][] => {
  if (!data) {
    return []
  }
  return data.map(parts => {
    const part = parts.translations
    return part.map(i=>{
      return {
        id: i.translatorId,
        language: i.language,
        text: i.text,
      }
    })
  })
}

const transformTranslation = (data:TypeTranslator[] | null):IAuthor[] => {
  if (!data){
    return []
  }
  return data.map(i => {
    const translation = i.author
    return {
      id:translation.id,
      name:translation.name
    }
  })
}

const filterParts = (data: IFragment[][], authors: IAuthor[], author:IAuthor): IFragment[][] => {
  authors.push(author)
  return data.map(part=>
    {return part.filter(fragment => !!authors.find(authors => authors.id === fragment.id))}
  )
}


const CreateTexts = () => {
  const id = useLocation().pathname.replace('/admin/texts/', '')
  const isCreate = id === 'create'
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const {control, handleSubmit, formState, formState: { isValid, errors }, reset, watch} = useForm<IForm>({
      defaultValues:defaultValues,
      mode:'onBlur',
  })

  const watchTranslators = watch('translators')
  const watchAutors = watch('author')



  useEffect(()=>{
    const fetchData = async(id:string) =>{
      const data = await getTextsById(id)
      reset({
        author: {id:data.author?.id, name: data.author?.name},
        words: transformWords(data.word),
        translators:transformTranslation(data.translators),
        parts: transformPart(data.texts),
        title: data.title,
        titleRU: data.titleRU,
        description: data.description,
        rubric:data.rubric,
        pubYear:data.pubYear,
        originalLang:data.originalLang,
        pubPlace:data.pubPlace,
        publisher:data.publisher,
        catalogNum:data.catalogNum,
        storage:data.storage,
        size:data.size,
        type:data.type,
      })
    }
    if (!isCreate){
      fetchData(id)
    }
  },[])

  const onSubmit:SubmitHandler<IForm> = async (data) => {
    if (isCreate){
      await createText({
        authorId: data.author.id,
        translators: transformReturnId(data.translators),
        wordsId: transformReturnId(data.words),
        parts: filterParts(data.parts,data.translators, data.author),
        title: data.title,
        titleRU: data.titleRU,
        description: data.description,
        rubric: data.rubric,
        pubYear: data.pubYear,
        originalLang: data.originalLang,
        pubPlace: data.pubPlace,
        publisher: data.publisher,
        catalogNum: data.catalogNum,
        storage: data.storage,
        size: data.size,
        type: data.type,
      })
      alert('Текст успешно создан')
      reset()
    } else {
      await updateText({
        id,
        authorId: data.author.id,
        translators: transformReturnId(data.translators),
        wordsId: transformReturnId(data.words),
        parts: filterParts(data.parts,data.translators, data.author),
        title: data.title,
        titleRU: data.titleRU,
        description: data.description,
        rubric: data.rubric,
        pubYear: data.pubYear,
        originalLang: data.originalLang,
        pubPlace: data.pubPlace,
        publisher: data.publisher,
        catalogNum: data.catalogNum,
        storage: data.storage,
        size: data.size,
        type: data.type,
      })
      alert('Текст успешно отредактирован')
      navigate('/admin/texts')
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && (event.target as HTMLElement).tagName === "INPUT") {
      event.preventDefault();
    }
  };

  return (
    <>
      <HeaderAdmin/>
      <MainContainer>
        <MainTitle>{isCreate ? 'Создание Текста': 'Редактирование Текста'}</MainTitle>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
          >
            <SelectedAuthor
              // data={[{id:'1233', name:'test'}, {id:'12331', name:'test1'}]}
              control={control}
              label='Автор'
              name="author"
              errors={errors}
              rules={
                { 
                  required: 'Укажите слово на русском',
                }
              }
            />
            <SelectedWords 
              control={control}
              label='Слова'
              name="words"
              errors={errors}
              rules={
                { 
                  required: 'Укажите слово на русском',
                }
              }
            />
            <SelectTranslators 
              control={control}
              label='Переводчики'
              name="translators"
              errors={errors}
              watchAutors={watchAutors}
              // rules={
              //   { 
              //     required: 'Укажите слово на русском',
              //   }
              // }
            />

            <TextAuthors 
              name="parts"
              watchTranslators={watchTranslators}
              watchAutors={watchAutors}
              control={control}
              label='Слово на русском'
              error={errors}
              rules={
              { 
                required: 'Укажите слово на русском',
              }
            }
            />
          <InputHookForm
             name="title"
             control={control}
             label='Заголовок'
             rules={
              { 
                required: 'Укажите Заголовок',
              }
            }
          />
          <InputHookForm
             name="titleRU"
             control={control}
             label='Заголовок RU'
             rules={
              { 
                required: 'Укажите Заголовок RU',
              }
            }
          />          
          <Box >
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Не обязательные параметры"
            />
            <Box sx={{ display: 'flex', flexDirection:'column' }}>
              {/* <Grow className={checked ?'': style.hidden } in={checked}>
                {icon}
              </Grow> */}
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 100 } : {})}>
                <Box><InputHookForm name="description" label='Описание' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 200 } : {})}>
                <Box><InputHookForm name="rubric" label='Рубрикатор' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 300 } : {})}>
                <Box><InputHookForm name="pubYear" label='Год публикации' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 400 } : {})}>
                <Box><InputHookForm name="originalLang" label='Язык оригинала' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 500 } : {})}>
                <Box><InputHookForm name="pubPlace" label='Место публикации' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 600 } : {})}>
                <Box><InputHookForm name="publisher" label='Типография/Издатель' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 700 } : {})}>
                <Box><InputHookForm name="size" label='Объем' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 800 } : {})}>
                <Box><InputHookForm name="catalogNum" label='Номер по сводному каталогу' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 900 } : {})}>
                <Box><InputHookForm name="storage" label='Место хранения' control={control}/> </Box>
              </Grow>
              <Grow className={checked ?'': style.hidden } in={checked} {...(checked ? { timeout: 1000 } : {})}>
                <Box><InputHookForm name="type" label='Тип' control={control}/> </Box>
              </Grow>
            </Box>
          </Box>
          
          <Button 
          sx={{marginTop:5}}
          type='submit' size="large" variant="contained" disabled={!isValid} fullWidth>
              {isCreate? 'Создать':'Редактировать'}
          </Button>
          {!isCreate && 
            <Button 
            sx={{marginTop:5}}
            onClick={async (e)=> {
              e.preventDefault()
              await deleteText(id)
              alert('Удален')
              navigate('/admin/texts')
            }}
            size="large" variant="contained">
                Удалить
            </Button>
          }
        </form>
      </MainContainer>
    </>
  );
};

export default CreateTexts;