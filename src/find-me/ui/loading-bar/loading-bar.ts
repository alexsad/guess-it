export class LoadingBar{
	private isLoading:boolean;
	private refresh:Function;
	private set show(on:boolean){
		this.refresh({
			isLoading:on
		});
	}
	private detached(){
		this.refresh({
			isLoading:false
		}); 
	}
}