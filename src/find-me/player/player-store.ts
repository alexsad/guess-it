import {EventEmitter} from "event-emitter-lite";
import {IDashCard} from "../dash-card/i-dash-card";
import {IPlayer} from "./i-player";
import dashCardStore from "../dash-card/dash-card-store";

declare var io:any;

class PlayerStore {
	onChange: EventEmitter<any> = new EventEmitter();
	private players: IPlayer[];
	constructor(){
		//var socket = io();

		this.players = [];
		
		setTimeout(()=>{
			this.players = [
				{ id: 1,name:'',deck:[], color: "#ff0000", score: 10 }
				, { id: 2,name:'',deck:[] , color: "#99ff44", score: 5 }
				, { id: 3,name:'',deck:[], color: "#BABACA", score: 12 }
				, { id: 4,name:'',deck:[] , color: "#FAfA0A", score: 30 }
				, { id: 5,name:'',deck:[] , color: "#4499FF", score: 4 }
			];
			this.onChange.emit(null);
		},2000);
		
		//socket.emit('join', 'Guabiraba');
		/*
		socket.on('update-players',(players:IPlayer[])=>{
			this.players = players;
			console.log(players);
			this.onChange.emit(null);
			dashCardStore.set(players[0].deck);
		});
		*/

	}
	get():IPlayer[]{
		return this.players;
	}
}

export default new PlayerStore();
