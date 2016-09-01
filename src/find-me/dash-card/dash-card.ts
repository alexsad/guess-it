import {IDashCard} from "./i-dash-card";
import cardDispatch from "./card-dispatch";

export class DashCard implements IDashCard{
	public id:number;
	public url:string;
	constructor(){
		this.id = -1;
		this.url = "dist/find-me/dash-card/assets/img/default-card2.jpg";
		cardDispatch.changeCard.subscribe(({id,url})=>{
			this.id = id;
			this.url = url;
			(<any>this).refresh();
		});
	}
	private submitCard():void{
		cardDispatch.changeCard.emit({
			id:this.id
			,url:this.url
		});
	}
}