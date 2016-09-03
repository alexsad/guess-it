declare var io:any;

interface ISocket{
	emit:(sign:string,value:any)=>void;
	on:(event:string,cb:(p:any)=>void)=>void;
}



var socket = io();


export default <ISocket>socket;