if (_G.reloadCache === undefined) {
    _G.reloadCache = {}
}

export function reloadable<T extends {new(...args: any[]): {}}>(constructor: T): T {
    const className = constructor.name;
    if (_G.reloadCache[className] === undefined) {
        _G.reloadCache[className] = constructor;
    }

    Object.assign(_G.reloadCache[className].prototype, constructor.prototype);
    return _G.reloadCache[className];
}

declare function getfenv(this: void, obj: any): {[key: string]: any};
declare function getmetatable(this: void, obj: object): object;

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
