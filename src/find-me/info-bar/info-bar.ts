import playerStore from "../stores/player-store";
import {IPlayer} from "../interfaces/i-player";
import {playerChange} from "../actions/player";
import playerInfo from "../player/player-info";
import {IEventSubscribe} from "event-emitter-lite";

export class InfoBar{
	private refresh:Function;
	private subs:IEventSubscribe[];
	constructor(){
		this.subs = [];
	}
	private connectedCallback(){
		this.subs.push(
			playerChange.subscribe( player => {
				this.refresh();
			})
		);	
	}
	private disconnectedCallback(){
		this.subs.forEach(sub => sub.cancel());
		this.subs.length = 0;
	}
	private get players(): IPlayer[] {
		return playerStore.get();
	}
	private get player():IPlayer{
		return playerInfo.player;
	}
}