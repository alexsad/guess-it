import Cookies = require('js-cookie');
import { EPlayerStatus } from '@/interfaces/e-player';
import { IPlayer } from '@/interfaces/i-player';
import socket from '@/web-socket/web-socket';
import { Store } from 'v3rtigo';

class PlayerStore extends Store<IPlayer>{
	constructor() {
		super();
		this.state = this.recoveryPlayerData();
	}
	public discoveryPlayer() {
		let idPlayerFromCookiew = Cookies.get('player-id');
		if (idPlayerFromCookiew) {
			return Promise.resolve(this.getState());
		}
		return Promise.reject('not found');
	}
	private recoveryPlayerData() {
		let tmpId = `${new Date().getTime()}`;
		let tmpPlay = this.getState() || {
			id: tmpId
			, name: `player-${tmpId}`
			, color: '#FFFFFA'
			, score: 0
			, deck: []
			, status: EPlayerStatus.WAITING
		};
		let idPlayerFromCookiew = Cookies.get('player-id');
		if (idPlayerFromCookiew) {
			tmpPlay.id = idPlayerFromCookiew;
		}
		let playerName = Cookies.get('player-name');
		if (playerName) {
			tmpPlay.name = playerName;
		}
		return tmpPlay;
	}
	public update({ id, name, status, score, color, deck }: IPlayer) {
		let tmpPlay = this.getState();
		tmpPlay.status = status;
		if (id) {
			Cookies.set('player-id', id);
			tmpPlay.id = id;
		}
		Cookies.set('player-name', name);
		if (name) {
			tmpPlay.name = name;
			socket.emit('rename-player', tmpPlay.id, tmpPlay.name);
		}
		tmpPlay.deck = deck || tmpPlay.deck || [];
		tmpPlay.score = score;
		tmpPlay.color = color;
		this.setState(tmpPlay);
	}
}

export default new PlayerStore();