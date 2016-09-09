interface CookieOptions {
    path?: string;
    domain?: string;
    expires?: any;
    secure?: boolean;
}

interface CookiesStatic {
    (key:string, value?:any, options?:CookieOptions): any;

    get(key:string): string;
    set(key:string, value:any, options?:CookieOptions): CookiesStatic;
    expire(key:string, options?:CookieOptions): CookiesStatic;

    defaults: CookieOptions;
    enabled: boolean;
}

declare module 'js-cookie' {
    var Cookies: CookiesStatic;
    export = Cookies;    
}