import socket from '@/web-socket/web-socket';
import Cookies = require('js-cookie');
import { Store } from 'v3rtigo';
import { IPlayer } from '@/interfaces/i-player';
import playerStore from './player';

class PlayersStore extends Store<IPlayer[]>{
	constructor(){
		super();
		this.state = [];	
		socket.on('update-all',( players:IPlayer[] ) => {
			this.setState(players);
			let tmpPlayer = playerStore.getState();
			let lookedPlayer = this.getState().find(play => play.id === tmpPlayer.id);
			if(tmpPlayer && lookedPlayer){
				playerStore.update(lookedPlayer);
			}
		});
		socket.on('gameover',( winner:IPlayer ) => {
			this.dispatch({type:'setWinner', winner});
		});
	}
	public setWinner({winner}: {winner:IPlayer}){
		// do any thing with winner info
	}
	public join(player:IPlayer){
		Cookies.set('player-name', player.name);
		socket.emit('join', player.id, player.name);
	}
}

export default new PlayersStore();