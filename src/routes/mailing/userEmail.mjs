import router from '../config';
import { WelcomeEmail } from '../../controllers/email/emailing';

/**
  @desc envoi mail de bienvenue à un nouvel user
*/

router.get('/user/mail/welcome',WelcomeEmail);




export default router;