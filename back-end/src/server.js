// Importação de Módulos e Configurações
const Express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//Config do Cors
const corsOptions = {
    origin: ["http://localhost:5173", "https://app-barbershop-eta.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Inicialização da Aplicação Back-end
const app = Express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// Definindo configurações
app.use(Express.json());

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "App BarberShop is Running!"
    })
});


const userRoutes = require("./routes/userRoutes");
app.use("/Users", userRoutes);

app.listen(8088, () => {
    console.log("App is Running!");
});