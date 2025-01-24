const bcryptjs = require("bcryptjs");

module.exports = {
    tableName: "Users",
    fields: {
        id: {
            type: Number,
            primaryKey: true,
            autoIncrement: true,
            required: true,
            collumnName: "id",
            typeInDatabase: "INT AUTO_INCREMENT PRIMARY KEY NOT NULL"
        },
        name: {
            type: String,
            required: true,
            length: 255,
            collumnName: "name",
            typeInDatabase: "VARCHAR(255) NOT NULL"
        },
        email: {
            type: String,
            required: true,
            unique: true,
            length: 255,
            collumnName: "email",
            typeInDatabase: "VARCHAR(255) NOT NULL UNIQUE"
        },
        password: {
            type: String,
            required: true,
            collumnName: "password",
            typeInDatabase: "VARCHAR(255) NOT NULL",
            async set(value) {
                const hashedPassword = await bcryptjs.hash(value, 10); 
                return hashedPassword;
            }
        },
        status: {
            type: String,
            enum: ['ativo', 'inativo'],
            required: true,
            collumnName: "status",
            typeInDatabase: "ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo'",
        },
        rule: {
            type: String,
            enum: ['client', 'colaborator', 'admin'],
            required: true,
            collumnName: "rule",
            typeInDatabase: "ENUM('client', 'colaborator', 'admin') NOT NULL DEFAULT 'client'"
        }
    }
}