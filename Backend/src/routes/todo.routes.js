import { Router } from 'express';
import { createTodo, deleteTodo, getTodos } from '../controllers/todo.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();
router.route('/getTodos').get(getTodos);
router.route('/createTodo').post( createTodo);
router.route('/deleteTodo').delete( deleteTodo);

export default router;
