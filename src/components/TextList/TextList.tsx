import { List } from '@mui/material';
import { FC } from 'react';
import { TypesText } from '../../const/types';
import TextListItem from '../TextListItem/TextListItem';
import TextGrid from '../TextGrid/TextGrid';

interface TypesTextList {
    data:TypesText[],
    isAdmin?:boolean
}

const TextList:FC<TypesTextList> = ({data,isAdmin=false}) => {
    return (
        <List>
            <TextGrid isHead={true}></TextGrid>
            {data.map(item=>{
                return (
                    <TextListItem key={item.id} textData={item} isAdmin={isAdmin}></TextListItem>
                )
            })}
        </List>
    );
};

export default TextList;