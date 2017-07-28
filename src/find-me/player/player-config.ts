import playerStore from "./player-store";
import {IPlayer} from "../interfaces/i-player";
import playerDispatch from "./player-dispatch";
import playerInfo from "./player-info";
import {IEventSubscribe} from "event-emitter-lite";

export class PlayerConfig{
	private name:string;
	private hidden:boolean;
	private closeable:boolean;
	private refresh:Function;
	constructor(){
		this.closeable = false;
	}
	private save():void{
		if(this.name){
			let tmpplayer:IPlayer = this.player;
			tmpplayer.name = this.name;
			playerInfo.player = tmpplayer;
			this.hidden = true;
			this.refresh();
		}		
	}
	private get player():IPlayer{
		return playerInfo.player;
	}
	private hide(){
		if(this.closeable){
			this.hidden = true;
			this.refresh();
		}
	}
}