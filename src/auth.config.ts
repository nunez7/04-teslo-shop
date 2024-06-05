import NextAuth,  {type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },
    providers: [

        Credentials({
            async authorize(credentials) {
              const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

                if(! parsedCredentials.success) return null;

                const {email, password} = parsedCredentials.data;

                //console.log({email, password});

                //Buscar el corre
                const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}});
                if(!user) return null;

                //Comparar las contraseñas
                if(!bcryptjs.compareSync(password, user.password)) return null;

                //Regresar el usuario, menos su password
                const {password: _, ...rest} = user;
                console.log({rest});
                return rest;
            },
          }),

    ]
};

export const {signIn, signOut, auth} = NextAuth (authConfig);