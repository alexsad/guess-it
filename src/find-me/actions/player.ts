import {EventEmitter} from "event-emitter-lite";
import {IPlayer} from "../interfaces/i-player";

export const requestPlayerName = new EventEmitter<string>();
export const joinPlayer = new EventEmitter<IPlayer>();
export const disconnectPlayer = new EventEmitter<IPlayer>();
export const addPlayer = new EventEmitter<IPlayer>();

