export class ProgressTransformer {
    private buffer: Uint8Array;

    constructor() {
        this.buffer = new Uint8Array(0);
    }

    transform(chunk: Uint8Array, controller: TransformStreamDefaultController): void {
        // 合并新的数据到缓冲区
        const newBuffer = new Uint8Array(this.buffer.length + chunk.length);
        newBuffer.set(this.buffer);
        newBuffer.set(chunk, this.buffer.length);
        this.buffer = newBuffer;

        // 尝试解析完整的JSON对象
        let start = 0;
        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i] === 10) {
                // 换行符
                try {
                    const line = this.buffer.slice(start, i);
                    const text = new TextDecoder().decode(line);
                    if (text.trim()) {
                        const data = JSON.parse(text);
                        // 处理进度信息
                        this.handleProgressData(data, controller);
                    }
                } catch {
                    // 如果不是有效的JSON，直接转发原始数据
                    controller.enqueue(this.buffer.slice(start, i));
                    controller.enqueue(new Uint8Array([10]));
                }
                start = i + 1;
            }
        }

        // 保留未处理的数据
        if (start < this.buffer.length) {
            this.buffer = this.buffer.slice(start);
        } else {
            this.buffer = new Uint8Array(0);
        }
    }

    flush(controller: TransformStreamDefaultController): void {
        // 处理剩余的数据
        if (this.buffer.length > 0) {
            try {
                const text = new TextDecoder().decode(this.buffer);
                if (text.trim()) {
                    const data = JSON.parse(text);
                    // 处理最后的进度信息
                    this.handleProgressData(data, controller);
                }
            } catch {
                // 如果不是有效的JSON，直接转发剩余数据
                if (this.buffer.length > 0) {
                    controller.enqueue(this.buffer);
                    controller.enqueue(new Uint8Array([10]));
                }
            }
        }
    }

    private handleProgressData(data: any, controller: TransformStreamDefaultController): void {
        // 处理不同类型的进度信息
        if (data.type === 'progress') {
            // 处理进度条信息
            const progressMessage = this.formatProgressMessage(data);
            controller.enqueue(new TextEncoder().encode(`${progressMessage}\n`));
        } else if (data.type === 'status') {
            // 处理状态信息
            const statusMessage = this.formatStatusMessage(data);
            controller.enqueue(new TextEncoder().encode(`${statusMessage}\n`));
        } else if (data.type === 'error') {
            // 处理错误信息
            const errorMessage = this.formatErrorMessage(data);
            controller.enqueue(new TextEncoder().encode(`${errorMessage}\n`));
        } else {
            // 对于其他类型的消息，直接转发
            controller.enqueue(new TextEncoder().encode(`${JSON.stringify(data)}\n`));
        }
    }

    private formatProgressMessage(data: any): string {
        if (!data.data) return '';

        const { name, completed, total } = data.data;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        // 创建进度条
        const progressWidth = 20;
        const filledWidth = Math.round((percent / 100) * progressWidth);
        const emptyWidth = progressWidth - filledWidth;
        const progressBar = `[${'='.repeat(filledWidth)}${' '.repeat(emptyWidth)}]`;

        return `${name} ${progressBar} ${percent}% (${completed}/${total})`;
    }

    private formatStatusMessage(data: any): string {
        if (!data.data) return '';

        const { status, name } = data.data;
        return `${status}: ${name}`;
    }

    private formatErrorMessage(data: any): string {
        if (!data.error) return '';

        return `Error: ${data.error.message || 'Unknown error'}`;
    }
}
