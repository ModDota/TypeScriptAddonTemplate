import "./lib/timers";
import { GameMode } from "./GameMode";

declare function getfenv(this: void, obj: any): any;
Object.assign(getfenv(1), {
    Activate: GameMode.Activate,
    Precache: GameMode.Precache,
});

if (GameRules.Addon) {
    GameRules.Addon.Reload();
}
