import {
  createUser,
  getUser,
  getUserId,
  updateId,

} from "../services/user.service.js";


export class UserController {
  async createUsers(req, res) {
    const { name, username, email, password, perfil } = req.body;

    try {
      const user = await createUser(req.body);

      res
        .status(201)
        .send({ message: `Usuário criado com sucesso `, user: user });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao criar usuario",
      });
    }
  }

  async getUsers(req, res) {
    const { name, username, email, password, perfil } = req.body;

    try {
      const user = await getUser(req.body);

      if (user.length === 0) {
        return res.status(400).send({ message: "Não a usuario cadastrado " });
      }

      res.status(201).json(user);
    } catch (error) {
      res.status(500).send({
        message: "Erro ao ler lista de usuario",
      });
    }
  }

  async getUsersId(req, res) {

    try {
      const user = req.user // esta pegando o middlware o req.user que ja teria sido definido

      res.send(user);
    } catch (error) {
      res.status(500).send({
        message: "Usuario não encontrado",
      });
    }
  }

  async updateUsers(req, res) {
    const {id} = req.params;
    const { name, username, password, perfil } = req.body;
    if (!name && !username && !password && !perfil) {
      res.status(400).send({
        message: "Submeta pelo menos um campo pada fazer a alteração",
      });
    }
    try {
      const user = await updateId( req.params, req.body);
      if(user){
        res.status(200).send({
          message: "Usuário atualizado com sucesso",
          user: user,
        });
      }
      else {
        res.status(404).send({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(400).send({ message: "Não foi possivel alterar o usuario" });
    }
  }


}
