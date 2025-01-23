import { AUTORS } from "../../const/constRoutsApi";
import $api from "../const";

interface IParamsCreate {
  name:string,
  year:string,
  biography:string,
  image:File
}
interface IParamsUpdate {
  id:string,
  name:string,
  year:string,
  biography:string,
  image?:File
}


// const $api = axios.create({})

export const createAuthor = (params:IParamsCreate) => {
  var formData = new FormData();
  formData.append("image", params.image);
  formData.append("name", params.name);
  formData.append("biography", params.biography);
  formData.append("year", params.year);

  return $api.post(AUTORS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
    .then(res=>res.data)
}

export const deleteAuthor = (id:string) => {
  return $api.delete(AUTORS, { data: {id} })
    .then(res=>res.data)
}


export const updateAuthor = (params:IParamsUpdate) => {
  var formData = new FormData();
  if (params?.image){
    formData.append("image", params.image);
  }
  formData.append("name", params.name);
  formData.append("biography", params.biography);
  formData.append("year", params.year);
  formData.append("id", params.id);

  return $api.put(AUTORS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
    .then(res=>res.data)
}