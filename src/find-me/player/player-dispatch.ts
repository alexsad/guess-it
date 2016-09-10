import {EventEmitter} from "event-emitter-lite";
import {IPlayer} from "./i-player";
import socket from "../web-socket/web-socket";

class PlayerDispatch{
	playerChange:EventEmitter<IPlayer> = new EventEmitter();
	playerWinner:EventEmitter<IPlayer> = new EventEmitter();
	constructor(){
		socket.on('gameover',(winner:IPlayer)=> {
	        this.playerWinner.emit(winner);
	    });
	}
}

export default new PlayerDispatch();