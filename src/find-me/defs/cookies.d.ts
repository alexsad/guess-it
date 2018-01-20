interface ICookieOptions {
	path?: string;
	domain?: string;
	expires?: any;
	secure?: boolean;
}

interface ICookiesStatic {
	(key:string, value?:any, options?:ICookieOptions): any;

	get(key:string): string;
	set(key:string, value:any, options?:ICookieOptions): ICookiesStatic;
	expire(key:string, options?:ICookieOptions): ICookiesStatic;

	defaults: ICookieOptions;
	enabled: boolean;
}

declare module 'js-cookie' {
	var Cookies: ICookiesStatic;
	export = Cookies;    
}