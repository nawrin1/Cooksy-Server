import express from 'express';

// import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import validateRequest from '../../middlewares/validateRequest';
// import { ImageFilesArrayZodSchema } from '../../zod/image.validation';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';
import { RecipeSchema } from './Recipe.validation';
import { RecipeControllers } from './Recipe.controller';


const router = express.Router();

router.post(
  '/create-recipe',
  auth(USER_ROLE.User),
  multerUpload.fields([{ name: 'file' }]),
//   validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
//   validateRequest(RecipeSchema),
  RecipeControllers.createRecipe
);

router.get('/', RecipeControllers.getAllRecipe);

router.get('/:id', RecipeControllers.getRecipe);

// router.put(
//   '/:id',
//   auth(USER_ROLE.USER),
//   validateRequest(ItemValidation.updateItemValidationSchema),
//   ItemControllers.updateItem
// );
router.put(
  '/vote',
  auth(USER_ROLE.User),
 
  RecipeControllers.voteRecipe
);
router.put(
  '/comments',
  auth(USER_ROLE.User),
 
  RecipeControllers.commentRecipe
);
router.put(
  '/commentsdelete',
  auth(USER_ROLE.User),
 
  RecipeControllers.commentDelete
);

// router.delete('/:id', auth(USER_ROLE.USER), ItemControllers.deleteItem);

export const RecipeRoutes = router;
