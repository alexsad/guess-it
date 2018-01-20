import {EventEmitter} from 'event-emitter-lite';
import {IPlayer} from '../interfaces/i-player';
import socket from '../web-socket/web-socket';

class PlayerStore {
	public onChange: EventEmitter<any> = new EventEmitter();
	private players: IPlayer[];
	constructor(){
		this.players = [];		
		socket.on('update-all',(players:IPlayer[])=>{
			this.players = players;
			this.onChange.emit(null);
		});
	}
	public get():IPlayer[]{
		return this.players.concat([]);
	}
}

export default new PlayerStore();