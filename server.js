import express from "express"
import cors from "cors"
import corsOptions from "./config/corsOptions.js"
import credentials from "./middleware/credentials.js"
import verifyJWT from "./middleware/verifyJWT.js"
import cookieParser from "cookie-parser"
//routes
import register from "./routes/register.js"
import auth from "./routes/auth.js"
import asteroids from "./routes/asteroids.js"
import refresh from "./routes/refresh.js"
import logout from "./routes/logout.js"
import userInfo from "./routes/userInfo.js"
import favAsteriods from "./routes/favAsteriods.js"

const app = express()
app.use(credentials);
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use("/register", register)
app.use("/auth",auth)
app.use("/refresh",refresh)
app.use("/logout",logout)
//verify
app.use(verifyJWT);
app.use('/asteroids',asteroids)
app.use('/user',userInfo)
app.use('/fav-asteroids',favAsteriods);

app.use("*", (res) => {
  res.status(404).json({ error: "not  found" })
})

export default app;
