import { FC, Fragment, useEffect, useState } from 'react';

interface TypeProps{
  text:string,
  words:string[]
}

const Selected = ({text, separator}:{text:string,separator:string}) => <><b style={{color: 'red'}}>{text}</b>{separator}</>

const HighlightedWords:FC<TypeProps> = ({text, words}) => {
  const [separators, setSeparators] = useState<string[]>([])

  useEffect(()=>{
    setSeparators(text.split(/[А-яё0-9A-z]+/))
  },[])

  
  return (
    <>
       {
         text.split(/[^А-яё0-9A-z]+/).map((e, i) =>{ 
         return (words.includes(e.toLowerCase())) 
           ? <Selected key={e + i} text={e} separator={(separators[i+1] ? separators[i+1] : '')} /> 
           : <Fragment key={e + i}>{ e + (separators[i+1] ? separators[i+1] : '')}</Fragment>
        }
       )
    }
    </>
  );
};

export default HighlightedWords;