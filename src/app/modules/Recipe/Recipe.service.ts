import { Recipe } from "./Recipe.model";

const createRecipeIntoDB = async (payload: any, images: any) => {

    const { file } = images;

    console.log(images)
    payload.images = file.map((image:any) => image.path);

    console.log(payload)
    const tag=payload.tags.split(",")
    const newData={...payload,tags:tag}
    // console.log(newData)

  
    const result = await Recipe.create(newData);
  
    // await addDocumentToIndex(result, 'items');
    return result;
  };


  export const RecipeServices = {
    createRecipeIntoDB
  
  };
  