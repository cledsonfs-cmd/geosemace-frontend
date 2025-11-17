# Etapa 1: Build do app com Vite
FROM node:18-alpine AS build

WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies para o build)
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Executa o build do Vite
RUN npm run build

# Etapa 2: Servir com Nginx (leve e rápido)
FROM nginx:alpine

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build gerado do Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração customizada (porta 3000 e fallback SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta 3000
EXPOSE 5000

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
