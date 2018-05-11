import dashCardStore from '@/stores/dash-card';
import { ICard } from '@/interfaces/i-card';

export class ThumbnailCard {
	private lastPickedCard: number;
	constructor() {
		this.lastPickedCard = -1;
	}
	private discardCardHandler( id: number) {
		this.lastPickedCard = id;
	}
	private changeCard(p_id: number) {
		let card = dashCardStore.getState().find(dashCard => dashCard.id === p_id);
		if (card) {
			dashCardStore.dispatch({ type: 'changeCard', card });
		}
	}
	get dashCards() {
		return dashCardStore.getState().filter(card => card.id !== this.lastPickedCard);
	}
}
