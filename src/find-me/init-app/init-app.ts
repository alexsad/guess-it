import socket from '@/web-socket/web-socket';
import betsStore from '@/stores/bets-panel';
import router from 'ferrugemjs-router';
import playerStore from '@/stores/player';
import playersStore from '@/stores/players';
import { IPlayer } from '@/interfaces/i-player';
import { EPlayerStatus } from '@/interfaces/e-player';

export class MainApp{
	private attached(){
		playerStore
			.discoveryPlayer()
			.then(this.playerLoggedHandler)
			.catch(err => {
				let unsub = playerStore.subscribe('state:changed',() => {
					let tmpPlayer = playerStore.getState();
					if(tmpPlayer.status === EPlayerStatus.WAITING){
						unsub();
						this.playerLoggedHandler(tmpPlayer);
					}
				});		
				router({
					path:`/player-config/${playerStore.getState().name}`
					,timeout:700
				});
			});
	}
	private playerLoggedHandler(player:IPlayer){
		playerStore.subscribe('setWinner',({winner}:{ winner:IPlayer} ) => {
			console.dir({winner});
			router({
				path:`/players-score-winner/${winner.id}`
				,timeout:800
			});
		});
		playersStore.join(player);
		betsStore.subscribe('state:changed',() => {
			router({
				path:'/bets-panel'
				,timeout:800
			});
		});
		window.onfocus = () => {
			if (!socket.connected) {
				playersStore.join(player);
			}
		};
	}
}
