import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import MainTitle from '../../../components/MainTitle/MainTitle';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
// import SimpleMDE from 'react-simplemde-editor';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyboardEvent, useEffect } from 'react';
import {  getTextsById } from '../../../api';
import { deleteWords } from '../../../api/services/Words';
import SelectedAuthor from '../components/SelectAuthors/SelectAuthors';
import SelectedWords from '../components/SelectedWords/SelectedWords';
import { TypePartText, TypesWords, TypeTranslator } from '../../../const/types';
import SelectTranslators from '../components/SelectTranslators/SelectTranslators';
import TextAuthors from '../components/TextAuthors/TextAuthors';
import InputHookForm from '../components/InputHookForm/InputHookForm';
import { createText, updateText } from '../../../api/services/Texts';

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
  // console.log(data.map(parts => {
  //   const part = parts.translations
  //   return part.map(i=>{
  //     return {
  //       id: i.id,
  //       language: i.language,
  //       text: i.text,
  //     }
  //   })
  // }));
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


const CreateTexts = () => {
  const id = useLocation().pathname.replace('/admin/texts/', '')
  const isCreate = id === 'create'
  const navigate = useNavigate();

  const {control, handleSubmit, formState: { isValid, errors }, reset, watch} = useForm<IForm>({
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
        // parts: transformPart(data.texts)
        translators:transformTranslation(data.translators),
        parts: [[
          {
            id:"678d15e5e0152c5bf644ad90",
            language:'ru',
            text:'eqweqeqe',
          }
        ]]
      })
    }
    if (!isCreate){
      fetchData(id)
    }
  },[])

  const onSubmit:SubmitHandler<IForm> = async (data) => {
    console.log(data);
    if (isCreate){
      await createText({
        authorId: data.author.id,
        translators: transformReturnId(data.translators),
        wordsId: transformReturnId(data.words),
        parts: data.parts,
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
      alert('Слово успешно создано')
    } else {
      // await updateText({
      //   id,
      //   meaningsEN:data.meaningsEng,
      //   meaningsRU:data.meaningsRu,
      //   wordEng:data.wordEng.toLocaleLowerCase(),
      //   wordRU:data.wordRu.toLocaleLowerCase(),
      // })
      // alert('Слово успешно отредактировано')
      // navigate('/admin/words')
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
        <MainTitle>{isCreate ? 'Создание Слова': 'Редактирование слова'}</MainTitle>
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
              rules={
                { 
                  required: 'Укажите слово на русском',
                }
              }
            />

            <TextAuthors 
              name="parts"
              watchTranslators={watchTranslators}
              watchAutors={watchAutors}
              control={control}
              label='Слово на русском'
            //   rules={
            //   { 
            //     required: 'Укажите слово на русском',
            //   }
            // }
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
          <InputHookForm
             name="description"
             control={control}
             label='Описание'
             rules={
              { 
                required: 'Укажите описание',
              }
            }
          />
          <InputHookForm
             name="rubric"
             control={control}
             label='Рубрикатор'
             rules={
              { 
                required: 'Укажите Рубрикатор',
              }
            }
          />
          <InputHookForm
             name="pubYear"
             control={control}
             label='Год публикации'
             rules={
              { 
                required: 'Укажите Год публикации',
              }
            }
          />
          <InputHookForm
             name="originalLang"
             control={control}
             label='Язык оригинала'
             rules={
              { 
                required: 'Укажите Язык оригинала',
              }
            }
          />
          <InputHookForm
             name="pubPlace"
             control={control}
             label='Место публикации'
             rules={
              { 
                required: 'Укажите Место публикации',
              }
            }
          />
          <InputHookForm
             name="publisher"
             control={control}
             label='Типография/Издатель'
             rules={
              { 
                required: 'Укажите Типография/Издатель',
              }
            }
          />
          <InputHookForm
             name="catalogNum"
             control={control}
             label='Номер по сводному каталогу'
             rules={
              { 
                required: 'Укажите Номер по сводному каталогу',
              }
            }
          />
          <InputHookForm
             name="storage"
             control={control}
             label='Место хранения'
             rules={
              { 
                required: 'Укажите Место хранения',
              }
            }
          />
          <InputHookForm
             name="size"
             control={control}
             label='Объём'
             rules={
              { 
                required: 'Укажите Объём',
              }
            }
          />
          <InputHookForm
             name="type"
             control={control}
             label='Тип'
             rules={
              { 
                required: 'Укажите Тип  ',
              }
            }
          />
          
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
              await deleteWords(id)
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