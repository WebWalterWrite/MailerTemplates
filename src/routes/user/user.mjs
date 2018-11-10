import router from '../config';
import { userCreate } from '../../controllers/crud/user';
import { PwdForgot} from '../../controllers/user/user';

//import { WelcomeEmail } from '../../controllers/email/emailing';

/**
  @desc envoi mail de bienvenue à un nouvel user
*/

router.post('/user/create',userCreate);


router.post('/user/password/forgot', PwdForgot)

export default router;