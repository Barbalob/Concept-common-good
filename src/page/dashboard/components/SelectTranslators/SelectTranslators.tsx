import { Autocomplete,  CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Control, Controller, FieldValues, Path} from "react-hook-form";
import { getAuthors } from "../../../../api";
import { TypesAuthor } from "../../../../const/types";

interface IAuthor{
  name:string;
  id: string
}

interface InputHookFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; 
  rules?: any; 
  label?: string; 
  errors:any
}

const transform = (data:TypesAuthor[]):IAuthor[] => {
  return data.map(i => {return {id: i.id, name:i.name}})
}

const SelectTranslators =  <T extends FieldValues>({ control, name, label, rules }: InputHookFormProps<T>) => {  
    return (
      <Controller 
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value}}) => {
          const [open, setOpen] = useState(false);
          const [options, setOptions] = useState<readonly IAuthor[]>([]);
          const [loading, setLoading] = useState(false);
        
          const handleOpen = () => {
            setOpen(true);
            (async () => {
              setLoading(true);
              const fetchData = await getAuthors({params:{}})
              setLoading(false);
              setOptions([...transform(fetchData)]);
            })();
          };
        
          const handleClose = () => {
            setOpen(false);
            setOptions([]);
          };
        
          return (
            <Autocomplete
              multiple
              sx={{ marginBottom:3 }}
              value={value}
              onChange={(_:any, newValue: any) => {
                onChange(newValue);
              }}
              open={open}
              onOpen={handleOpen}
              onClose={handleClose}
              isOptionEqualToValue={(option:IAuthor, value:IAuthor) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              defaultValue={[]}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  fullWidth
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
            />
          );
      }}
      />
    );
};

export default SelectTranslators;