// server.js
import axios from 'axios';
import { serverName } from './serverName';

const server = axios.create({
    baseURL: serverName,
    timeout: 15000
});

export default server;

// serverName.js remains the same
