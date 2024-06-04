# Descripción

## Correr en dev
1. Clonar el repositorio
2. Crear una copia del archivo ```.env.template``` y renombrarlo a ```.env```
3. Cambiar las variables de entorno
4. Instalar dependencias ```npm install```
5. Levantar la base de datos ```docker compose up -d```
6. Correr las migraciones de prisma ```npx prisma migrate dev``
7. Ejecutar el seed ```npx run seed``
8. Correr el proyecto ```npm run dev```


## Correr en prod

## Comandos de prisma
https://www.prisma.io/docs/getting-started
```typescript
npm install prisma --save-dev
npx prisma init --datasource-provider PostgreSQL
npx prisma migrate dev --name init
```
