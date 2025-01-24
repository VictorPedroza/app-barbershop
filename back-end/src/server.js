// Importação de Módulos e Configurações
const Express = require("express");

// Inicialização da Aplicação Back-end
const app = Express();

// Definindo configurações
app.use(Express.json());

app.get("/", (req, res) => {
    return res.status(202).json({
        message: "App BarberShop is Running!"
    })
})

app.listen(8088, () => {
    console.log("App is Running!")
});