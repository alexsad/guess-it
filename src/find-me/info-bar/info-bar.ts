import "./assets/info-bar.css!";

interface IPlayer{
	id:number;
	color:string;
	points:number;
}
export class InfoBar{
	private players:IPlayer[];

	constructor(){
		this.players = [];

		this.players = [
			{id:1,color:"#ff0000",points:10}
			,{id:2,color:"#99ff44",points:5}
			,{id:3,color:"#BABACA",points:12}
			,{id:4,color:"#FAfA0A",points:30}
			,{id:5,color:"#4499FF",points:4}

		];
	}
}