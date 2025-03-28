import WebSocket from 'ws';
import { startGame, updateGameState } from './gameLogic.js';
import dotenv from 'dotenv';
import { randomInt } from 'crypto';

dotenv.config({ path: '../../.env' });
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export function startGame() {
    return {
      ball: { x: 400, y: 300, dx: getRandomNumberInRange(-5, 5), dy: getRandomNumberInRange(-5, 5) }, // Posición y dirección de la bola
      paddles: { 
        left: { y: 250 },                      // Posición paleta izquierda
        right: { y: 250 }                      // Posición paleta derecha
      },
      score: { left: 0, right: 0 }             // Marcador inicial
    };
  }


let gameState = startGame();

wss.on('connection', (ws) => {
  console.log('🎮 Nuevo jugador conectado');
  
  ws.send(JSON.stringify({ type: 'INIT', gameState }));

  ws.on('message', (message) => {
    const { type, data } = JSON.parse(message);

    if (type === 'MOVE') {
      gameState = updateGameState(gameState, data);
      broadcast(gameState);
    }
  });

  ws.on('close', () => console.log('🚪 Jugador desconectado'));
});

function broadcast(state) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'UPDATE', state }));
    }
  });
}

console.log(`🚀 Servidor WebSocket corriendo en puerto ${PORT}`);