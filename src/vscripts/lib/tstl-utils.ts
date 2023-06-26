const global = globalThis as typeof globalThis & { reloadCache: Record<string, any> };
if (global.reloadCache === undefined) {
    global.reloadCache = {};
}

export function reloadable<T extends { new (...args: any[]): {} }>(constructor: T, context: ClassDecoratorContext): T {
    const className = context.name;

    if (className === undefined) {
        throw "Cannot reload classes without names!";
    }

    if (global.reloadCache[className] === undefined) {
        global.reloadCache[className] = constructor;
    }

    Object.assign(global.reloadCache[className].prototype, constructor.prototype);
    return global.reloadCache[className];
}
