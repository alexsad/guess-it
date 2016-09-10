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
	get player():IPlayer{
		let playerIndx:number = -1;
		this.players.every((player,indx)=>{
			if(player.id===this.idPlayerLogged){
				playerIndx = indx;
				return false;
			}
			return true;
		});
		if(playerIndx < 0){
			return {id:0,deck:[],name:"",score:0,color:"#FFFFFF"};
		}
		return this.players[playerIndx];
	}
	changePlayerName(name:string):void{
		if(name){
			let tmpplayer:IPlayer = this.player;
			tmpplayer.name = name;
			playerStore.changePlayer(tmpplayer);
		}
		(<any>this).refresh();
	}
}