import {EventEmitter} from "event-emitter-lite";
import {IPlayer} from "../interfaces/i-player";
import socket from "../web-socket/web-socket";

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
		return this.players;
	}
	public getById(idPlayer:string):IPlayer{
		let playerIndx:number = -1;
		this.get().some((player,indx)=>{
			if(player.id===idPlayer){
				playerIndx = indx;
				return true;
			}
			return false;
		});
		if(playerIndx < 0){
			return null;
		}
		return this.get()[playerIndx];
	}
}

export default new PlayerStore();
