import {IPlayer} from '../interfaces/i-player';
import {EPlayerStatus} from '../interfaces/e-player';
import Cookies = require('js-cookie');
import socket from '../web-socket/web-socket';
import {playerChange} from '../actions/player';
import playerStore from '../stores/player-store';
import {requestPlayerName,playerWinner} from '../actions/player';
import {IEventSubscribe} from 'event-emitter-lite';

class PlayerInfo{
	private _player:IPlayer;
	private subs:IEventSubscribe[];
	constructor(){
		this._player = {
			id: `${new Date().getTime()}`
			, name: ''
			, color: '#FFFFFA'
			, score: 0
			, deck: []
			, status: EPlayerStatus.WAITING
		};
		let idPlayerFromCookiew = Cookies.get('player-id');
		if (idPlayerFromCookiew) {
			this._player.id = idPlayerFromCookiew;
		}
		let playerName = Cookies.get('player-name');
		if(playerName){
			this._player.name = playerName;
		}
		socket.on('gameover',(winner:IPlayer)=> {
			playerWinner.emit(winner);
		});
		this.subs = [];
	}
	public join():void{
		if(!this.subs.length){
			this.subs.push(
				requestPlayerName.subscribe(playerName => {
					//emitindo novo nome do player
					this._player.name = playerName;
					Cookies.set('player-name',playerName);
					socket.emit('join', this._player.id, this._player.name);		
				})
				,playerStore.onChange.subscribe(() => {
					//recebendo novos dados do player
					this.player = playerStore.get().find(player => player.id === this._player.id);
					playerChange.emit(this.player);
				})
			);
		}
		socket.emit('join', this._player.id, this._player.name);
	}
	public get player():IPlayer{
		return playerStore
					.get()
					.find(player => player.id === this._player.id) 
					|| this._player;
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