import { ImageList, ImageListItem, ImageListItemBar, ListItem } from '@mui/material';
import srvPlaceholder from '../../assets/photo/photo-placeholder.png'
import styles from './AuthorList.module.scss'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect } from 'react';
import { fetchAuthors } from '../../store/authorsSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import LoadingData from '../LoadingData/LoadingData';
import { NavLink } from 'react-router-dom';


const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));


const AuthorList = () => {
    const { isLoading, error, listAuthor,searchWord } = useAppSelector(state => state.authors)
    const dispatch = useAppDispatch()
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

    useEffect(()=>{
        dispatch(fetchAuthors({word:searchWord}))
    },[searchWord])


    return (
        <LoadingData error={error} isLoading={isLoading} listlength={listAuthor.length} >
            <ImageList className={styles.list} cols={getColumns()} gap={getGap()}>
                {listAuthor.map((author) => (
                    <ListItem 
                    component={MyNavLink}
                    to={author.id}
                    activeClassName={styles.active}
                    className={styles.headerLink}
                    key={author.id}
                    >
                        <ImageListItem className={styles.item}>
                            <img
                                // srcSet={`${author.photoUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                // src={`${author.photoUrl}?w=248&fit=crop&auto=format`}
                                srcSet={`${srvPlaceholder}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${srvPlaceholder}?w=248&fit=crop&auto=format`}
                                alt={author.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={author.name}
                                subtitle={author.years}
                                position="below"
                                className={styles.title}
                                sx={{color:'black'}}
                            />
                        </ImageListItem>
                    </ListItem>
                ))}
            </ImageList>
        </LoadingData>
    );
};

export default AuthorList;
