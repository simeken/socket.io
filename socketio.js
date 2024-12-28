const io = require('socket.io-client');

// Replace with your server URL
const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

// Log when successfully connected
socket.on('connect', () => {
    console.log('Connected to server');
    console.log('Socket ID:', socket.id);

    // Example: Emit a debug event
    socket.emit('debug', { message: 'Hello from client!' });
});

// Log when disconnected
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Listen for custom events
socket.on('message', (data) => {
    console.log('Received message:', data);
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

// Example: Send periodic ping messages for testing
setInterval(() => {
    if (socket.connected) {
        socket.emit('ping', { timestamp: Date.now() });
        console.log('Ping sent');
    }
}, 5000);
