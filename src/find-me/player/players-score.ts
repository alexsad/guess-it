import playerStore from '../stores/player-store';
import {IPlayer} from '../interfaces/i-player';
import {playerChange,playerWinner} from '../actions/player';
import playerInfo from './player-info';
import {IEventSubscribe} from 'event-emitter-lite';

export class PlayersScore{
	private playerWinner:IPlayer;
	private subs:IEventSubscribe[];
	private refresh:Function;
	constructor(){
		this.subs = [];
	}
	private get players(): IPlayer[] {
		return playerStore.get();
	}
	private get player():IPlayer{
		return playerInfo.player;
	}
	private connectedCallback(){
		this.subs.push(
			playerChange.subscribe(player => {
				this.refresh();
			})
		);
		this.subs.push(		
			playerWinner.subscribe(playerWinner => {
				this.playerWinner = playerWinner;
				this.refresh();
			})
		);	
	}
	private disconnectedCallback(){
		this.subs.forEach(subi=>subi.cancel());
		this.subs = [];
		this.playerWinner = null;
	}
}