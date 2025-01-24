const db = require("../config/db");
const User = require("../entities/User");

async function initTableUser() {
    try {
        const query = `CREATE TABLE IF NOT EXISTS ${User.tableName} (
            ${User.fields.id.collumnName} ${User.fields.id.typeInDatabase},
            ${User.fields.name.collumnName} ${User.fields.name.typeInDatabase},
            ${User.fields.email.collumnName} ${User.fields.email.typeInDatabase},
            ${User.fields.password.collumnName} ${User.fields.password.typeInDatabase},
            ${User.fields.status.collumnName} ${User.fields.status.typeInDatabase},
            ${User.fields.rule.collumnName} ${User.fields.rule.typeInDatabase},
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

        await db.execute(query);

        console.log("Tabela criada com sucesso!");
        process.exit(0); // Encerra o processo com sucesso
    } catch (err) {
        console.error("Erro ao criar tabela:", err.message);
        process.exit(1); // Encerra o processo com erro
    }
}

initTableUser();
