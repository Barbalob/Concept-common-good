import { FC } from 'react';
import Grid from '@mui/material/Grid2';
import { TypesText } from '../../const/types';
import bookSrc from '../../assets/svg/book.svg'
import styles from './TextGrid.module.scss'

interface TypeTextGrid {
    textData?:TypesText,
    isHead?:boolean
}

const titleColume = [
    '',
    'Название',
    'Автор',
    'Год публикации',
]

const TextGrid:FC<TypeTextGrid> = ({textData, isHead=false}) => {
    return (
        <>
            {isHead && 
            <Grid className={`${styles.contauner} ${styles.containerHeader}`} container spacing={2}>
                {titleColume.map((item)=>{
                    return (
                        <Grid className={styles.item}  key={item} size={3} sx={{textAlign:'center'}}>
                            {item}
                        </Grid>
                    )
                })}
            </Grid>
            }
            {!isHead && 
            <Grid className={styles.contauner} container spacing={2} sx={{width:'100%'}}>
                <Grid className={styles.item} size={3} sx={{textAlign:'center'}}>
                    <img src={bookSrc}></img>
                </Grid>
                <Grid className={styles.item} size={3} sx={{textAlign:'center'}}>
                    {textData?.textTitle}
                </Grid>
                <Grid className={styles.item} size={3} sx={{textAlign:'center'}}>
                    {textData?.author}
                </Grid>
                <Grid className={styles.item} size={3} sx={{textAlign:'center'}}>
                    {textData?.year}
                </Grid>
            </Grid>
            }
        </>
    );
};

export default TextGrid;