import { Box, Button } from '@mui/material';
import { listRuLetter } from '../../const/const';
import styles from './Alphabet.module.scss'

const Alphabet = () => {
    console.log(listRuLetter.length);
    return (
        <Box 
        className={styles.listLetter}
        sx={{
                borderColor: 'primary.main'
            }}>
            {listRuLetter.map(letter => {
                return (
                    <Button className={styles.letter}  key={letter}>{letter}</Button>
                )
            })}
        </Box>
    );
};

export default Alphabet;