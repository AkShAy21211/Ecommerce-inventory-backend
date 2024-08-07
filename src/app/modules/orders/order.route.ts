import express from 'express';
import { createOrder, getAllOrder } from './order.controller';
import verifyToken from '../../middleware/authMiddleware';
const router  = express.Router();



router.post('/',verifyToken,createOrder)
router.get('/',verifyToken,getAllOrder)


export const OrderRoutes = router;