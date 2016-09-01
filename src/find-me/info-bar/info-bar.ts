import playerStore from "../player/player-store";
import {IPlayer} from "../player/i-player";

export class InfoBar{
	constructor(){
		playerStore.onChange.subscribe(()=>{
			(<any>this).refresh();
		});
	}
	get players(): IPlayer[] {
		return playerStore.get();
	}
}