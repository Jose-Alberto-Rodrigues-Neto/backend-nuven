echo "Gerando Prisma Client..."
npx prisma generate

echo "Aplicando migrations..."
npx prisma migrate deploy

echo "Iniciando servidor..."
npm run dev
