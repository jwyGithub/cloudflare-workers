import type { ClashType, SingboxType } from '../../types';
import type { Confuse } from '../confuse';
import { ClashClient } from './client/clash';
import { SingboxClient } from './client/singbox';

export class Restore {
    constructor(private confuse: Confuse) {
        this.confuse = confuse;
    }

    public async getClashConfig(): Promise<ClashType> {
        const clashConfuseConfig = await this.confuse.getClashConfig();
        const clashClient = new ClashClient(clashConfuseConfig);
        return clashClient.getOriginConfig(this.confuse.vpsStore!);
    }

    public async getSingboxConfig(): Promise<SingboxType> {
        const singboxConfuseConfig = await this.confuse.getSingboxConfig();
        const singboxClient = new SingboxClient(singboxConfuseConfig);
        return singboxClient.getOriginConfig(this.confuse.vpsStore!);
    }
}
