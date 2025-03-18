import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyOauth2 from '@fastify/oauth2';
import dotenv from 'dotenv';
import { FastifyInstance } from 'fastify';

dotenv.config();
interface CustomFastifyInstance extends FastifyInstance {
    googleOAuth2: any;
}

const app = fastify({ logger: true }) as unknown as CustomFastifyInstance;
app.googleOAuth2 = null;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.register(fastifyCors);

if (!app.hasDecorator('googleOAuth2')) {
    app.register(fastifyOauth2, {
        name: 'googleOAuth2',
        scope: ['profile', 'email'],
        credentials: {
            client: {
                id: process.env.CLIENT_ID,
                secret: process.env.CLIENT_SECRET
            },
            auth: fastifyOauth2.GOOGLE_CONFIGURATION
        },
        startRedirectPath: '/login/google',
        callbackUri: 'http://localhost:4000/login/google/callback'
    } as any);
}

app.get('/login/google/callback', async (req, reply) => {
    const token = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    reply.send({ token });
});

app.get('/api/oauth', (req, reply) => {
    console.log('OAuth request received');
    reply.send({ message: 'OAuth request received' });
});

app.listen({ port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Backend is running on ${address}`);
});

console.log('Backend started');