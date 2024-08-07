import express from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';
import { OrderRoutes } from './app/modules/orders/order.route';
import { UserRoutes } from './app/modules/users/user.route';
const app = express()
const PORT = process.env.PORT || 5000;


// parser ooptions 
app.use(express.json());
app.use(cors());


//routes

app.use("/api/products",ProductRoutes)
app.use("/api/orders",OrderRoutes)
app.use("/api/users",UserRoutes)

app.get('/', (req, res) => {
  res.send("Ecommerce server listening")
})

export default app