import {ICard} from "../interfaces/i-card";
import cardDispatch from "./card-dispatch";
import socket from "../web-socket/web-socket";
import playerDispatch from "../player/player-dispatch";
import {EPlayerStatus} from "../interfaces/e-player";
import {ECardStatus} from "../interfaces/e-card";
import playerInfo from "../player/player-info";

export class DashCard implements ICard{
	public id:number;
	public url:string;
	public status: ECardStatus;
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
				//console.log(`${this.actionSubmit} : ${selectedAction} : ${this.allowSubmit} `)
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
			this.allowSubmit=false;
			socket.emit(this.actionSubmit,playerInfo.player.id,this.id);
			if(this.actionSubmit==="pick-card"){
				cardDispatch.pickCard.emit({
					id:this.id
					,url:this.url
					, status: ECardStatus.USED
				});
			} else if (this.actionSubmit === "discard-card") {				
				cardDispatch.discardCard.emit({
					id: this.id
					, url: this.url
					, status: ECardStatus.USED
				});				
			}
			cardDispatch.submitCard.emit({
				id:this.id
				,url:this.url
				, status: ECardStatus.USED
			});
			this.resetDefaults();
			(<any>this).refresh();
		}
	}
}