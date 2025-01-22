import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import MainTitle from '../../../components/MainTitle/MainTitle';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
// import SimpleMDE from 'react-simplemde-editor';
import { useLocation, useNavigate } from 'react-router-dom';
import { createAuthor, deleteAuthor, updateAuthor } from '../../../api/services/Authors';
import { KeyboardEvent, useEffect, useState } from 'react';
import { getAuthorById } from '../../../api';
import InputHookForm from '../components/InputHookForm/InputHookForm';


interface IForm {
  name:string,
  year:string,
  image:FileList,
  biography:string
}

const defaultValues = {
  name:'',
  year:'',
  biography:''
}


const CreateAuthors = () => {
  const id = useLocation().pathname.replace('/admin/authors/', '')
  const isCreate = id === 'create'
  const navigate = useNavigate();
  const [srcImage, setSrcImage] = useState<string>()

  const {register, control, handleSubmit, formState: { isValid },reset, watch} = useForm<IForm>({
      defaultValues:isCreate ? {}: defaultValues,
      mode:'onSubmit',
  })
  const srcUpdateValue = watch('image')


  useEffect(()=>{
    const fetchData = async(id:string) =>{
      const data = await getAuthorById(id)
      reset({name:data.name, biography:data.biography, year:data.years})
      setSrcImage(data.photoUrl)
    }
    if (!isCreate){
      fetchData(id)
    }
  },[])

  const onSubmit:SubmitHandler<IForm> = async (data) => {
    if (isCreate){
      await createAuthor({
        name:data.name,
        image:data.image[0],
        biography:data.biography,
        year:data.year,
      })
      alert('Автор успешно создан')
      reset()
    } else {
      await updateAuthor({
        name:data.name,
        image:data.image[0],
        biography:data.biography,
        year:data.year,
        id
      })
      alert('Автор успешно отредактирован')
      navigate('/admin/authors')
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
        <MainTitle>{isCreate ? 'Создание Автора': 'Редактирование автора'}</MainTitle>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
        >
          <TextField 
              sx={{marginBottom:2}}
              type='file'
              // error={Boolean(errors.name?.message)}
              // helperText={errors.name?.message}
              {...register('image')}
              fullWidth
            />
            {!isCreate && srcImage && srcUpdateValue?.length === 0 &&  <img style={{maxWidth:300, maxHeight:300}} src={`http://localhost:3000${srcImage}`}/>}
          <InputHookForm
             name="name"
             control={control}
             label='Имя'
             rules={{ required: 'Укажите Имя' }}
          />
          <InputHookForm
             name="year"
             control={control}
             label='Годы жизни'
             rules={{ required: 'Укажите годы жизни' }}
          />
          <InputHookForm
             name="biography"
             control={control}
             label='Биография'
             rules={{ required: 'Укажите биографию' }}
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
              await deleteAuthor(id)
              alert('Удален')
              navigate('/admin/authors')
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

export default CreateAuthors;