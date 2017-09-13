import playerInfo from "../player/player-info";
import socket from "../web-socket/web-socket";
import betsStore from "../stores/bets-panel-store";
import router from "ferrugemjs-router";
export class MainApp{
	constructor(){}
	private connectedCallback(){
		playerInfo.join();
		window.onfocus = () => {
			if (!socket.connected) {
				playerInfo.join();
			}			
		};
		betsStore.onChange.subscribe(() => {
			router({
				path:"/bets-panel"
				,timeout:1000
			});
		});
	}
}
