import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import MainTitle from '../../../components/MainTitle/MainTitle';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
// import SimpleMDE from 'react-simplemde-editor';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyboardEvent, useEffect } from 'react';
import { getDictionaryById } from '../../../api';
import InputHookForm from '../components/InputHookForm/InputHookForm';
import MeaningsArray from '../components/MeaningsArray/MeaningsArray';
import { createWords, deleteWords, updateWords } from '../../../api/services/Words';



interface IForm {
  wordRu:string;
  wordEng:string;
  letter:string;
  meaningsRu:Array<string>;
  meaningsEng:Array<string>;
  forms:Array<string>;
}

const defaultValues = {
  wordRu:'',
  wordEng:'',
  meaningsRu:[],
  meaningsEng:[],
  forms:[],
}


const regRu = /^[а-яёА-ЯЁ]+$/
const regEng = /^[a-zA-Z]+$/

const validateRu = (value:string) => {
  return regRu.test(value) || 'Должны быть использованы только русские буквы'
};
const validateEng = (value:string) => {
  return regEng.test(value) || 'Должны быть использованы только английские буквы'
};


const CreateWords = () => {
  const id = useLocation().pathname.replace('/admin/words/', '')
  const isCreate = id === 'create'
  const navigate = useNavigate();

  const {control, handleSubmit, formState: { isValid }, reset} = useForm<IForm>({
      defaultValues:defaultValues,
      mode:'onBlur',
  })



  useEffect(()=>{
    const fetchData = async(id:string) =>{
      const data = await getDictionaryById(id)
      reset({
        wordRu: data.ru,
        wordEng: data.en,
        meaningsEng: data.meaningsEN,
        meaningsRu: data.meaningsRU,
        forms: data.forms
      })
    }
    if (!isCreate){
      fetchData(id)
    }
  },[])

  const onSubmit:SubmitHandler<IForm> = async (data) => {
    console.log(data);
    if (isCreate){
      await createWords({
        meaningsEN:data.meaningsEng,
        meaningsRU:data.meaningsRu,
        wordEng:data.wordEng.toLocaleLowerCase(),
        wordRU:data.wordRu.toLocaleLowerCase(),
        forms: data.forms
      })
      alert('Слово успешно создано')
    } else {
      await updateWords({
        id,
        meaningsEN:data.meaningsEng,
        meaningsRU:data.meaningsRu,
        wordEng:data.wordEng.toLocaleLowerCase(),
        wordRU:data.wordRu.toLocaleLowerCase(),
        forms: data.forms
      })
      alert('Слово успешно отредактировано')
      navigate('/admin/words')
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
          <InputHookForm
             name="wordRu"
             control={control}
             label='Слово на русском'
             rules={
              { 
                required: 'Укажите слово на русском',
                validate: validateRu,
              }
            }
          />
          <InputHookForm
             name="wordEng"
             control={control}
             label='Слово на английском'
             rules={
              { 
                required: 'Укажите слово на английском' ,
                validate: validateEng
              }
            }
          />
          <Box sx={{display:'flex', gap:3}}>
            <Box sx={{width:'50%'}}>

              <MeaningsArray
                control={control}
                label='Определения на русском'
                name="meaningsRu"
              />
            </Box>
            <Box sx={{width:'50%'}}>

          <MeaningsArray
            control={control}
            label='Определения на английском'
            name="meaningsEng"
          />
            </Box>
          </Box>
          <Box mb={6}/>
          <MeaningsArray
            control={control}
            label='Слово-формы'
            name="forms"
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
              navigate('/admin/words')
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

export default CreateWords;