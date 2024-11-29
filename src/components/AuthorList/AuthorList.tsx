import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import srvPlaceholder from '../../assets/photo/photo-placeholder.png'
import styles from './AuthorList.module.scss'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const authorsList = [
    {
        src:srvPlaceholder,
        title:'Title',
        yearsLife:'(1900-1923)'
    },
    {
        src:srvPlaceholder,
        title:'Title',
        yearsLife:'(1900-1923)'
    },
    {
        src:srvPlaceholder,
        title:'Title',
        yearsLife:'(1900-1923)'
    },
    {
        src:srvPlaceholder,
        title:'Title',
        yearsLife:'(1900-1923)'
    },
    
]



const AuthorList = () => {
    const theme = useTheme();
    
    const isXs = useMediaQuery(theme.breakpoints.down('sm')); // экраны до 'sm'
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // экраны 'sm' до 'md'
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')); // экраны 'md' до 'lg'

    const getColumns = () => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMd) return 3;
        return 4;
    };

    const getGap = () => {
        if (isXs) return 10;
        if (isSm) return 20;
        if (isMd) return 40;
        return 80;
    };


    return (
        <ImageList className={styles.list} cols={getColumns()} gap={getGap()}>
            {authorsList.map((item) => (
                <ImageListItem className={styles.item} key={item.src}>
                    <img
                        srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.src}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={item.yearsLife}
                        position="below"
                        className={styles.title}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default AuthorList;
