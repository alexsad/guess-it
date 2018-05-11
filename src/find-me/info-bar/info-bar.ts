import playerStore from '@/stores/player';
import playersStore from '@/stores/players';
import { IPlayer } from '@/interfaces/i-player';

export class InfoBar{
	private get players(){		
		return playersStore.getState();
	}
	private get player(){
		return playerStore.getState();
	}
}