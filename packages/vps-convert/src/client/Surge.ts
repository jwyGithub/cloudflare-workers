import type { SurgeType } from '../types';
import { parse } from 'ini';

export class SurgeClient {
    #surgeConfig: SurgeType = '';

    constructor(configs: string[] = []) {
        const surgeConfigs = configs.map(config => parse(config));
        console.log('surgeConfigs', surgeConfigs);
    }

    get surgeConfig(): SurgeType {
        return this.#surgeConfig;
    }
}
