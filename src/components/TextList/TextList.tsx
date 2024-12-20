import { List } from '@mui/material';
import React, { FC } from 'react';
import { TypesText } from '../../const/types';
import TextListItem from '../TextListItem/TextListItem';
import Grid from '@mui/material/Grid2';
import TextGrid from '../TextGrid/TextGrid';

interface TypesTextList {
    data:TypesText[]
}

const TextList:FC<TypesTextList> = ({data}) => {
    return (
        <List>
            <TextGrid isHead={true}></TextGrid>
            {data.map(item=>{
                return (
                    <TextListItem key={item.id} textData={item}></TextListItem>
                )
            })}
        </List>
    );
};

export default TextList;