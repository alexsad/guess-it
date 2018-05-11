import betsStore from '@/stores/bets-panel';
import {IBet} from '@/interfaces/i-bet';

export class BetsPanel{
	private hidden:boolean;
	private refresh:Function;
	constructor(){
	}
	private get bets():IBet[]{
		return betsStore.getState();
	}
}