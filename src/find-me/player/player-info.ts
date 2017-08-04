import {IPlayer} from "../interfaces/i-player";
import {EPlayerStatus} from "../interfaces/e-player";
import Cookies = require('js-cookie');
import socket from "../web-socket/web-socket";
import playerDispatch from "./player-dispatch";
import playerStore from "../player/player-store";
import {requestPlayerName} from "../actions/player";

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
		let idPlayerFromCookiew = Cookies.get('player-id');
		if (!idPlayerFromCookiew) {
			idPlayerFromCookiew = (new Date().getTime()) + "";
			Cookies.set('player-id', idPlayerFromCookiew);
			this._player.id = idPlayerFromCookiew;
		}
		let playerName = Cookies.get('player-name');
		if(playerName){
			this._player.name = playerName;
		}
	}
	public join():void{
		requestPlayerName.subscribe(playerName => {
			this._player.name = playerName;
			socket.emit('join', this._player.id, this._player.name);		
		});
		playerStore.onChange.subscribe(() => {
			this.player = playerStore.getById(this._player.id);
			playerDispatch.playerChange.emit(this.player);
		});
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
		Cookies.set('player-name',player.name);
		if(player.name !== this._player.name){
			this._player.name = player.name;
			socket.emit('rename-player', this._player.id, this._player.name);
		}
	}
}


export default new PlayerInfo();