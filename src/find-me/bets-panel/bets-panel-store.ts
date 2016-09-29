import {EventEmitter} from "event-emitter-lite";
import socket from "../web-socket/web-socket";
import {IBet} from "../interfaces/i-bet";

class BetsPanelStore {
	public onChange: EventEmitter<any> = new EventEmitter();
	private bets: IBet[];
	constructor() {
		this.bets = [];
		socket.on('bets-reveled',(bets:IBet[]) =>{
			this.bets=bets;
			this.onChange.emit(null);
		});		

	}
	public get(): IBet[] {
		return this.bets;
	}
}

export default new BetsPanelStore();
