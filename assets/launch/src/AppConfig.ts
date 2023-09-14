export const AppConfig = {
    debug: {
        displayStats: false,
        notchInfo: {
            SafeInsetBottom: 93,
            hasCutout: true,
            cutoutHeight: 93,
        }
    },

    appID: "1032",

    appName: "266",

    channel: "iOSmain",

    version: "99.99.99",

    net: {
        token: "7fuvs9jdunnD6WQWrytP3WK0",
        ap: {
            url: "http://doomap.boyaa.com:30600/aplist/",
            ver: 4,
            list: [
                "wss://test-gw.266.com:443",
                "ws://192.168.203.42:9002"
            ],
            pingNum: 5,
            pingDelay: 460,
            pingInterval: 2000,
        },
        http: {
            url: "http://nodeport-test.oa.com:31475"
        }
    },
    sentry: {
        dsn: "http://e2f91b358272425587e424213380f694@sentry.266.com:9000/4"
    },
    service: {
        client_exception: {
            postURL: "http://nodeport-test.oa.com:31475/1032/mp.client.exception/Add"
        }
    },
}