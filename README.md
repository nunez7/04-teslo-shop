# Descripción

## Correr en dev
1. Clonar el repositorio
2. Crear una copia del archivo ```.env.template``` y renombrarlo a ```.env```
3. Cambiar las variables de entorno
4. Instalar dependencias ```npm install```
5. Levantar la base de datos ```docker compose up -d```
6. Correr las migraciones de prisma ```npx prisma migrate dev```
7. Ejecutar el seed ```npm run seed```
8. Correr el proyecto ```npm run dev```


## Deploy en Versel: https://vercel.com/
1. Crear cuenta en versel
2. Crear la DB en versel
3. Modificar el archivo .env con la conexión a DB de versel
4. Subir los cambios a rama master ó main
5. Subir la estructura de la DB ```npx prisma migrate deploy```
6. Subir la data ```npm run seed```

## Comandos de prisma
https://www.prisma.io/docs/getting-started
```typescript
npm install prisma --save-dev
npx prisma init --datasource-provider PostgreSQL
npx prisma migrate dev --name init
npx prisma generate
npx prisma migrate deploy
```
