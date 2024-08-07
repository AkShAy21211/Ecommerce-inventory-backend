import express from 'express';
import { signInUser, signUpUser } from './user.controller';
const router  = express.Router();



router.post('/sign-up',signUpUser)
router.post('/sign-in',signInUser)


export const UserRoutes = router;