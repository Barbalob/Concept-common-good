import { Box, Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../hook';
import { fetchAuthLogin, fetchAuthRegistration } from '../../store/authSlice';

interface IForm {
  email:string,
  password: string
}

const LoginForm = () => {
  const {register, handleSubmit, getValues,formState:{isValid}} = useForm<IForm>({
    defaultValues:{}
  })

  const dispatch = useAppDispatch()

  const onSubmit:SubmitHandler<IForm> = (data) => {
    // dispatch(fetchAuthRegistration({email:data.email, password:data.password}))
    dispatch(fetchAuthLogin({email:data.email, password:data.password}))
    // console.log(data);
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <Box sx={{maxWidth:600, margin:'auto'}}>
        <Typography variant="h1" mb={5}>
          Войдите в аккаунт
        </Typography>
        <form 
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField 
              sx={{marginBottom:2}}
              // className={styles.field}
              label="E-Mail"
              type='email'
              // value={email} 
              // onChange={e => setEmail(e.target.value)} 
              // error={Boolean(errors.email?.message)}
              // helperText={errors.email?.message}
              {...register('email', 
                {required:'Укажите почту',
                })}
              fullWidth
          />
          <TextField 
              // className={styles.field} 
              label="Пароль" 
              type="password"
              fullWidth 
              // error={Boolean(errors.password?.message)}
              // helperText={errors.password?.message}
              {...register('password', {required:'Укажите пароль'})}
          />
          <Button 
            sx={{marginTop:5}}
            disabled={!isValid}
            // className={styles.btnReg} 
            type='submit' size="large" variant="contained" fullWidth>
              Войти
          </Button>
          <Button 
            sx={{marginTop:5}}
            // className={styles.btnReg} 
            size="large" variant="outlined" fullWidth
            disabled={!isValid}
            onClick={(e)=>{
              e.preventDefault();
              dispatch(fetchAuthRegistration({email:getValues('email'), password:getValues('password')}))
            }}
            >
              Регистрация
          </Button>
        </form>
      </Box>      
    </div>
  );
};

export default LoginForm;