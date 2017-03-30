import playerStore from "./player-store";
import {IPlayer} from "../interfaces/i-player";
import playerDispatch from "./player-dispatch";
import playerInfo from "./player-info";
import {IEventSubscribe} from "event-emitter-lite";

export class PlayersScore{
	private playerWinner:IPlayer;
	private subs:IEventSubscribe[];
	private refresh:Function;
	constructor(){
		this.subs = [];
	}
	get players(): IPlayer[] {
		return playerStore.get();
	}
	get player():IPlayer{
		return playerInfo.player;
	}
	attached(){
		this.subs.push(
			playerDispatch.playerChange.subscribe(player=>{
				this.refresh();
			})
		);
		this.subs.push(		
			playerDispatch.playerWinner.subscribe(playerWinner=>{
				this.playerWinner = playerWinner;
				this.refresh();
			})
		);	
	}
	detached(){
		this.subs.forEach(subi=>subi.cancel());
		this.subs = [];
		this.playerWinner = null;
	}
}