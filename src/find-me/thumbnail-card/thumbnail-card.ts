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
		/*
		cardDispatch.pickCard.subscribe(({id})=>{
			this.lastPickedCard = id;
		});

		playerDispatch.playerChange.subscribe((playerLogged)=>{
			this.lastPickedCard = playerLogged.pickedCard||-1;
		});
		*/
		cardDispatch.submitCard.subscribe(({id})=>{
			//console.log(id);
			this.lastPickedCard = id;
		});
	}
	private changeCard(p_id:number):void{
		//console.log(this.thumbnailsCard[indx]);
		let indxcard:number = 0;

		this.dashCardStore.some((card,indx)=>{
			if(card.id===p_id){
				indxcard = indx;
				return true;
			}
			return false;
		});
		
		cardDispatch.changeCard.emit(this.dashCardStore[indxcard]);
		//this.lastPickedCard = p_id;
	}
	get dashCardStore(): IDashCard[] {
		let lastPickedCard: number = this.lastPickedCard || -1;//this.lastPickedCard
		//console.log(lastPickedCard);
		return dashCardStore.get().filter(({id}) => id !== lastPickedCard);
		//return dashCardStore.get();
	}
}
