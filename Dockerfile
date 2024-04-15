# Utilise une image Node.js
FROM node:18-alpine

# Crée un répertoire de travail
WORKDIR /app

# Copie le package.json et le pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installe PNPM globalement
RUN npm install -g pnpm

# Installe les dépendances avec PNPM
RUN pnpm install

# Copie le reste des fichiers de l'application
COPY . ./

# Génère le module @prisma/client
RUN pnpm dlx prisma generate

# Commande pour construire l'application
RUN pnpm build

# Commande pour démarrer l'application
CMD ["pnpm", "start"]