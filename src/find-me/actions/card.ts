import {EventEmitter} from "event-emitter-lite";
import {ICard} from "../interfaces/i-card";

export const changeCard = new EventEmitter<ICard>();
export const submitCard = new EventEmitter<ICard>();
export const pickCard = new EventEmitter<ICard>();
export const discardCard = new EventEmitter<ICard>();