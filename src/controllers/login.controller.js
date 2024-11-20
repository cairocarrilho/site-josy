import { loginUser, generatetoken} from "../services/user.service.js";
import bcrypt from "bcrypt";


export class LoginController {

    async login(req, res) {
      try{
          const {email, password} = req.body;
          const user = await loginUser(email)

          if(!user) return res.status(400).send({ message: 'Senha incorreta ou usuario incorreto' });

          const isPasswordValid = await bcrypt.compare(password, user.password);

          //console.log(isPasswordValid); // se nao tiver certo ele vai retorna false, agora se tiver certa ele retorna true
            if(!isPasswordValid || !user){
                return res.status(400).send({msg: 'Senha incorreta ou usuario incorreto'});
            }

            const token = generatetoken(user.id)

          res.send("Usuario connectado");
      }catch(err){
        console.log(err);
      }
    }

}

