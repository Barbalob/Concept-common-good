import { Typography } from "@mui/material";
import { FC } from "react";

interface TypesMainTitle {
    children:string
}

const MainTitle:FC<TypesMainTitle> = ({children}) => {
    return (
        <>
            <Typography textAlign="center" variant='h1' component='h1' mt={6} mb={6}>{children}</Typography>
        </>
    );
};

export default MainTitle;