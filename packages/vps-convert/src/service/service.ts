export class Service {
    #sub: string = '';

    setSub(sub: string): void {
        this.#sub = sub;
    }

    getSub(): string {
        return this.#sub;
    }
}
