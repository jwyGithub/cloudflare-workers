export interface SingboxOutboundType {
    type?: string;
    tag: string;
    outbounds?: string[];
    [key: string]: any;
}

export interface SingboxType {
    outbounds?: SingboxOutboundType[];
    [key: string]: any;
}
