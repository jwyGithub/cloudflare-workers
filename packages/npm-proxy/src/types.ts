export interface LogEntry {
    timestamp: string;
    method: string;
    path: string;
    status: number;
    duration: number;
    ip: string;
}
