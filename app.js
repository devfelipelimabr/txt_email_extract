const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

// Conexão com o MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Função para verificar e salvar emails na tabela 'empresas'
function salvarEmail(email) {
    const query = 'INSERT INTO empresas (email) VALUES (?)';
    connection.execute(query, [email], (err) => {
        if (err) {
            console.error('Erro ao salvar email:', err);
        } else {
            console.log(`Email salvo na tabela 'empresas': ${email}`);
        }
    });
}

// Expressão regular para capturar emails
const regexEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

// Leitura do arquivo .txt
fs.readFile('emails.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Extração dos emails
    const emails = data.match(regexEmail);
    if (emails) {
        emails.forEach(salvarEmail);
    } else {
        console.log('Nenhum email encontrado.');
    }
});

// Fechamento da conexão após a execução
process.on('exit', () => {
    connection.end();
});
