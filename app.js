import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";

const app = express();
dotenv.config({
  path: "./config/config.env",
});
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
//imports Routes
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js"


app.use(cookieParser());

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(session({secret:process.env.SESSION_SECRET, resave: false,
saveUninitialized: false,}))

app.use(
  cors({
    credentials: true,
    origin:'http://localhost:3000',  //je bdlna frontend url se
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
connectPassport();
app.use("/", userRouter);
app.use("/api/v1",orderRouter)

app.use(errorMiddleware)

export default app;
