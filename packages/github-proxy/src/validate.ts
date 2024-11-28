import { checkIp } from '@jiangweiye/cloudflare-shared';

export class ValidateIp {
    #ip_rules: string[] | string = [];

    constructor() {
        this.#ip_rules = [];
    }

    public setEnv(env: Env): void {
        if (this.#ip_rules.length || this.#ip_rules === '*') return;
        if (!Reflect.has(env, 'IP_WHITELIST')) return;
        const whitelist = Reflect.get(env, 'IP_WHITELIST') ?? '*';

        if (whitelist === '*') {
            this.#ip_rules = '*';
        } else {
            this.#ip_rules = whitelist.split(',').map(ip => ip.trim());
        }
    }

    public checkIpIsWhitelisted(request: Request): boolean {
        const ip = request.headers.get('x-real-ip') || '';
        if ((typeof this.#ip_rules === 'string' && this.#ip_rules) === '*') {
            return true;
        } else if (Array.isArray(this.#ip_rules) && this.#ip_rules.length === 0) {
            return true;
        } else if (Array.isArray(this.#ip_rules) && this.#ip_rules.length > 0) {
            return checkIp(ip, this.#ip_rules);
        } else {
            return false;
        }
    }
}
