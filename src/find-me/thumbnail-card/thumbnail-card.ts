import "./assets/thumbnail-card.css!";
import {IDashCard} from "../dash-card/i-dash-card";
import cardDispatch from "../dash-card/card-dispatch";

export class ThumbnailCard{
	private thumbnailsCard:IDashCard[];
	constructor(){
		this.thumbnailsCard = [
			{id:1,url:"dist/find-me/dash-card/assets/img/card-1.jpg"}
			,{id:2,url:"dist/find-me/dash-card/assets/img/card-2.jpg"}
			,{id:3,url:"dist/find-me/dash-card/assets/img/card-3.jpg"}
			,{id:4,url:"dist/find-me/dash-card/assets/img/card-4.jpg"}
			,{id:5,url:"dist/find-me/dash-card/assets/img/card-5.jpg"}
			,{id:6,url:"dist/find-me/dash-card/assets/img/card-6.jpg"}
		];
	}
	private changeCard(indx:number):void{
		//console.log(this.thumbnailsCard[indx]);
		cardDispatch.changeCard.emit(this.thumbnailsCard[indx]);
	}
}