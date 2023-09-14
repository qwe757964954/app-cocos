export {};
declare global {
    type Properties<T> = { [P in keyof T]?: T[P] };
    interface Long {
        toNumber(): number;
    }
    namespace AppConfig {
        const debug: {
            displayStats: boolean,
            notchInfo: {
                SafeInsetBottom: number,
                SafeInsetLeft?: number,
                SafeInsetRight?: number,
                hasCutout: boolean,
                cutoutHeight: number,
            }
        };
        const appID: string;
        const appName: string;
        const channel: string;
        const version: string;
        const net: {
            token: string;
            ap: {
                url: string;
                ver: number;
                list: string[];
            };
            http: {
                url: string;
            };
            spaceName: string;
            pingNum: number;
            pingDelay: number;
            pingInterval: number;
        };
        const sentry: {
            dsn: string;
        };
        const service: {
            client_exception: {
                postURL: string;
            };
        };
    }
}
