export class WebSocketHandler {
    private ws: WebSocket;
    private heartbeatInterval: number;
    private lastPong: number;

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.heartbeatInterval = 30000; // 30秒
        this.lastPong = Date.now();
        this.initialize();
    }

    private initialize(): void {
        this.startHeartbeat();
        this.sendConnected();
    }

    private startHeartbeat(): void {
        const intervalId = setInterval(() => {
            if (Date.now() - this.lastPong > this.heartbeatInterval * 2) {
                this.ws.close();
                clearInterval(intervalId);
                return;
            }

            this.sendHeartbeat();
        }, this.heartbeatInterval);

        this.ws.addEventListener('message', message => {
            const data = JSON.parse(message.data as string);
            if (data.type === 'pong') {
                this.lastPong = Date.now();
            }
        });
    }

    private sendHeartbeat(): void {
        this.sendMessage({
            type: 'heartbeat',
            timestamp: Date.now()
        });
    }

    private sendConnected(): void {
        this.sendMessage({
            type: 'connected',
            timestamp: Date.now()
        });
    }

    private sendMessage(message: any): void {
        this.ws.send(JSON.stringify(message));
    }
}
