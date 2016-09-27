import {IDashCard} from "../dash-card/i-dash-card";
import cardDispatch from "../dash-card/card-dispatch";
import dashCardStore from "../dash-card/dash-card-store";
import playerDispatch from "../player/player-dispatch";

export class ThumbnailCard{
	private lastPickedCard:number;
	constructor(){
		this.lastPickedCard = -1;
		dashCardStore.onChange.subscribe(()=>{
			(<any>this).refresh();
		});
		cardDispatch.pickCard.subscribe(({id})=>{
			this.lastPickedCard = id;
		});
		playerDispatch.playerChange.subscribe((playerLogged)=>{
			this.lastPickedCard = playerLogged.pickedCard||-1;
		});
		
	}
	private changeCard(p_id:number):void{
		//console.log(this.thumbnailsCard[indx]);
		let indxcard:number = 0;

		this.dashCardStore.every((card,indx)=>{
			if(card.id===p_id){
				indxcard = indx;
				return false;
			}
			return true;
		});

		cardDispatch.changeCard.emit(this.dashCardStore[indxcard]);
	}
	get dashCardStore(): IDashCard[] {
		return dashCardStore.get().filter(({id})=>id!==this.lastPickedCard);
		//return dashCardStore.get();
	}
}
