// Importação de Módulos e Configurações
const Express = require("express");
const cors = require("cors");

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

// Definindo configurações
app.use(Express.json());

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "App BarberShop is Running!"
    })
})

app.listen(8088, () => {
    console.log("App is Running!")
});