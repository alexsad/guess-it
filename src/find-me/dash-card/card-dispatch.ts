import {EventEmitter} from "event-emitter-lite";
import {IDashCard} from "../dash-card/i-dash-card";
import socket from "../web-socket/web-socket";


class CardDispatch{
	changeCard:EventEmitter<IDashCard> = new EventEmitter();
	submitCard:EventEmitter<IDashCard> = new EventEmitter();
	pickCard:EventEmitter<IDashCard> = new EventEmitter();
}

export default new CardDispatch();