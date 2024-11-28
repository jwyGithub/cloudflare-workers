export interface DownloadOptions {
    maxSize: number; // 最大文件大小（字节）
    timeout: number; // 请求超时时间（毫秒）
}

export interface DownloadProgress {
    type: 'progress';
    loaded: number;
    total: number;
    percent: number;
    speed: number; // 字节/秒
}

export interface DownloadComplete {
    type: 'complete';
    url: string;
    size: number;
    filename: string;
}

export interface DownloadError {
    type: 'error';
    code: number;
    message: string;
}

export type WebSocketMessage = DownloadProgress | DownloadComplete | DownloadError;
