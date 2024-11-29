import { Box, List, ListItem, Typography } from '@mui/material';
import styles from './SelectedLetter.module.scss'

const wordList = [
    {
        ru:'Чудо',
        en:'miracle'
    },
    {
        ru:'Чувства',
        en:'sense'
    },
]

const SelectedLetter = () => {

    return (
        <>
           <List className={styles.selectedLetterList}>
                <ListItem  className={styles.selectedLetter}>
                    <Typography className={styles.letter}>Ч</Typography>          
                </ListItem>
                <List  className={styles.listWords}>
                    {wordList.map((word)=>{
                        return (
                            <ListItem className={styles.itemListWords}>
                                <Typography className={styles.wordRu}>{word.ru}</Typography>
                                <Typography className={styles.wordEn}>{word.en}</Typography>
                            </ListItem>  
                        )
                    })}
                </List>
           </List>
           <List className={styles.selectedLetterList}>
                <ListItem  className={styles.selectedLetter}>
                    <Typography className={styles.letter}>М</Typography>          
                </ListItem>
                <List  className={styles.listWords}>
                    {wordList.map((word)=>{
                        return (
                            <ListItem className={styles.itemListWords}>
                                <Typography className={styles.wordRu}>{word.ru}</Typography>
                                <Typography className={styles.wordEn}>{word.en}</Typography>
                            </ListItem>  
                        )
                    })}
                </List>
           </List>
        </>
    );
};

export default SelectedLetter;