import {IDashCard} from "../dash-card/i-dash-card";
import {EPlayerStatus} from "./e-player";

export interface IPlayer {
	id: string;
	name:string;
	color: string;
	score: number;
	status:EPlayerStatus;
	deck:IDashCard[];
	pickedCard?:number;
}
