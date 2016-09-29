import betsStore from "./bets-panel-store";
import {IBet} from "./i-bet";

export class BetsPanel{
	private visible:boolean;
	constructor(){
	}
	attached():void{
		betsStore.onChange.subscribe(()=>{
			this.visible = true;
			(<any>this).refresh();
		});
	}
	private get bets():IBet[]{
		return betsStore.get();
	}
}