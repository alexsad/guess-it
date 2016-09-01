import {IDashCard} from "../dash-card/i-dash-card";
import cardDispatch from "../dash-card/card-dispatch";
import dashCardStore from "../dash-card/dash-card-store";

export class ThumbnailCard{
	constructor(){
		dashCardStore.onChange.subscribe(()=>{
			(<any>this).refresh();
		});
	}
	private changeCard(indx:number):void{
		//console.log(this.thumbnailsCard[indx]);
		cardDispatch.changeCard.emit(dashCardStore.get()[indx]);
	}
	get dashCardStore(): IDashCard[] {
		return dashCardStore.get();
	}
}