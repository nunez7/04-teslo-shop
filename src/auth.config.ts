import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

const authRoutes = [
    '/checkout',
    '/checkout/address',
    '/profile',
    '/orders',
    '/orders/{id}',
    '/admin/*'
];

const routesLoged = [
    '/auth/login'
];

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthRouted = authRoutes.includes(nextUrl.pathname);

            //console.log(isAuthRouted);
            //Redirigimos a path / si ya esta logeado y va al login
            if(isLoggedIn && routesLoged.includes(nextUrl.pathname)){
                return Response.redirect(new URL('/', nextUrl));
            }
            //Lo sacamos si va a un sitio  que ocupa logeo y no esta logeado
            if(isAuthRouted && !isLoggedIn) return false;

            //Lo sacamos si es ruta admin y no es su rol
            if(nextUrl.pathname.startsWith('/admin') && auth?.user.role!= 'admin') return false;

            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({ session, token, user }) {
            //console.log({session, token, user});
            session.user = token.data as any;
            return session;
        },
    },
    providers: [

        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                //console.log({email, password});

                //Buscar el corre
                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase(), active: true } });
                if (!user) return null;

                //Comparar las contraseñas
                if (!bcryptjs.compareSync(password, user.password)) return null;

                //Regresar el usuario, menos su password
                const { password: _, ...rest } = user;
                return rest;
            },
        }),

    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);