import router from '../config';
import { userCreate } from '../../controllers/crud/user';


/**
  @desc envoi mail de bienvenue à un nouvel user
*/
router.post('/user/create',userCreate);


export default router;