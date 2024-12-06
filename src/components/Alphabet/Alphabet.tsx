import { Box, Button } from '@mui/material';
import { listRuLetter } from '../../const/const';
import styles from './Alphabet.module.scss'
import { setLetter } from '../../store/dictionarySlice';
import { useAppDispatch, useAppSelector } from '../../hook';

const Alphabet = () => {
    const selectedLetter = useAppSelector(state => state.dictionary.letter)
    const dispatch = useAppDispatch()
    const setSelectedLetter = (letter:string) =>{
        if (selectedLetter === letter){
            return dispatch(setLetter({letter:''}))
        }
        return dispatch(setLetter({letter})
    )
}
    return (
        <Box 
        className={styles.listLetter}
        sx={{
                borderColor: 'primary.main'
            }}>
            {listRuLetter.map(letter => {
                return (
                    <Button 
                        className={`
                            ${styles.letter} 
                            ${letter === selectedLetter ? styles.selectedLetter:''}`}  
                        key={letter}
                        onClick={()=>setSelectedLetter(letter)}
                    >
                        {letter}
                    </Button>
                )
            })}
        </Box>
    );
};

export default Alphabet;