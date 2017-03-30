import playerInfo from "../player/player-info";
import socket from "../web-socket/web-socket";
import betsStore from "../bets-panel/bets-panel-store";
import router from "ferrugemjs-router";
export class MainApp{
	constructor(){
		
	}
	attached(){
		playerInfo.join();
		window.onfocus = ()=>{
			if (!socket.connected) {
				console.log('reconected!!!');
				playerInfo.join();
			}			
		}
		betsStore.onChange.subscribe(()=>{
			router({
				path:"/bets-panel"
				,timeout:1000
			});
		});
	}
}