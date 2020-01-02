import "./lib/timers";
import { GameMode } from "./GameMode";

Object.assign(getfenv(1), {
    Activate: GameMode.Activate,
    Precache: GameMode.Precache,
});

if (GameRules.Addon) {
    GameRules.Addon.Reload();
}
