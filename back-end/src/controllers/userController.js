const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
 
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
    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Todos os campos são obrigatórios"
            })
        }

        try {
            const [rows] = await db.execute(`SELECT * FROM ${User.tableName} WHERE email = ?`, [email]);

            if (rows.length === 0) {
                return res.status(404).json({
                    message: "Usuário não possui registro!"
                })
            }

            const user = rows[0];

            const isPasswordValid = await bcryptjs.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Senha incorreta!"
                })
            }

            const jwtSecret = process.env.JWT_SECRET;
            const token = jwt.sign(
                {userId: user.id, email: user.email},
                jwtSecret,
                { expiresIn: "1h" }
            )

            res.cookie("token", token, {
                httpOnly: false,
                secure: false,
                maxAge: 3600000,
                sameSite: "Strict"
            })

            return res.status(200).json({
                message: "Usuário conectado!",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    rule: user.rule
                }
            })

        } catch  (err) {
            return res.status(500).json({
                message: "Error server-side",
                error: err.message
            })
        }
    },
    getUser: async (req, res) => {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                message: "Usuário não conectado!"
            })
        }

        try {
            const jwtSecret = process.env.JWT_SECRET;
            const decoded = await jwt.verify(token, jwtSecret);

            const { email } = decoded;

            const [rows] = await db.execute(`SELECT * FROM ${User.tableName} WHERE email = ?`, [email]);

            if(rows.length === 0) {
                return res.status(400).json({
                    message: "Usuário não encontrado!"
                })
            }

            const user = rows[0];
            
            return res.status(200).json({
                message: "Usuário conectado!",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    rule: user.rule
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