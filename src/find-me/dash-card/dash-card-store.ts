import {EventEmitter} from "event-emitter-lite";
import {ICard} from "../interfaces/i-card";
import socket from "../web-socket/web-socket";
import {IPlayer} from "../interfaces/i-player";
import playerDispatch from "../player/player-dispatch";
import {EPlayerStatus} from "../interfaces/e-player"
import playerInfo from "../player/player-info";

class DashCardStore {
	public onChange: EventEmitter<any> = new EventEmitter();
	private dashCards: ICard[];
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
				//console.log("from player change!");
				//console.log(player);
				this.set(player.deck);
			}			
		});

		socket.on('cards-bet',(bets:ICard[]) =>{
			//console.log("from cards-bet!");
			//console.log(bets);
			if (playerInfo.player.status === EPlayerStatus.BETING || playerInfo.player.status === EPlayerStatus.WATCHING_BET) {
				this.set(bets)
			}
		});		
		

		

	}
	public get(): ICard[] {
		return this.dashCards;
	}
	public set(cards:ICard[]):void{
		this.dashCards = cards.filter((card)=>{
			return (card && card.id!==null);
		});
		this.onChange.emit(null);
	}
}

export default new DashCardStore();
