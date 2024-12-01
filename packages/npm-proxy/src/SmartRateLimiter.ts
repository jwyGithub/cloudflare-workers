// 智能限流相关的接口和类
interface SmartRateLimit {
    windowMs: number;
    maxRequests: number;
    burstLimit: number;
    concurrent: number;
    priority: number;
}

interface RequestQueue {
    queue: Array<{
        resolve: (value: boolean) => void;
        priority: number;
        timestamp: number;
    }>;
    processing: number;
}

class SmartRateLimiter {
    private limits: Map<string, SmartRateLimit>;
    private usage: Map<string, number>;
    private queues: Map<string, RequestQueue>;
    private lastCleanup: number;

    constructor() {
        this.limits = new Map();
        this.usage = new Map();
        this.queues = new Map();
        this.lastCleanup = Date.now();

        // 设置默认限制
        this.setDefaultLimits();
    }

    private setDefaultLimits(): void {
        // npm install 相关操作
        this.setLimit('install', {
            windowMs: 60 * 1000,
            maxRequests: 1500, // 增加限制
            burstLimit: 300, // 允许更多突发请求
            concurrent: 50, // 增加并发数
            priority: 1
        });

        // 元数据请求
        this.setLimit('metadata', {
            windowMs: 60 * 1000,
            maxRequests: 600,
            burstLimit: 100,
            concurrent: 20,
            priority: 2
        });

        // 包下载
        this.setLimit('tarball', {
            windowMs: 60 * 1000,
            maxRequests: 1000,
            burstLimit: 200,
            concurrent: 30,
            priority: 3
        });

        // 写操作
        this.setLimit('write', {
            windowMs: 60 * 1000,
            maxRequests: 30,
            burstLimit: 10,
            concurrent: 5,
            priority: 4
        });
    }

    public setLimit(operation: string, limit: SmartRateLimit): void {
        this.limits.set(operation, limit);
    }

    private cleanup(): void {
        const now = Date.now();
        // 每5分钟清理一次
        if (now - this.lastCleanup < 5 * 60 * 1000) {
            return;
        }

        this.lastCleanup = now;

        // 清理过期的使用记录
        for (const [key, queue] of this.queues.entries()) {
            queue.queue = queue.queue.filter(item => now - item.timestamp < 60 * 1000);
            if (queue.queue.length === 0 && queue.processing === 0) {
                this.queues.delete(key);
            }
        }

        // 清理过期的使用计数
        for (const [key, count] of this.usage.entries()) {
            if (count === 0) {
                this.usage.delete(key);
            }
        }
    }

    async acquireToken(clientIp: string, operation: string, priority?: number): Promise<boolean> {
        this.cleanup();

        const limit = this.limits.get(operation);
        if (!limit) return true;

        const key = `${clientIp}:${operation}`;
        const currentUsage = this.usage.get(key) || 0;
        const queue = this.getOrCreateQueue(key);

        // 检查是否超过并发限制
        if (currentUsage >= limit.concurrent) {
            // 如果超过burst limit，直接拒绝
            if (queue.queue.length >= limit.burstLimit) {
                return false;
            }

            // 将请求加入队列
            return new Promise(resolve => {
                queue.queue.push({
                    resolve,
                    priority: priority || limit.priority,
                    timestamp: Date.now()
                });

                // 对队列进行优先级排序
                this.sortQueue(queue);
            });
        }

        // 更新使用计数
        this.usage.set(key, currentUsage + 1);
        queue.processing++;

        // 自动释放
        setTimeout(() => {
            this.releaseToken(key);
        }, limit.windowMs);

        return true;
    }

    private getOrCreateQueue(key: string): RequestQueue {
        let queue = this.queues.get(key);
        if (!queue) {
            queue = {
                queue: [],
                processing: 0
            };
            this.queues.set(key, queue);
        }
        return queue;
    }

    private sortQueue(queue: RequestQueue): void {
        queue.queue.sort((a, b) => {
            // 先按优先级排序
            if (a.priority !== b.priority) {
                return a.priority - b.priority;
            }
            // 同优先级按时间排序
            return a.timestamp - b.timestamp;
        });
    }

    private releaseToken(key: string): void {
        const queue = this.queues.get(key);
        if (!queue) return;

        queue.processing--;
        const currentUsage = this.usage.get(key) || 0;
        if (currentUsage > 0) {
            this.usage.set(key, currentUsage - 1);
        }

        // 处理队列中的下一个请求
        if (queue.queue.length > 0 && queue.processing < this.getLimitForKey(key).concurrent) {
            const next = queue.queue.shift();
            if (next) {
                queue.processing++;
                next.resolve(true);

                // 自动释放下一个令牌
                setTimeout(() => {
                    this.releaseToken(key);
                }, this.getLimitForKey(key).windowMs);
            }
        }
    }

    private getLimitForKey(key: string): SmartRateLimit {
        const operation = key.split(':')[1];
        return (
            this.limits.get(operation) || {
                windowMs: 60 * 1000,
                maxRequests: 100,
                burstLimit: 20,
                concurrent: 10,
                priority: 10
            }
        );
    }
}

export const smartRateLimiter = new SmartRateLimiter();
