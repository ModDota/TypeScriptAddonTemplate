import { luaModifier } from "../lib/dota_ts_adapter";

// Base speed modifier -- Could be moved to a separate file
class Modifier_Speed extends CDOTA_Modifier_Lua {
    // Declare functions
    DeclareFunctions(): modifierfunction[] {
        return [modifierfunction.MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE];
    }

    GetModifierMoveSpeed_Absolute(): number {
        return 300;
    }
}

@luaModifier
class modifier_panic extends Modifier_Speed {
    // Set state
    CheckState(): Record<modifierstate, boolean> {
        return {
            [modifierstate.MODIFIER_STATE_COMMAND_RESTRICTED]: true,
        };
    }

    // Override speed given by Modifier_Speed
    GetModifierMoveSpeed_Absolute(): number {
        return 540;
    }

    // Run when modifier instance is created
    OnCreated(params: table): void {
        // Think every second
        this.StartIntervalThink(0.3);
    }

    // Called when intervalThink is triggered
    OnIntervalThink(): void {
        const parent = this.GetParent();

        parent.MoveToPosition((parent.GetAbsOrigin() + RandomVector(400)) as Vector);
    }
}
