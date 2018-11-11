import router from '../config';
import { userCreate } from '../../controllers/crud/user';
import { pwdForgot} from '../../controllers/user/user';


/**
  @desc envoi mail de bienvenue à un nouvel user
*/
router.post('/user/create',userCreate);


/**
  @desc envoi mail de réinitianilisation du mdp
*/
router.post('/user/password/forgot', pwdForgot)


export default router;