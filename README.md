# Email Extractor Application

Esta aplicação em Node.js lê um arquivo `.txt`, extrai endereços de emails e os salva em um banco de dados MySQL na tabela `empresas` do schema `mass_email_db`.

## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes componentes instalados:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Instalação

1. Clone o repositório ou crie os arquivos necessários.
2. Instale as dependências:

```bash
npm install mysql2 dotenv
```

3. Crie um arquivo `.env` na raiz do projeto com suas credenciais MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=mass_email_db
```

4. Crie o banco de dados e a tabela MySQL:

```sql
CREATE DATABASE IF NOT EXISTS mass_email_db;

USE mass_email_db;

CREATE TABLE IF NOT EXISTS empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL
);
```

## Estrutura do Projeto

```bash
/extract-emails
    - app.js
    - .env
    - emails.txt
    - README.md
```

- `app.js`: Script principal para ler o arquivo e salvar os emails no MySQL.
- `.env`: Contém as credenciais de conexão com o banco de dados MySQL.
- `emails.txt`: Arquivo contendo os emails que serão extraídos e salvos no banco.
- `README.md`: Este arquivo.

## Como Usar

1. Insira os emails no arquivo `emails.txt`, um email por linha ou no formato de texto livre.
2. Execute o script com o seguinte comando:

```bash
node app.js
```

3. O script irá:
    - Ler o arquivo `emails.txt`
    - Extrair emails válidos
    - Inserir os emails na tabela `empresas` dentro do schema `mass_email_db`

## Exemplo de Formato de Arquivo `emails.txt`

```
email1@example.com
Este é um texto com vários emails: email2@example.com, outro_email@dominio.com.
Email solto: email3@test.com
```

## Considerações

- A expressão regular utilizada captura emails no formato padrão.
- O script ignora duplicatas no arquivo, mas não verifica duplicatas no banco de dados. Para evitar emails duplicados no banco, considere adicionar uma constraint de unicidade na coluna `email`.

```sql
ALTER TABLE empresas ADD CONSTRAINT unique_email UNIQUE (email);
```

## Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).

Esse `README.md` cobre os detalhes essenciais, incluindo a instalação, configuração e uso da aplicação, além de algumas considerações extras para melhorar o funcionamento.