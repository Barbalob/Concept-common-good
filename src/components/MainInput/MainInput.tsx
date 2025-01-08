import { Box, Button, TextField } from '@mui/material';
import { FC } from 'react';

interface TypesMainIntut {
    onClick?: () => void,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    textButton?: string,
    placeholder?: string,
}

const MainInput:FC<TypesMainIntut> = ({onChange, onClick=()=>{}, textButton='Найти', placeholder="Поиск", value}) => {
    return (
        <Box sx={{display:'flex',boxShadow:'0px 4px 20px 0px #00000026'}}>
            <TextField 
            id="outlined-basic" 
            type="search" 
            label={placeholder} 
            value={value}
            onChange={onChange}
            variant="outlined" sx={{
                flexGrow:1,
                "& .MuiOutlinedInput-root": {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            }
            }} />
            <Button onClick={onClick} variant="contained" sx={{
            borderTopLeftRadius:0,
            borderBottomLeftRadius:0,
            width:210,
            boxShadow: 0
            }}>{textButton}</Button>
        </Box>
    );
};

export default MainInput;