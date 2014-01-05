( function() {

    /**
     * When obtaining a random unit, you pass a combination of these flags.
     *
     * For example, if you only want living ally units, pass
     * RandomUnitFlags.ALLY | RandomUnitFlags.ALIVE.
     */
    window.game.RandomUnitFlags = {
        ALLY: 1,
        FOE: 2,
        ALIVE: 4,
        DEAD: 8,
        BOSS: 16,

        // Note: there is no corresponding HAS_FULL_LIFE flag because we don't
        // foresee using it often, so any ability that does NOT specify
        // IS_MISSING_LIFE as a flag can target units regardless of their life.
        // Units that DO specify this flag can ONLY work on units who are not at
        // maximum (which means they could be at 0 life, so don't forget to
        // specify ALIVE if you don't want that).
        IS_MISSING_LIFE: 32
    };

    /**
     * Describes how the unit is going to use its abilities
     * @type {Object}
     */
    window.game.AbilityAI = {
        USE_ABILITY_0_WHENEVER_POSSIBLE: 'use ability 0 whenever possible',
        RANDOM: 'random',
        USE_REVIVE_IF_POSSIBLE: 'use revive if possible',
        USE_HEAL_IF_POSSIBLE: 'use heal if possible'
    };

    /**
     * Instructions on what to do when a unit gets hit
     * @type {Object}
     */
    window.game.ActionOnHit = {
        DO_DAMAGE: 'do damage',
        HEAL: 'heal',
        REVIVE: 'revive'
    };

    /**
     * Instructions on how to calculate damage or heal amounts that will be done 
     * to a target
     * @type {Object}
     */
    window.game.DamageFormula = {
        ATK_MINUS_DEF: 'atk minus def',
        REVIVE: 'revive',
        GET_HALF_OF_MISSING_LIFE: 'get half of missing life',
        USE_ATK_VALUE: 'use the value of atk',
    };

    /**
     * Types of abilities
     * @type {Object}
     */
    window.game.AbilityType = {
        ATTACK: 'attack',
        HEAL: 'heal',
        REVIVE: 'revive',
        BUFF: 'buff',
        DEBUFF: 'debuff',
        SUMMON: 'summon'
    };

    /**
     * Abilities for the units
     * Required properties:
     * id: Number - Unique identifier for the ability.
     * graphicIndex: Number - Index of the graphic that will be shown when this 
     *                        ability is used
     * type: game.AbilityType - Type of ability it is
     * allowedTargets: game.RandomUnitFlags - Valid targets of the ability
     * actionOnHit: game.ActionOnHit - Instructions on what to do if a target gets
     *                                 hit by this ability
     * damageformula: game.DamageFormula - Instructions on how to calculate damage 
     *                                     or heal amounts that will be done 
     * Optional properties:
     * relativeWeight: Number - Used to calculate the probability of using the ability
     * particleSystemOptions: Object - see ParticleSystem.js for full details.
     * explosionEffectID: game.AnimatedSpriteID. If specified, this animated 
     *     sprite will be produced when the projectile hits.
     * 
     * @type {Object}
     */
    window.game.Ability = {
        ATTACK: {
            id: 0,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        SKULL_THROW: {
            id: 1,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        SPIT_WEB: {
            id: 2,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        SCORPION_STING: {
            id: 3,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        SNAKE_VENOM: {
            id: 4,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        BRANCH_WHIP: {
            id: 5,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        BOULDER_DROP: {
            id: 6,
            graphicIndex: game.Graphic.SMALL_PURPLE_BUBBLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF,
            explosionEffectID: game.AnimatedSpriteID.PURPLE_BURST,
            particleSystemOptions: 
            {
                particleGradients: [game.PURPLE_GRADIENT]
            }
        },

        FLAME_THROWER: {
            id: 7,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        THROWING_KNIVES: {
            id: 8,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            explosionEffectID: game.AnimatedSpriteID.BLUE_SMOKE_CLOUD,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        FIREBALL: {
            id: 9,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            explosionEffectID: game.AnimatedSpriteID.YELLOW_BURST,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        BEARD_THROW: {
            id: 10,
            graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
            type: game.AbilityType.ATTACK,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        REVIVE: {
            id: 11,
            graphicIndex: game.Graphic.SMALL_YELLOW_STAR,
            type: game.AbilityType.REVIVE,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.ALLY | game.RandomUnitFlags.DEAD,
            actionOnHit: game.ActionOnHit.REVIVE,
            damageFormula: game.DamageFormula.REVIVE
        },

        SUMMON: {
            id: 12,
            graphicIndex: 1, // Blank graphic. Summon is special-cased to not have a projectile anyway.
            type: game.AbilityType.SUMMON,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.FOE | game.RandomUnitFlags.ALIVE,
            actionOnHit: game.ActionOnHit.DO_DAMAGE,
            damageFormula: game.DamageFormula.ATK_MINUS_DEF
        },

        HEAL: {
            id: 13,
            type: game.AbilityType.HEAL,
            graphicIndex: game.Graphic.MEDIUM_BLUE_CIRCLE_1,
            relativeWeight: 1000,
            allowedTargets: game.RandomUnitFlags.ALLY | game.RandomUnitFlags.ALIVE | game.RandomUnitFlags.IS_MISSING_LIFE,
            actionOnHit: game.ActionOnHit.HEAL,
            damageFormula: game.DamageFormula.USE_ATK_VALUE
        }

    };

    /**
     * This function ensures certain aspects of the abilities that were just
     * defined, e.g. that you didn't duplicate IDs. It is called immediately
     * after it is defined (it's an IIFE).
     */
    ( function verifyAllAbilityData() {
        // These are ability IDs that we've already encountered. We use this to
        // see if we've defined duplicates.
        var abilityIDs = [];

        // This function is only used for this IIFE, so I'll keep it in a
        // variable here.
        var displayUndefinedAbilityError = function(ability, undefinedAttribute) {
            if ( ability[undefinedAttribute] === undefined ) {
                console.log('ERROR: Ability "' + ability.name  + '" has "' + undefinedAttribute + '" undefined.');
            }
        };

        // These MUST be present in each ability.
        var necessaryProperties = ['type', 'graphicIndex', 'allowedTargets', 'actionOnHit', 'damageFormula'];

        for ( var key in game.Ability ) {
            var ability = game.Ability[key];
            var id = ability.id;

            // ID is necessary
            if ( id === undefined ) {
                game.util.debugDisplayText('Fatal error: there is an ability missing an ID!', 'abil id missing');
            }

            // Names aren't necessary or even expected, but we'll give them
            // names based on the key's name so that it's easier to debug
            // ability logic.
            if ( ability.name === undefined ) {
                if ( key.length > 1 ) {
                    // ATTACK --> Attack
                    game.Ability[key].name = key[0] + key.substring(1).toLowerCase();
                } else {
                    game.Ability[key].name = key;
                }
            }

            // Make sure they have all of the necessary properties.
            for (var i = 0; i < necessaryProperties.length; i++) {
                displayUndefinedAbilityError(ability, necessaryProperties[i]);
            };

            if ( abilityIDs.indexOf(id) != -1 ) {
                // Get the first ability with that ID
                console.log('Fatal error! You duplicated ability id #' + id);
                game.util.debugDisplayText('Check console log - duplicate ability ID detected.', 'abil dupe');
            }

            abilityIDs.push(id);
        }
    }());

}());
