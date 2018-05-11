import playerStore from '@/stores/player';
import dashCardStore from '@/stores/dash-card';
import betsPanelStore from '@/stores/bets-panel';
import { ICard } from '@/interfaces/i-card';
import { EPlayerStatus } from '@/interfaces/e-player';
import { ECardStatus } from '@/interfaces/e-card';

export class DashCard implements ICard {
	public id: number;
	public url: string;
	public status: ECardStatus;
	private isAllowSubmit:boolean;
	private actionSubmit: string;
	private refresh: Function;
	constructor() {
		this.resetDefaults();
	}
	private playerChangeHandler() {
		let { status } = playerStore.getState();
		if (status === EPlayerStatus.DISCARDING || status === EPlayerStatus.PICKING || status === EPlayerStatus.BETING) {
			let selectedAction = 'discard-card';
			if (status === EPlayerStatus.PICKING) {
				selectedAction = 'pick-card';
			} else if (status === EPlayerStatus.BETING) {
				selectedAction = 'pick-bet';
			}
			//so executa o refresh em caso de mudanca de status.
			if (this.actionSubmit !== selectedAction || !this.isAllowSubmit) {
				this.actionSubmit = selectedAction;
				this.isAllowSubmit = true;
				this.resetDefaults();
				this.refresh();
			}
		}
	}
	private cardChangeHandler({ card }: { card: ICard }) {
		this.id = card.id;
		this.url = card.url;
		this.refresh();
	}
	private resetDefaults() {
		this.id = -1;
		this.url = 'cards/default-card.jpg';
	}
	private submitCard() {
		if (this.id > -1) {
			this.isAllowSubmit = false;
			if (this.actionSubmit === 'pick-card') {
				dashCardStore.pickCard({
					id: this.id
					, url: this.url
					, status: ECardStatus.USED
				});
			} else if (this.actionSubmit === 'discard-card') {
				dashCardStore.discardCard({
					id: this.id
					, url: this.url
					, status: ECardStatus.USED
				});
			} else if (this.actionSubmit === 'pick-bet') {
				betsPanelStore.pickBet(playerStore.getState().id, this.id);
				dashCardStore.discardCard({
					id: this.id
					, url: this.url
					, status: ECardStatus.USED
				});
			}
			dashCardStore.submitCard({
				id: this.id
				, url: this.url
				, status: ECardStatus.USED
			});
			this.resetDefaults();
			this.refresh();
		}
	}
}