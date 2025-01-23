import { Box, Button, TextField } from '@mui/material';
import { FC } from 'react';

interface TypesMainIntut {
    onClickEdit?: () => void,
    onClickCancel?: () => void,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    // textButton?: string,
    sizeTextButton?: string,
    placeholder?: string,
}

const InputEditChip:FC<TypesMainIntut> = ({onChange, onClickEdit=()=>{}, onClickCancel=()=>{}, placeholder="Поиск", value, sizeTextButton=null}) => {
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
            <Button  onClick={onClickEdit} variant="contained" sx={{
            fontSize: sizeTextButton,
            boxShadow: 0,
            borderRadius: 0,
            }}>Редактировать</Button>
            <Button  onClick={onClickCancel} variant="outlined" sx={{
            fontSize: sizeTextButton,
            borderTopLeftRadius:0,
            borderBottomLeftRadius:0,
            boxShadow: 0
            }}>Отменить</Button>
        </Box>
    );
};

export default InputEditChip;