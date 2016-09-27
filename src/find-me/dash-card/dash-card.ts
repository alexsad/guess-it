import {IDashCard} from "./i-dash-card";
import cardDispatch from "./card-dispatch";
import socket from "../web-socket/web-socket";
import playerDispatch from "../player/player-dispatch";
import {EPlayerStatus} from "../player/e-player";

export class DashCard implements IDashCard{
	public id:number;
	public idPlayer:string;
	public url:string;
	private allowSubmit:boolean;
	private actionSubmit:string;	

	constructor(){
		this.resetDefaults();

		cardDispatch.changeCard.subscribe(({id,url})=>{
			this.id = id;
			this.url = url;
			(<any>this).refresh();
		});
		
		playerDispatch.playerChange.subscribe((player)=>{
			if(player.status===EPlayerStatus.DISCARDING||player.status===EPlayerStatus.PICKING||player.status===EPlayerStatus.BETING){
				this.allowSubmit=true;
				this.actionSubmit='discard-card';
				if(player.status===EPlayerStatus.PICKING){
					this.actionSubmit='pick-card';
				}else if(player.status===EPlayerStatus.BETING){
					this.actionSubmit='pick-bet';
				}
				this.idPlayer = player.id;
				this.resetDefaults();
				(<any>this).refresh();
			}
		});
	}
	private resetDefaults():void{
		this.id = -1;
		this.url = "cards/default-card.jpg";
	}
	private submitCard():void{
		if(this.id > -1){
			if(this.actionSubmit==="pick-card"){
				cardDispatch.pickCard.emit({
					id:this.id
					,url:this.url
				});
			}
			socket.emit(this.actionSubmit,this.idPlayer,this.id);
			this.allowSubmit=false;
			this.resetDefaults();
			(<any>this).refresh();
		}
	}
}