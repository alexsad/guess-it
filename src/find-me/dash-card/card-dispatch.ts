import {EventEmitter} from "event-emitter-lite";
import {ICard} from "../interfaces/i-card";

class CardDispatch{
	changeCard: EventEmitter<ICard> = new EventEmitter();
	submitCard: EventEmitter<ICard> = new EventEmitter();
	pickCard: EventEmitter<ICard> = new EventEmitter();
	discardCard: EventEmitter<ICard> = new EventEmitter();
}

export default new CardDispatch();