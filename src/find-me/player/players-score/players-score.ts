import playersStore from '@/stores/players';
import playerStore from '@/stores/player';
import {IPlayer} from '@/interfaces/i-player';

export class PlayersScore{
	private playerWinnerId: string;
	private get players(){
		return playersStore.getState();
	}
	private get player(){
		return playerStore.getState();
	}
	private get winner(){
		return playersStore.getState().find(play => play.id === this.playerWinnerId);
	}
}