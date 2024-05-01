import express from "express";
import {
  loginUser,
  singupUser,
  logoutUser,
} from '../controller/user-controller.js'


const userRouter = express();

userRouter.post('/login', loginUser);
userRouter.post('/signup', singupUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/:userId', () => console.log('encontrar usuario por id')); //TODO: implementar controlador
userRouter.get('/', () => console.log('obtener usuarios')); //TODO: implementar controlador
userRouter.put('/:userId', () => console.log('modificar usuario')); //TODO: implementar controlador
userRouter.delete('/:userId', () => console.log('eliminar usuario')); //TODO: implementar controlador

export default userRouter;
