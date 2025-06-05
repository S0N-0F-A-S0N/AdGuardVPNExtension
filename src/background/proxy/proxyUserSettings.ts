import { browserApi } from '../browserApi';
import { SETTINGS_IDS } from '../../common/constants';

const STORAGE_KEY = 'proxy.user.settings';

interface ProxyUserSettings {
    [SETTINGS_IDS.PROXY_HOST]: string;
    [SETTINGS_IDS.PROXY_PORT]: number;
    [SETTINGS_IDS.PROXY_SCHEME]: string;
}

const defaults: ProxyUserSettings = {
    [SETTINGS_IDS.PROXY_HOST]: '',
    [SETTINGS_IDS.PROXY_PORT]: 443,
    [SETTINGS_IDS.PROXY_SCHEME]: 'https',
};

let cache: ProxyUserSettings = { ...defaults };

const init = async () => {
    try {
        const stored = await browserApi.storage.get<ProxyUserSettings>(STORAGE_KEY);
        if (stored) {
            cache = { ...cache, ...stored };
        }
    } catch (e) {
        // ignore
    }
};

const getProxyHost = () => cache[SETTINGS_IDS.PROXY_HOST];
const getProxyPort = () => cache[SETTINGS_IDS.PROXY_PORT];
const getProxyScheme = () => cache[SETTINGS_IDS.PROXY_SCHEME];

export const proxyUserSettings = {
    init,
    getProxyHost,
    getProxyPort,
    getProxyScheme,
};
