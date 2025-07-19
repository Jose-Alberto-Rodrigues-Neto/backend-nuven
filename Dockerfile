# Use a imagem Node.js 18 Alpine
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /src

# Copie os arquivos de configuração do projeto
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm ci

# Copie o restante do código
COPY . .

# Exponha a porta (se necessário)
EXPOSE 8080

# Inicie a aplicação
CMD [ "npm", "run", "dev" ]