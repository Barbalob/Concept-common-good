import styles from './TextsByWordId.module.scss'
import { Box, List, ListItem, Typography } from '@mui/material';
import { useAppSelector } from '../../../hook';

const TextsByWordId = () => {
  const { listTexts } = useAppSelector(state => state.word)
  return (
    <>
      {listTexts.length > 0 ? 
        <List className={styles.listTexts}>
          {listTexts.map(text => {
            return (
              <ListItem className={styles.listItem} key={text.id}>
                <Box sx={{marginLeft:3}}>
                  <Typography className={styles.title} variant='h3' component='h3' mt={3} mb={0}>{text.title} ({text.year})</Typography>
                  <Typography className={styles.author}  variant='h4' component='h4' mt={1} mb={3}>{text.author}</Typography>
                </Box>
                <Typography mt={1} mb={6}>{text.text}</Typography>
              </ListItem>
            )
          })}
        </List>
        :
        <Box  display="flex" justifyContent="center" alignItems="center"> Для данного слова нет доступных текстов</Box>
          }
      
    </>
  );
};

export default TextsByWordId;