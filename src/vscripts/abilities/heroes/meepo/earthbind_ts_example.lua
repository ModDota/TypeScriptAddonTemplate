--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 1,["6"] = 1,["7"] = 1,["8"] = 3,["9"] = 4,["10"] = 3,["11"] = 4,["12"] = 7,["13"] = 8,["14"] = 9,["15"] = 10,["16"] = 11,["17"] = 12,["20"] = 16,["21"] = 7,["22"] = 19,["23"] = 20,["24"] = 21,["26"] = 24,["27"] = 19,["28"] = 27,["29"] = 28,["30"] = 27,["31"] = 31,["32"] = 32,["33"] = 33,["34"] = 34,["35"] = 36,["36"] = 37,["37"] = 38,["38"] = 40,["39"] = 41,["40"] = 47,["41"] = 47,["42"] = 47,["43"] = 47,["44"] = 47,["45"] = 48,["46"] = 49,["47"] = 49,["48"] = 49,["49"] = 49,["50"] = 49,["51"] = 51,["52"] = 51,["53"] = 51,["54"] = 51,["55"] = 51,["56"] = 51,["57"] = 51,["58"] = 51,["59"] = 51,["60"] = 51,["61"] = 51,["62"] = 51,["63"] = 51,["64"] = 51,["65"] = 51,["66"] = 51,["67"] = 51,["68"] = 51,["69"] = 51,["70"] = 31,["71"] = 70,["72"] = 71,["73"] = 72,["74"] = 73,["75"] = 75,["76"] = 75,["77"] = 75,["78"] = 75,["79"] = 75,["80"] = 75,["81"] = 75,["82"] = 75,["83"] = 75,["84"] = 75,["85"] = 75,["86"] = 87,["87"] = 88,["88"] = 89,["90"] = 92,["91"] = 93,["92"] = 95,["93"] = 70,["94"] = 4,["96"] = 3,["98"] = 4});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local BaseAbility = ____dota_ts_adapter.BaseAbility
local registerAbility = ____dota_ts_adapter.registerAbility
____exports.meepo_earthbind_ts_example = __TS__Class()
local meepo_earthbind_ts_example = ____exports.meepo_earthbind_ts_example
meepo_earthbind_ts_example.name = "meepo_earthbind_ts_example"
__TS__ClassExtends(meepo_earthbind_ts_example, BaseAbility)
function meepo_earthbind_ts_example.prototype.GetCooldown(self)
    local cooldown = self:GetSpecialValueFor("cooldown")
    if IsServer() then
        local talent = self:GetCaster():FindAbilityByName("special_bonus_unique_meepo_3")
        if talent then
            cooldown = cooldown - talent:GetSpecialValueFor("value")
        end
    end
    return cooldown
end
function meepo_earthbind_ts_example.prototype.OnAbilityPhaseStart(self)
    if IsServer() then
        self:GetCaster():EmitSound("Hero_Meepo.Earthbind.Cast")
    end
    return true
end
function meepo_earthbind_ts_example.prototype.OnAbilityPhaseInterrupted(self)
    self:GetCaster():StopSound("Hero_Meepo.Earthbind.Cast")
end
function meepo_earthbind_ts_example.prototype.OnSpellStart(self)
    local caster = self:GetCaster()
    local point = self:GetCursorPosition()
    local projectileSpeed = self:GetSpecialValueFor("speed")
    local direction = (point - caster:GetAbsOrigin()):Normalized()
    direction.z = 0
    local distance = (point - caster:GetAbsOrigin()):Length()
    local radius = self:GetSpecialValueFor("radius")
    self.particle = ParticleManager:CreateParticle("particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", PATTACH_CUSTOMORIGIN, caster)
    ParticleManager:SetParticleControl(
        self.particle,
        0,
        caster:GetAbsOrigin()
    )
    ParticleManager:SetParticleControl(self.particle, 1, point)
    ParticleManager:SetParticleControl(
        self.particle,
        2,
        Vector(projectileSpeed, 0, 0)
    )
    ProjectileManager:CreateLinearProjectile(
        {
            Ability = self,
            EffectName = "",
            vSpawnOrigin = caster:GetAbsOrigin(),
            fDistance = distance,
            fStartRadius = radius,
            fEndRadius = radius,
            Source = caster,
            bHasFrontalCone = false,
            iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_NONE,
            iUnitTargetFlags = DOTA_UNIT_TARGET_FLAG_NONE,
            iUnitTargetType = DOTA_UNIT_TARGET_NONE,
            vVelocity = direction * projectileSpeed,
            bProvidesVision = true,
            iVisionRadius = radius,
            iVisionTeamNumber = caster:GetTeamNumber()
        }
    )
end
function meepo_earthbind_ts_example.prototype.OnProjectileHit(self, _target, location)
    local caster = self:GetCaster()
    local duration = self:GetSpecialValueFor("duration")
    local radius = self:GetSpecialValueFor("radius")
    local units = FindUnitsInRadius(
        caster:GetTeamNumber(),
        location,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        bit.bor(DOTA_UNIT_TARGET_BASIC, DOTA_UNIT_TARGET_HERO),
        DOTA_UNIT_TARGET_FLAG_NONE,
        0,
        false
    )
    for ____, unit in ipairs(units) do
        unit:AddNewModifier(caster, self, "modifier_meepo_earthbind", {duration = duration})
        unit:EmitSound("Hero_Meepo.Earthbind.Target")
    end
    ParticleManager:DestroyParticle(self.particle, false)
    ParticleManager:ReleaseParticleIndex(self.particle)
    return true
end
meepo_earthbind_ts_example = __TS__Decorate(
    {
        registerAbility(nil)
    },
    meepo_earthbind_ts_example
)
return ____exports
