import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import MainTitle from '../../../components/MainTitle/MainTitle';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
// import SimpleMDE from 'react-simplemde-editor';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyboardEvent, useEffect } from 'react';
import { getDictionaryById, getTextsById } from '../../../api';
import InputHookForm from '../components/InputHookForm/InputHookForm';
import MeaningsArray from '../components/MeaningsArray/MeaningsArray';
import { createWords, deleteWords, updateWords } from '../../../api/services/Words';
import SelectedAuthor from '../components/SelectAuthors/SelectAuthors';
import SelectedWords from '../components/SelectedWords/SelectedWords';
import { TypesWords } from '../../../const/types';

interface IAuthor {
  id: string,
  name: string
}

interface IWords {
  id: string,
  ru: string
}

interface IForm {
  author: IAuthor,
  words: IWords[]
}

const defaultValues:IForm = {
  author:{id:'', name:''},
  words:[{id:'1', ru:'1'}],
}

const transformWords = (data: TypesWords[]): IWords[] => {
  return data.map(e => {return({id:e.id,ru:e.ru})})
}


const CreateTexts = () => {
  const id = useLocation().pathname.replace('/admin/texts/', '')
  const isCreate = id === 'create'
  const navigate = useNavigate();

  const {control, handleSubmit, formState: { isValid, errors }, reset} = useForm<IForm>({
      defaultValues:defaultValues,
      mode:'onBlur',
  })



  useEffect(()=>{
    const fetchData = async(id:string) =>{
      const data = await getTextsById(id)
      console.log(data.word);
      reset({
        author: {id:data.author?.id, name: data.author?.name},
        words: transformWords(data.word),
      })
    }
    if (!isCreate){
      fetchData(id)
    }
  },[])

  const onSubmit:SubmitHandler<IForm> = async (data) => {
    console.log(data);
    // if (isCreate){
    //   await createWords({
    //     meaningsEN:data.meaningsEng,
    //     meaningsRU:data.meaningsRu,
    //     wordEng:data.wordEng.toLocaleLowerCase(),
    //     wordRU:data.wordRu.toLocaleLowerCase(),
    //   })
    //   alert('Слово успешно создано')
    // } else {
    //   await updateWords({
    //     id,
    //     meaningsEN:data.meaningsEng,
    //     meaningsRU:data.meaningsRu,
    //     wordEng:data.wordEng.toLocaleLowerCase(),
    //     wordRU:data.wordRu.toLocaleLowerCase(),
    //   })
    //   alert('Слово успешно отредактировано')
    //   navigate('/admin/words')
    // }
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
          {/* <InputHookForm
             name="wordRu"
             
             control={control}
             label='Слово на русском'
             rules={
              { 
                required: 'Укажите слово на русском',
                validate: validateRu,
              }
            }
          /> */}
          
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