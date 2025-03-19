import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyOauth2 from '@fastify/oauth2';
import dotenv from 'dotenv';
import { FastifyInstance } from 'fastify';

dotenv.config({ path: '../../.env' });
interface CustomFastifyInstance extends FastifyInstance {
    googleOAuth2: any;
}

const app = fastify({ logger: true }) as unknown as CustomFastifyInstance;
app.googleOAuth2 = null;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const googleClientId = process.env.GCLIENT_ID;
const googleClientSecret = process.env.CLIENT_SECRET;
const googleRedirectUri = process.env.RDIR_URI;
let loggedIn = false;
let access_token;

app.register(fastifyCors);

app.get('/api/oauth', (req, reply) => {
    console.log('OAuth request received');
    reply.redirect(`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=profile email`);
});

app.get('/api/callback', async (req, res) => {
    console.log("\n\n\n\n\n\n\n\nHandling callback ...\n\n\n\n\n\n\n");
    let code = (req.query as { code: string }).code;
    try {
        const response = await app.inject({
            method: 'POST',
            url: 'https://oauth2.googleapis.com/token',
            payload: {
                client_id: googleClientId,
                client_secret: googleClientSecret,
                redirect_uri: googleRedirectUri,
                code: code,
                grant_type: 'authorization_code'
            }
        });
        const responseBody = JSON.parse(response.body as string);
        access_token = responseBody.access_token;
        console.log(`Access token received`);
        // Redirigir a la página principal
        res.redirect('https://localhost:8443');
        loggedIn = true;
    } catch (error) {
        console.error('Error during callback handling:', error);
        res.send('An error occurred');
    }
});

app.get('/api/loggedin', (req, res) => {
    res.send({ loggedIn });
});




app.listen({ port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Backend is running on ${address}`);
});

console.log('Backend started');