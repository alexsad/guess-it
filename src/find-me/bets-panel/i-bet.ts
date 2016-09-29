import {IPlayer} from "../player/i-player";
import {IDashCard} from "../dash-card/i-dash-card";

export interface IBet{
	id:number;
	player:IPlayer;
	card:IDashCard;
	vitims:IPlayer[]
}