import {IDashCard} from "./i-dash-card";
import cardDispatch from "./card-dispatch";
import socket from "../web-socket/web-socket";
import playerDispatch from "../player/player-dispatch";
import {EPlayerStatus} from "../player/e-player";
import playerInfo from "../player/player-info";

export class DashCard implements IDashCard{
	public id:number;
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
				let selectedAction: string = 'discard-card';					
				if(player.status===EPlayerStatus.PICKING){
					selectedAction = 'pick-card';
				}else if(player.status===EPlayerStatus.BETING){
					selectedAction = 'pick-bet';
				};
				//so executa o refresh em caso de mudanca de status.
				if (this.actionSubmit !== selectedAction || !this.allowSubmit) {
					this.actionSubmit = selectedAction;
					this.allowSubmit = true;
					this.resetDefaults();
					(<any>this).refresh();
				};
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
			} else if (this.actionSubmit === "discard-card") {				
				cardDispatch.discardCard.emit({
					id: this.id
					, url: this.url
				});				
			}
			cardDispatch.submitCard.emit({
				id:this.id
				,url:this.url
			});
			socket.emit(this.actionSubmit,playerInfo.player.id,this.id);
			this.allowSubmit=false;
			this.resetDefaults();
			(<any>this).refresh();
		}
	}
}