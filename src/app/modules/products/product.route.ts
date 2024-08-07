import express from 'express';
import { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } from './product.controller';
import verifyToken from '../../middleware/authMiddleware';
import isAdmin from '../../middleware/adminMiddleware';
const router  = express.Router();



router.post('/',verifyToken,isAdmin,createProduct)
router.get('/',verifyToken,getAllProducts)
router.get("/:productId",verifyToken,getSingleProduct)
router.put("/:productId",verifyToken,isAdmin,updateProduct)
router.delete("/:productId",verifyToken,isAdmin, deleteProduct)


export const ProductRoutes = router;