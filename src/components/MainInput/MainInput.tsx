import { Box, Button, TextField } from '@mui/material';
import { FC } from 'react';

interface TypesMainIntut {
    onClick: () => void,
    textButton?: string,
    placeholder?: string,
}

const MainInput:FC<TypesMainIntut> = ({onClick, textButton='Найти', placeholder="Поиск"}) => {
    return (
        <Box sx={{display:'flex',boxShadow:'0px 4px 20px 0px #00000026'}}>
            <TextField id="outlined-basic" type="search" label={placeholder} variant="outlined" sx={{
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