// common_socket.js
import React from "react";
import io from "socket.io-client";

console.log("in the common_socket.js")
const socket = io("http://localhost:5001/", {
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:3000/",
    },
});

socket.on('connect', () => {
    console.log('Connected to server mnmn');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server jkjk');
});

// Log incoming messages
socket.onAny((event, ...args) => {
    console.log(`Received message: ${event}`, ...args);
});

export default socket;
