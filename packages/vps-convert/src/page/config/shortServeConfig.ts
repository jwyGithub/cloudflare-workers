export function getShortServeConfig(env: Env): { label: string; value: string }[] {
    const shortServerArr = env.SHORT_SERVER?.split('\n').filter(Boolean) ?? [];
    return shortServerArr.reduce<{ label: string; value: string }[]>((acc, cur) => {
        acc.push({ label: cur, value: cur });
        return acc;
    }, []);
}
