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
const oauth2_1 = __importDefault(require("@fastify/oauth2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, fastify_1.default)({ logger: true });
app.googleOAuth2 = null;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
app.register(cors_1.default);
if (!app.hasDecorator('googleOAuth2')) {
    app.register(oauth2_1.default, {
        name: 'googleOAuth2',
        scope: ['profile', 'email'],
        credentials: {
            client: {
                id: process.env.CLIENT_ID,
                secret: process.env.CLIENT_SECRET
            },
            auth: oauth2_1.default.GOOGLE_CONFIGURATION
        },
        startRedirectPath: '/login/google',
        callbackUri: 'http://localhost:4000/login/google/callback'
    });
}
app.get('/login/google/callback', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    reply.send({ token });
}));
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
