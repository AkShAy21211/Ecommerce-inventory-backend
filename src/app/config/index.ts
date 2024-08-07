import dotenv from 'dotenv'
dotenv.config();


export default {
    port:process.env.PORT,
    mongourl:process.env.MONGO_URL,
    JWT_SECRET:process.env.JWT_SECRET
}