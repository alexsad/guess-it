import {ICard} from '../interfaces/i-card';
import {changeCard,pickCard,discardCard,submitCard} from '../actions/card';
import socket from '../web-socket/web-socket';
import {playerChange} from '../actions/player';
import {EPlayerStatus} from '../interfaces/e-player';
import {ECardStatus} from '../interfaces/e-card';
import playerInfo from '../player/player-info';

export class DashCard implements ICard{
	public id:number;
	public url:string;
	public status: ECardStatus;
	private allowSubmit:boolean;
	private actionSubmit:string;	
	private refresh:Function;
	constructor(){
		this.resetDefaults();

		changeCard.subscribe(({id,url})=>{
			this.id = id;
			this.url = url;
			(<any>this).refresh();
		});
		
		playerChange.subscribe(player => {
			if(player.status===EPlayerStatus.DISCARDING||player.status===EPlayerStatus.PICKING||player.status===EPlayerStatus.BETING){					
				let selectedAction: string = 'discard-card';					
				if(player.status === EPlayerStatus.PICKING){
					selectedAction = 'pick-card';
				}else if(player.status === EPlayerStatus.BETING){
					selectedAction = 'pick-bet';
				}
				//so executa o refresh em caso de mudanca de status.
				//console.log(`${this.actionSubmit} : ${selectedAction} : ${this.allowSubmit} `)
				if (this.actionSubmit !== selectedAction || !this.allowSubmit) {
					this.actionSubmit = selectedAction;
					this.allowSubmit = true;
					this.resetDefaults();
					this.refresh();
				}
			}
		});
	}
	private resetDefaults():void{
		this.id = -1;
		this.url = 'cards/default-card.jpg';
	}
	private submitCard():void{
		if(this.id > -1){
			this.allowSubmit=false;
			socket.emit(this.actionSubmit,playerInfo.player.id,this.id);
			if(this.actionSubmit==='pick-card'){
				pickCard.emit({
					id:this.id
					,url:this.url
					, status: ECardStatus.USED
				});
			} else if (this.actionSubmit === 'discard-card') {				
				discardCard.emit({
					id: this.id
					, url: this.url
					, status: ECardStatus.USED
				});				
			}
			submitCard.emit({
				id:this.id
				,url:this.url
				, status: ECardStatus.USED
			});
			this.resetDefaults();
			this.refresh();
		}
	}
}