echo "Prisma migrate"
npx prisma migrate dev --name init-dev

echo "Gerando Prisma Client"
npx prisma generate

echo "Iniciando servidor"
npm run dev