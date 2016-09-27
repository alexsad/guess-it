import {EventEmitter} from "event-emitter-lite";
import {IDashCard} from "./i-dash-card";
import socket from "../web-socket/web-socket";
import {IPlayer} from "../player/i-player";
import playerDispatch from "../player/player-dispatch";
import {EPlayerStatus} from "../player/e-player"

class DashCardStore {
	public onChange: EventEmitter<any> = new EventEmitter();
	private dashCards: IDashCard[];
	constructor() {
		this.dashCards = [];
		/*
		socket.on('update',(player:IPlayer)=>{
			this.set(player.deck);
			playerDispatch.playerChange.emit(player);
			//console.log(player)
		});
		socket.on('allow-pick-bet',(bets:IDashCard[]) =>this.set(bets));		
		*/
		playerDispatch.playerChange.subscribe((player)=>{
			if (player.status !== EPlayerStatus.BETING && player.status !== EPlayerStatus.WATCHING_BET) {
				console.log("from player change!");
				console.log(player.deck);
				this.set(player.deck);
			}			
		});

		socket.on('cards-bet',(bets:IDashCard[]) =>{
			console.log("from cards-bet!");
			console.log(bets);
			this.set(bets)
		});		
		

		

	}
	public get(): IDashCard[] {
		return this.dashCards;
	}
	public set(cards:IDashCard[]):void{
		this.dashCards = cards.filter((card)=>{
			return (card && card.id!==null);
		});
		this.onChange.emit(null);
	}
}

export default new DashCardStore();
