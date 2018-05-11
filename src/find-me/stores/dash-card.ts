import socket from '@/web-socket/web-socket';
import { Store } from 'v3rtigo';
import playerStore from '@/stores/player';
import { ICard } from '@/interfaces/i-card';
import { EPlayerStatus } from '@/interfaces/e-player';
import { IPlayer } from '@/interfaces/i-player';

class DashCardStore extends Store<ICard[]>{
	constructor() {
		super();
		this.state = [];
		playerStore.subscribe('state:changed', () => this.playerChangeHandler());
		socket.on('cards-bet', (bets: ICard[]) => this.cardsChangeHandler(bets));
	}
	private cardsChangeHandler(cards: ICard[]) {
		if (playerStore.getState().status === EPlayerStatus.BETING || playerStore.getState().status === EPlayerStatus.WATCHING_BET) {
			this.setDashCards(cards);
		}
	}
	private playerChangeHandler() {
		let { status, deck } = playerStore.getState();
		if (status !== EPlayerStatus.BETING && status !== EPlayerStatus.WATCHING_BET) {
			this.setDashCards(deck);
		}
	}
	private setDashCards(cards: ICard[]) {
		this.setState(cards.filter(card => card && card.id !== null));
	}
	public discardCard({ id }: ICard) {
		socket.emit('discard-card', playerStore.getState().id, id);
		this['emit']('card:discarded',id);
	}
	public changeCard({ card }: { card: ICard }) {
		//socket.emit(this.actionSubmit, playerStore.getState().id, this.id);
	}
	public pickCard({ id }: ICard) {
		socket.emit('pick-card', playerStore.getState().id, id);
	}
	public submitCard({ id }: ICard) {
		//socket.emit('pick-bet', playerStore.getState().id, id);
	}
}

export default new DashCardStore();
