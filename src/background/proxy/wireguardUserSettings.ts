import { browserApi } from '../browserApi';
import { SETTINGS_IDS } from '../../common/constants';

const STORAGE_KEY = 'wireguard.user.settings';

interface WireguardUserSettings {
    [SETTINGS_IDS.WIREGUARD_HOST]: string;
    [SETTINGS_IDS.WIREGUARD_PORT]: number;
    [SETTINGS_IDS.WIREGUARD_PUBLIC_KEY]: string;
    [SETTINGS_IDS.WIREGUARD_PRIVATE_KEY]: string;
}

const defaults: WireguardUserSettings = {
    [SETTINGS_IDS.WIREGUARD_HOST]: '',
    [SETTINGS_IDS.WIREGUARD_PORT]: 51820,
    [SETTINGS_IDS.WIREGUARD_PUBLIC_KEY]: '',
    [SETTINGS_IDS.WIREGUARD_PRIVATE_KEY]: '',
};

let cache: WireguardUserSettings = { ...defaults };

const init = async () => {
    try {
        const stored = await browserApi.storage.get<WireguardUserSettings>(STORAGE_KEY);
        if (stored) {
            cache = { ...cache, ...stored };
        }
    } catch {
        // ignore
    }
};

const getWireguardHost = () => cache[SETTINGS_IDS.WIREGUARD_HOST];
const getWireguardPort = () => cache[SETTINGS_IDS.WIREGUARD_PORT];
const getWireguardPublicKey = () => cache[SETTINGS_IDS.WIREGUARD_PUBLIC_KEY];
const getWireguardPrivateKey = () => cache[SETTINGS_IDS.WIREGUARD_PRIVATE_KEY];

export const wireguardUserSettings = {
    init,
    getWireguardHost,
    getWireguardPort,
    getWireguardPublicKey,
    getWireguardPrivateKey,
};
