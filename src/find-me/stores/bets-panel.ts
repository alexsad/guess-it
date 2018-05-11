import socket from '@/web-socket/web-socket';
import { IBet } from '@/interfaces/i-bet';
import { Store } from 'v3rtigo';

class BetsPanelStore extends Store<IBet[]>{
	constructor() {
		super();
		this.state = [];
		socket.on('bets-reveled',(bets:IBet[]) =>{
			this.setState(bets);
		});
	}
	public pickBet(idPlayer:string ,idCard: number) {
		socket.emit('pick-bet', idPlayer, idCard);
	}
}
export default new BetsPanelStore();