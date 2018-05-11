import playerStore from '@/stores/player';
import {IPlayer} from '@/interfaces/i-player';

export class PlayerConfig{
	private playerName:string;
	private isHidden:boolean;
	private isCloseable:boolean;
	private refresh:Function;
	private save(){
		if(this.playerName){
			let tmpPlayer = playerStore.getState();
			tmpPlayer.name = this.playerName;
			playerStore.update(tmpPlayer);
			this.isHidden = true;
			this.refresh();
		}
	}
	private hide(){
		if(this.isCloseable){
			this.isHidden = true;
			this.refresh();
		}
	}
}