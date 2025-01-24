const jwt = require("jsonwebtoken");

const User = require("../entities/User");
const db = require("../config/db");

module.exports = {
    register: async (req, res) => {
        const { name, email, password, status, rule } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Todos os Campos são Obrigatórios!"
            })
        }

        const [rows] = await db.execute(`SELECT * FROM ${User.tableName} WHERE email = ?`, [email]);
        if (rows.length > 0) {
            return res.status(400).json({
                message: "Usuário já registrado!"
            })
        }

        try {
            const hashedPassword = await User.fields.password.set(password);

            const [rows] = await db.execute(
                `INSERT INTO ${User.tableName} 
                (
                ${User.fields.name.collumnName},
                ${User.fields.email.collumnName},
                ${User.fields.password.collumnName},
                ${User.fields.status.collumnName},
                ${User.fields.rule.collumnName}
                )
                VALUES (?, ?, ?, ?, ?);
                `,
                [name, email, hashedPassword, status || 'ativo', rule || 'client']
            )

            try {
                const jwtSecret = process.env.JWT_SECRET;
                const token = jwt.sign(
                    { userId: rows.userId, email: email },
                    jwtSecret,
                    { expiresIn: "1h" }
                );

                res.cookie("token", token, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 3600000,
                    sameSite: "Strict",
                })
            } catch (err) {
                return res.status(501).json({
                    message: "Erro ao inserir o Token"
                })
            }


            return res.status(200).json({
                message: "Usuário registrado com sucesso!",
                user: {
                    id: rows.insertId,
                    name,
                    email,
                    password,
                    status,
                    rule
                }
            })
        } catch (err) {
            return res.status(500).json({
                message: "Error server-side",
                error: err.message
            })
        }
    },
    listAll: async (req, res) => {
        try {
            const [rows] = await db.execute(`SELECT * FROM ${User.tableName}`);
            if (rows.length > 0) {
                return res.status(200).json(rows);
            } else {
                return res.status(404).json({
                    message: "Usuários não encontrados!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: "Error server-side",
                error: err.message
            })
        }
    }
}