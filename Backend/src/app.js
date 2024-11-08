import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials:true,
// }))
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({extended:true,}));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRouter from './routes/user.routes.js'
import driveRouter from './routes/drive.routes.js'
app.use("/api/v1/users",userRouter)
app.use("/api/v1/drives",driveRouter)

export { app }