echo "Cria migrations folder"
mkdir -p prisma/migrations/0_init

echo "Roda migration diff"
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql

echo "Roda migration resolve"
npx prisma migrate resolve --applied 0_init

echo "Gerando Prisma Client..."
npx prisma generate

echo "Iniciando servidor..."
npx tsx src/app.ts