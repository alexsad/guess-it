interface ISocket {
    emit: (sign: string, value: any) => void;
    on: (event: string, cb: (p: any) => void) => void;
}


declare module 'socket.io-client' {
    var io:()=> ISocket;
    export = io;
}