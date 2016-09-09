import playerStore from "../player/player-store";
import {IPlayer} from "../player/i-player";
import playerDispatch from "../player/player-dispatch";

export class InfoBar{
	private idPlayerLogged:number=-1;
	constructor(){
		playerStore.onChange.subscribe(()=>{
			(<any>this).refresh();
		});
		playerDispatch.playerChange.subscribe((player)=>{
			this.idPlayerLogged = player.id;
			(<any>this).refresh();
		});
	}
	get players(): IPlayer[] {
		return playerStore.get();
	}
	getPlayerScore():number{
		let playerScore:number = 0;
		this.players.every((player)=>{
			if(player.id===this.idPlayerLogged){
				playerScore = player.score;
				return false;
			}
			return true;
		});
		return playerScore;
	}
}