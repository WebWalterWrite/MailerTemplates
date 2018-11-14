import router from '../config';
import { pwdForgot, pwdInitialize } from '../../controllers/user/user';

/**
  @desc envoi mail de réinitianilisation du mdp
*/

router.post('/user/password/forgot', pwdForgot);

/**
  @desc réinitianilisation du mdp depuis le lien
*/

router.get('/user/password/initialize/:token',pwdInitialize )
export default router;