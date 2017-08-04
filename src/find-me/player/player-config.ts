import {IPlayer} from "../interfaces/i-player";
import {IEventSubscribe} from "event-emitter-lite";
import {requestPlayerName} from "../actions/player";

export class PlayerConfig{
	private playerName:string;
	private hidden:boolean;
	private closeable:boolean;
	private refresh:Function;
	constructor(){
		this.closeable = false;
		console.log('ops');
	}
	private attached(){
		requestPlayerName.emit(this.playerName);
	}
	private save():void{
		if(this.playerName){
			requestPlayerName.emit(this.playerName);
			this.hidden = true;
			this.refresh();
		}		
	}
	private hide(){
		if(this.closeable){
			this.hidden = true;
			this.refresh();
		}
	}
}