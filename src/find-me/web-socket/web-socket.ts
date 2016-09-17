import io = require('socket.io-client');

interface ISocket {
    emit: (sign: string, ...value:any[]) => void;
    on: (event: string, cb: (p: any) => void) => void;
}

var socket = io();

export default <ISocket>socket;