import playerInfo from "../player/player-info";
import socket from "../web-socket/web-socket";
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
	}
}