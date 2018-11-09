import { validateAccount} from '../../services/validation/account'

/**
  @desc créer un nouvel user
*/

const userCreate = (req, res) => {

   validateAccount(req.body)

}

export {
    userCreate
}

