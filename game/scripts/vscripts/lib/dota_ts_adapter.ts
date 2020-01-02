const global = globalThis as typeof globalThis & { reloadCache: Record<string, any> };
if (global.reloadCache === undefined) {
    global.reloadCache = {};
}

export function reloadable<T extends { new (...args: any[]): {} }>(constructor: T): T {
    const className = constructor.name;
    if (global.reloadCache[className] === undefined) {
        global.reloadCache[className] = constructor;
    }

    Object.assign(global.reloadCache[className].prototype, constructor.prototype);
    return global.reloadCache[className];
}

export function luaModifier<T extends typeof CDOTA_Modifier_Lua>(modifier: T): T {
    const instance: any = {};
    let prototype = modifier.prototype as any;
    while (prototype) {
        for (const key in prototype) {
            if (instance[key] === undefined) {
                instance[key] = prototype[key];
            }
        }
        prototype = getmetatable(prototype);
    }
    getfenv(1)[modifier.name] = instance;
    return instance;
}

export function luaAbility<T extends typeof CDOTA_Ability_Lua>(ability: T): T {
    const instance: any = {};
    let prototype = ability.prototype as any;
    while (prototype) {
        for (const key in prototype) {
            if (instance[key] === undefined) {
                instance[key] = prototype[key];
            }
        }
        prototype = getmetatable(prototype);
    }
    getfenv(1)[ability.name] = instance;
    return instance;
}
