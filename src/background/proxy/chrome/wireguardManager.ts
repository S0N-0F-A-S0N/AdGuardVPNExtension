import { log } from '../../../common/logger';
import { wireguardUserSettings } from '../wireguardUserSettings';

export interface WireguardConfig {
    host: string;
    port: number;
    publicKey: string;
    privateKey: string;
}

class WireguardManager {
    async connect(config: WireguardConfig): Promise<void> {
        if (!config.host) {
            log.error('Wireguard host is not set');
            return;
        }
        log.info(`[wireguard] connect to ${config.host}:${config.port}`);
        // Placeholder for chrome.vpnProvider methods
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - chrome.vpnProvider might not exist in tests
            chrome.vpnProvider && chrome.vpnProvider.createConfig(config.host, () => {});
        } catch (e) {
            log.error('wireguard connect failed', e);
        }
    }

    async disconnect(): Promise<void> {
        log.info('[wireguard] disconnect');
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            chrome.vpnProvider && chrome.vpnProvider.destroyConfig('');
        } catch (e) {
            log.error('wireguard disconnect failed', e);
        }
    }

    getConfig(): WireguardConfig {
        return {
            host: wireguardUserSettings.getWireguardHost(),
            port: wireguardUserSettings.getWireguardPort(),
            publicKey: wireguardUserSettings.getWireguardPublicKey(),
            privateKey: wireguardUserSettings.getWireguardPrivateKey(),
        };
    }
}

export const wireguardManager = new WireguardManager();
