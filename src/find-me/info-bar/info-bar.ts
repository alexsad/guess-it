import playerStore from "../player/player-store";
import {IPlayer} from "../interfaces/i-player";
import playerDispatch from "../player/player-dispatch";
import playerInfo from "../player/player-info";

export class InfoBar{
	private playerWinner:IPlayer;
	constructor(){
		playerDispatch.playerChange.subscribe((player)=>{
			(<any>this).refresh();
		});
		playerDispatch.playerWinner.subscribe((playerWinner)=>{
			this.playerWinner = playerWinner;
			(<any>this).refresh();
		});
	}
	get players(): IPlayer[] {
		return playerStore.get();
	}
	get player():IPlayer{
		return playerInfo.player;
	}
	changePlayerName(name:string):void{
		if(name){
			let tmpplayer:IPlayer = this.player;
			tmpplayer.name = name;
			playerInfo.player = tmpplayer;
		}
		(<any>this).refresh();
	}
}