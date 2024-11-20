import {getUserId } from "../services/user.service.js"

function validateId (req, res, next) {
    const id = req.params;

    if(!id){
        return res.status(400).send({
            message: "Invalid ID",
        })
    }
next()
}

async function validateUser(req, res, next) {

    const id = req.params.id;
  //  const { name, username, email, password, perfil } = req.body;

    const user = await getUserId(id);

    if(!user){
        return res.status(400).send({message: " User nao cadastrado"})
    }

    //if (!name){
    //    res.status(422).send({msg: 'O Nome precisa ser prenchido'});
    //}

    //if (!username){
    //    res.status(422).send({msg: 'Usuario precisa ser prenchido'});
   // }
    //if (!email){
     //   res.status(422).send({msg: 'O email precisa ser prenchido'});
    //}
   // if (!password){
    //    res.status(422).send({msg: 'Senha precisa ser prenchida'});
    //}
    //if (!perfil){
        //res.status(422).send({msg: 'Perfil precisa ser prenchido'});
   /// }
    req.id = id;
    req.user = user;


    next();
}

async function userLogin(req, res, next) {

}

export {validateUser, userLogin, validateId};