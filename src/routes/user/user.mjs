import router from '../config';
import { userCreate } from '../../controllers/crud/user';
import { signIn } from '../../controllers/user/user';


/**
  @desc envoi mail de bienvenue à un nouvel user
*/
router.post('/user/create',userCreate);

router.post('/user/signin', signIn)

export default router;