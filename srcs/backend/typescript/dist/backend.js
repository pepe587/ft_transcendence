"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/api/message', (req, res) => {
    console.log('Request received');
    res.json({ message: 'Hello from the backend!' });
});
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});
console.log('Backend started');
