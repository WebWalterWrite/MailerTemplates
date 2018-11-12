import router from '../config';
import { pwdForgot } from '../../controllers/user/user';

/**
  @desc envoi mail de réinitianilisation du mdp
*/

router.post('/user/password/forgot', pwdForgot);

export default router;