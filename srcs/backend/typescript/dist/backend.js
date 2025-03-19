"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const websocket_1 = __importDefault(require("@fastify/websocket"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../../.env' });
const app = (0, fastify_1.default)({ logger: true });
app.googleOAuth2 = null;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const googleClientId = process.env.GCLIENT_ID;
const googleClientSecret = process.env.CLIENT_SECRET;
const googleRedirectUri = process.env.RDIR_URI;
let loggedIn = false;
let access_token;
app.register(cors_1.default, {
    origin: '*', // Permitir todas las conexiones (ajusta si es necesario)
});
app.register(websocket_1.default);
let clients = [];
app.get('/ws', { websocket: true }, (connection, req) => {
    console.log('Cliente conectado');
    clients.push(connection);
    connection.on('close', () => {
        console.log('Cliente desconectado');
        clients = clients.filter(c => c !== connection);
    });
});
app.get('/api/oauth', (req, reply) => {
    console.log('OAuth request received');
    reply.redirect(`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=profile email`);
});
app.get('/api/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n\n\n\n\n\n\n\nHandling callback ...\n\n\n\n\n\n\n");
    let code = req.query.code;
    try {
        const response = yield app.inject({
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
        const responseBody = JSON.parse(response.body);
        access_token = responseBody.access_token;
        console.log(`Access token received`);
        // Redirigir a la página principal
        res.redirect('https://localhost:8443');
        loggedIn = true;
        clients.forEach(client => client.socket.send(JSON.stringify(true)));
    }
    catch (error) {
        console.error('Error during callback handling:', error);
        res.send('An error occurred');
    }
}));
app.listen({ port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Backend is running on ${address}`);
});
console.log('Backend started');
