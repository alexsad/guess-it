import {IDashCard} from "../dash-card/i-dash-card";
import cardDispatch from "../dash-card/card-dispatch";
import dashCardStore from "../dash-card/dash-card-store";

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
	}
	private changeCard(indx:number):void{
		//console.log(this.thumbnailsCard[indx]);
		cardDispatch.changeCard.emit(this.dashCardStore[indx]);
	}
	get dashCardStore(): IDashCard[] {
		return dashCardStore.get().filter(({id})=>id!==this.lastPickedCard);
		//return dashCardStore.get();
	}
}
