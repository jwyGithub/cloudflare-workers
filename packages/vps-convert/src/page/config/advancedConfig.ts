export function getAdvancedConfig(): { label: string; value: string }[] {
    return [
        { label: 'Emoji', value: 'emoji' },
        { label: 'Clash New Field', value: 'new_name' },
        { label: '启用 UDP', value: 'udp' },
        { label: '排序节点', value: 'sort' },
        { label: '启用TFO', value: 'tfo' }
    ];
}
