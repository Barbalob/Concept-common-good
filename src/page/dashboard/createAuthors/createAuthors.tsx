import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import MainTitle from '../../../components/MainTitle/MainTitle';
import MainContainer from '../../../components/MainContainer/MainContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import { useLocation, useNavigate } from 'react-router-dom';
import { createAuthor, deleteAuthor, updateAuthor } from '../../../api/services/Authors';
import { useEffect, useState } from 'react';
import { getAuthorById } from '../../../api';
import { TypesAuthor } from '../../../const/types';
import { red } from '@mui/material/colors';

interface IForm {
  name:string,
  year:string,
  image:FileList,
  biography:string
}

const defaultValues = {
  name:' ',
  year:' ',
  biography:' '
}


const CreateAuthors = () => {
  const id = useLocation().pathname.replace('/admin/authors/', '')
  const isCreate = id === 'create'
  const navigate = useNavigate();
  const [srcImage, setSrcImage] = useState<string>()

  const {register, handleSubmit, formState: { errors }, setValue, watch} = useForm<IForm>({
      defaultValues:isCreate ? {}: defaultValues,
      mode:'onSubmit',
  })
  const srcUpdateValue = watch('image')


  useEffect(()=>{
    const fetchData = async(id:string) =>{
      const data = await getAuthorById(id)
      // reset({name:data.name, biography:data.biography, year:data.years})
      setValue("name", data.name)
      setValue("biography", data.biography)
      setValue("year", data.years)
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
    } else {
      updateAuthor({
        name:data.name,
        image:data.image[0],
        biography:data.biography,
        year:data.year,
        id
      })
      navigate('/admin/authors')
    }
  }


  return (
    <>
      <HeaderAdmin/>
      <MainContainer>
        <MainTitle>{isCreate ? 'Создание Автора': 'Редактирование автора'}</MainTitle>
        <form 
          onSubmit={handleSubmit(onSubmit)}
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
          <TextField 
              sx={{marginBottom:2}}
              label="Имя"
              type='text'
              required
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
              {...register(
                'name', 
                // {required:'Укажите Имя'}
                )
              }
              fullWidth
          />
          <TextField 
              sx={{marginBottom:2}}
              label="Годы жизни" 
              type="text"
              fullWidth 
              required
              error={Boolean(errors.year?.message)}
              helperText={errors.year?.message}
              {...register(
                'year',
                // {required:'Укажите годы жизни'}
              )}
          />
          <TextField 
              sx={{marginBottom:2}}
              label="Биография" 
              type="text"
              required
              fullWidth 
              error={Boolean(errors.biography?.message)}
              helperText={errors.biography?.message}
              {...register('biography',
                // {required:'Укажите биографию'}
              )}
          />
          <Button 
          sx={{marginTop:5}}
          // className={styles.btnReg} 
          type='submit' size="large" variant="contained" fullWidth>
              Создать
          </Button>
          {!isCreate && 
            <Button 
            sx={{marginTop:5}}
            // className={styles.btnReg} 
            onClick={(e)=>{
              e.preventDefault()
              deleteAuthor(id)
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