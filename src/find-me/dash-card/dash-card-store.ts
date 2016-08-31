import {EventEmitter} from "event-emitter-lite";
import {IDashCard} from "./i-dash-card";


class DashCardStore {
	onChange: EventEmitter<any> = new EventEmitter();
	private dashCards: IDashCard[];
	constructor() {
		this.dashCards = [];
		/*
		//setTimeout(() => {
			this.dashCards = [
				{ id: 1, url: "dist/find-me/dash-card/assets/img/card-1.jpg" }
				, { id: 2, url: "dist/find-me/dash-card/assets/img/card-2.jpg" }
				, { id: 3, url: "dist/find-me/dash-card/assets/img/card-3.jpg" }
				, { id: 4, url: "dist/find-me/dash-card/assets/img/card-4.jpg" }
				, { id: 5, url: "dist/find-me/dash-card/assets/img/card-5.jpg" }
				, { id: 6, url: "dist/find-me/dash-card/assets/img/card-6.jpg" }
			];
			this.onChange.emit(null);
		//}, 2000);
		*/
	}
	get(): IDashCard[] {
		return this.dashCards;
	}
	set(cards:IDashCard[]):void{
		this.dashCards = cards;
		this.onChange.emit(null);
	}
}

export default new DashCardStore();
