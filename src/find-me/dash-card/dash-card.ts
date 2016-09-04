import {IDashCard} from "./i-dash-card";
import cardDispatch from "./card-dispatch";
import socket from "../web-socket/web-socket";

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
		
		socket.on('allow-pick-card',()=>{
			this.allowSubmit=true;
			this.actionSubmit='pick-card';
			(<any>this).refresh();
		});

		socket.on('allow-pick-bet',()=>{
			this.allowSubmit=true;
			this.actionSubmit='pick-bet';
			(<any>this).refresh();
		});
	}
	private resetDefaults():void{
		this.id = -1;
		this.url = "cards/default-card.jpg";
	}
	private submitCard():void{
		if(this.actionSubmit==="pick-card"){
			cardDispatch.pickCard.emit({
				id:this.id
				,url:this.url
			});
		}

		socket.emit(this.actionSubmit,this.id);
		this.allowSubmit=false;
		this.resetDefaults();
		(<any>this).refresh();
	}
}