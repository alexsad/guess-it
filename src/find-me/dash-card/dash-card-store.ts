import {EventEmitter} from "event-emitter-lite";
import {IDashCard} from "./i-dash-card";
import socket from "../web-socket/web-socket";
import {IPlayer} from "../player/i-player";
import playerDispatch from "../player/player-dispatch";

class DashCardStore {
	onChange: EventEmitter<any> = new EventEmitter();
	private dashCards: IDashCard[];
	constructor() {
		this.dashCards = [];
		/*
		setTimeout(() => {
			this.dashCards = [
				{ id: 1, url: "cards/card-1.jpg" }
				, { id: 2, url: "cards/card-2.jpg" }
				, { id: 3, url: "cards/card-3.jpg" }
				, { id: 4, url: "cards/card-4.jpg" }
				, { id: 5, url: "cards/card-5.jpg" }
				, { id: 6, url: "cards/card-6.jpg" }
			];
			this.onChange.emit(null);
		}, 2000);
		*/

		socket.on('update',(player:IPlayer)=>{
			this.set(player.deck);
			playerDispatch.playerChange.emit(player);
			//console.log(player)
		});
		socket.on('allow-pick-bet',(bets:IDashCard[]) =>this.set(bets));		
	}
	get(): IDashCard[] {
		return this.dashCards;
	}
	set(cards:IDashCard[]):void{
		this.dashCards = cards.filter((card)=>{
			return (card && card.id!==null);
		});
		this.onChange.emit(null);
	}
}

export default new DashCardStore();
