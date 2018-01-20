import {ICard} from '../interfaces/i-card';
import {discardCard,changeCard} from '../actions/card';
import dashCardStore from '../stores/dash-card-store';

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
		discardCard.subscribe(({id}) => {
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
		
		changeCard.emit(this.dashCardStore[indxcard]);
		//this.lastPickedCard = p_id;
	}
	get dashCardStore(): ICard[] {
		let lastPickedCard: number = this.lastPickedCard || -1;//this.lastPickedCard
		//console.log(lastPickedCard);
		return dashCardStore.get().filter(({id}) => id !== lastPickedCard);
		//return dashCardStore.get();
	}
}
