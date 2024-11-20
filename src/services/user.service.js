import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

async function createUser(userData) {
    try {
    const { name, username, email, perfil, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        perfil,
        password: hashedPassword
      },
    });
    return user;
  } catch (erro) {
    console.error("Erro ao criar usuário", erro);
  }
}

async function getUser() {
  try {
    const user = await prisma.user.findMany({
      select:{
        email: true,
        name: true,
        username: true,
        perfil: true,
      }
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserId(userDataId) {
  try {
    const { id } = userDataId;
    const user = await prisma.user.findMany({
      where: {
        id: userDataId,
      },
      select:{
        email: true,
        name: true,
        username: true,
        perfil: true,
      }
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function updateId(userID, userData) {
  try {
    const {id} = userID
    const { name, username, email, perfil, password } = userData;
   await prisma.user.findUnique({
    where:{
      id:id,
    }
  })

    const user  = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name,
        username,
        perfil,
        password,
        email
      },
    });
    return user;

  } catch (error) {
    console.log(error);
  }


}

async function loginUser(email){
try{

  const user = await prisma.user.findUnique({
    where:{
        email: email

    }})


  return user
}catch (error){
  console.error("Usuario ou Senha incorreta");
}

}


//JWT
// passa 3 parametro( 1 payload: o dado que eu quero criptografar , 2
 const generatetoken = (id)=>  jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: '1h'});

export { createUser, getUser, getUserId, updateId, loginUser, generatetoken};
