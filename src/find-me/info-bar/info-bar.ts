import playerStore from "../player/player-store";
import {IPlayer} from "../interfaces/i-player";
import playerDispatch from "../player/player-dispatch";
import playerInfo from "../player/player-info";

export class InfoBar{
	private refresh:Function;
	constructor(){
		playerDispatch.playerChange.subscribe((player)=>{
			this.refresh();
		});
	}
	get players(): IPlayer[] {
		return playerStore.get();
	}
	get player():IPlayer{
		return playerInfo.player;
	}
}