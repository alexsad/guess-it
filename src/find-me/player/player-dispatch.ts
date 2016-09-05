import {EventEmitter} from "event-emitter-lite";
import {IPlayer} from "./i-player";


class PlayerDispatch{
	playerChange:EventEmitter<IPlayer> = new EventEmitter();
}

export default new PlayerDispatch();