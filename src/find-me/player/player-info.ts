import {IPlayer} from "../interfaces/i-player";
import {EPlayerStatus} from "../interfaces/e-player";
import Cookies = require('js-cookie');
import socket from "../web-socket/web-socket";
import playerDispatch from "./player-dispatch";
import playerStore from "../player/player-store";

class PlayerInfo{
	private _player:IPlayer;
	constructor(){
		this._player = {
			id: ""
			, name: ""
			, color: "#FFFFFA"
			, score: 0
			, deck: []
			, status: EPlayerStatus.WAITING
		};
	}

	public join():void{
		let idPlayerFromCookiew = Cookies.get('player-id');
		if (!idPlayerFromCookiew) {
			idPlayerFromCookiew = (new Date().getTime()) + "";
			Cookies.set('player-id', idPlayerFromCookiew);
		}
		let playerName: string = this.discoveryName();
		this._player.id = idPlayerFromCookiew;
		this._player.name = playerName;
		socket.emit('join', this._player.id, this._player.name);


		/*
		playerDispatch.playerChange.subscribe((player:IPlayer)=>{
			this.player = player;
		});
		*/

		playerStore.onChange.subscribe(() => {
			this.player = playerStore.getById(this._player.id);
			playerDispatch.playerChange.emit(this.player);
		});
	}

	private discoveryName():string{
	  let playerName = Cookies.get('player-name');
	  //if(!playerName){
	  	//playerName = prompt('digite seu nome!','');
	  	//playerName=playerName+'-'+new Date().getTime();
	  	//Cookies.set('player-name',playerName);
	  	//---/player-config
	  //}	  
      return playerName;
	}
	public get player():IPlayer{
		let playertmp:IPlayer = playerStore.getById(this._player.id);
		if(!playertmp){
			return this._player;
		}
		return playertmp;
	}
	public set player(player:IPlayer){
		this._player.status = player.status;
		if(player.id){
			Cookies.set('player-id', player.id);
			this._player.id = player.id;
		}
		/*
		if(player.status===EPlayerStatus.DISCARDING||player.status===EPlayerStatus.PICKING){
			console.log(player.deck);	
		}
		*/
		if(player.name !== this._player.name){
			Cookies.set('player-name',player.name);
			this._player.name = player.name;
			socket.emit('rename-player', this._player.id, this._player.name);
		}
	}
}


export default new PlayerInfo();