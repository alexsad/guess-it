import {IDashCard} from "../dash-card/i-dash-card";

export interface IPlayer {
	id: number;
	name:string;
	color: string;
	score: number;
	deck:IDashCard[];
}
