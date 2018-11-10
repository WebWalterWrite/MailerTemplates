import router from '../config';
import { userCreate } from '../../controllers/crud/user'
//import { WelcomeEmail } from '../../controllers/email/emailing';

/**
  @desc envoi mail de bienvenue à un nouvel user
*/

router.post('/user/create',userCreate);


router.post('/user/password/forgot',)

export default router;