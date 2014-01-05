( function() {

    /**
     * Every possible item is in this array with a relative weight of 1.
     *
     * See setupLootClasses.
     * @type {Array:LootTableEntry}
     */
    var equalChanceAllLoot = [];

    /**
     * Every possible item is in this array, but usable items are given a much
     * higher weight than equippable items, meaning it should be rare to get
     * equippable items.
     *
     * See setupLootClasses.
     * @type {Array}
     */
    var higherChanceForUsableItems = [];

    /**
     * There are no items in this array.
     * 
     * See setupLootClasses.
     * @type {Array}
     */
    var noItems = [];

    /**
     * This function sets up loot "classes". It is called immediately after it
     * is defined (it's an IIFE).
     *
     * Loot "classes" are arrays of LootTableEntry objects. They are all
     * exclusive to this file and can be assigned to any unit.
     *
     * Some will be unused and are only around for testing purposes should the
     * need ever arise.
     */
    ( function setupLootClasses() {
        for ( var key in game.ItemType ) {
            var item = game.ItemType[key];
            var highUsableWeight = item.usable ? 10 : 1;

            equalChanceAllLoot.push(new game.LootTableEntry(item.id, 1));
            higherChanceForUsableItems.push(new game.LootTableEntry(item.id, highUsableWeight));
        }
    }());

    var DEFAULT_UNIT_WIDTH = 1;
    var DEFAULT_UNIT_HEIGHT = 1;

    // Unit IDs are hard-coded instead of doing something like "id:
    // getNextAvailableID()" so that they don't change based on location in the
    // code, and also so that they don't change across game versions.
    //
    // If any of the following properties are ignored, a default will be used
    // when possible (see constants in this file). If not possible, you will get
    // a warning.
    //
    // Properties:
    //  id - Number - the unit's ID
    //  width - Number - the width, in tiles, of the unit
    //  height - Number - the height, in tiles, of the unit
    //  name - String - the name of the unit
    //  graphicIndexes - Array:Number - see Unit
    //  shadowGraphic - Number - a graphic index to draw for the shadow
    //  atk - Object containing the below:
    //      start - Number - the starting value for this stat
    //      minGrowth - Number - when this unit levels, this is the minimum value that will be added to the stat
    //      maxGrowth - Number - when this unit levels, this is the maximum value that will be added to the stat
    //  def - see atk
    //  life - see atk
    //  chanceToDropItem - Number - the chance to drop any item
    //  itemsDropped - Array:LootTableEntry
    //  abilities - Array:Object - abilities that this unit will have. You only 
    //      need to fill in the ID and any parameters you want to override. 
    //      For example, if you want the ATTACK ability but with a different 
    //      graphic, you can specify game.Ability.ATTACK.id and a graphicIndex.
    //      Default relativeWeight is 1000 and is set in AbilityManager.js.
    window.game.UnitType = {
        ORC: {
            id:0,
            graphicIndexes:[game.Graphic.ORC_FIGHTER],
            shadowGraphic: game.Graphic.MED_SHADOW_LOW,

            atk: {
                start: 10,
                minGrowth: 1,
                maxGrowth: 1
            },
            def: {
                start: 0,
                minGrowth: 1,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 5,
                maxGrowth: 10
            },

            abilities: [
                {
                    id: game.Ability.SKULL_THROW.id
                }
            ],
            
            chanceToDropItem: .1,
            itemsDropped: higherChanceForUsableItems
        },

        SPIDER: {
            id: 1,
            graphicIndexes:[game.Graphic.BLACK_SPIDER],
            shadowGraphic: game.Graphic.SMALL_SHADOW_LOW,

            atk: {
                start: 10,
                minGrowth: 1,
                maxGrowth: 1
            },
            def: {
                start: 0,
                minGrowth: 1,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 5,
                maxGrowth: 10
            },

            abilities: [
                {
                    id: game.Ability.SPIT_WEB.id
                }
            ],
            
            chanceToDropItem: .1,
            itemsDropped: higherChanceForUsableItems
        },

        SCORPION: {
            id: 2,
            graphicIndexes:[game.Graphic.GIANT_BLACK_SCORPION],

            atk: {
                start: 10,
                minGrowth: 1,
                maxGrowth: 1
            },
            def: {
                start: 0,
                minGrowth: 1,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 5,
                maxGrowth: 10
            },

            abilities: [
                {
                    id: game.Ability.SCORPION_STING.id
                },
                {
                    id: game.Ability.SUMMON.id,
                }
            ],

            abilityAI: game.AbilityAI.RANDOM,
            
            chanceToDropItem: .1,
            itemsDropped: higherChanceForUsableItems
        },

        SNAKE: {
            id: 3,
            graphicIndexes:[game.Graphic.COBRA],

            atk: {
                start: 10,
                minGrowth: 1,
                maxGrowth: 1
            },
            def: {
                start: 0,
                minGrowth: 1,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 5,
                maxGrowth: 10
            },

            abilities: [
                {
                    id: game.Ability.SNAKE_VENOM.id
                }
            ],
            
            chanceToDropItem: .1,
            itemsDropped: higherChanceForUsableItems
        },

        TREE: {
            id: 4,
            name:'Treant',
            graphicIndexes:[game.Graphic.TREANT],

            atk: {
                start: 10,
                minGrowth: 0,
                maxGrowth: 10
            },
            def: {
                start: 0,
                minGrowth: 0,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 100,
                maxGrowth: 200
            },

            abilities: [
                {
                    id: game.Ability.BRANCH_WHIP.id
                }
            ],
            
            chanceToDropItem: .1,
            itemsDropped: equalChanceAllLoot
        },

        WOLF: {
            id: 5,
            graphicIndexes:[game.Graphic.BLACK_WOLF],
            atk: {
                start: 10,
                minGrowth: 1,
                maxGrowth: 1
            },
            def: {
                start: 0,
                minGrowth: 1,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 5,
                maxGrowth: 10
            },

            abilities: [
                {
                    id: game.Ability.BOULDER_DROP.id
                }
            ],
            
            chanceToDropItem: .1,
            itemsDropped: higherChanceForUsableItems
        },

        DRAGON: {
            id: 6,
            graphicIndexes:[game.Graphic.GREEN_DRAGON],
            atk: {
                start: 10,
                minGrowth: 1,
                maxGrowth: 1
            },
            def: {
                start: 0,
                minGrowth: 1,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 5,
                maxGrowth: 10
            },

            abilities: [
                {
                    id: game.Ability.FLAME_THROWER.id
                }
            ],
            
            chanceToDropItem: .1,
            itemsDropped: higherChanceForUsableItems
        },

        PLAYER_ARCHER: {
            id: 7,
            name:'Archer',
            graphicIndexes:[game.Graphic.RANGER_M],
            shadowGraphic: game.Graphic.BIG_SHADOW_LOW,

            atk: {
                start: 30,
                minGrowth: 3,
                maxGrowth: 9
            },
            def: {
                start: 0,
                minGrowth: 0,
                maxGrowth: 3
            },
            life: {
                start: 100,
                minGrowth: 5,
                maxGrowth: 15
            },

            abilities: [
                {
                    id: game.Ability.ATTACK.id,
                    graphicIndex: game.Graphic.HORIZONTAL_NEEDLE,
                },
                {
                    id: game.Ability.SUMMON.id,
                    relativeWeight: 100,
                }
            ],
            
            chanceToDropItem: 0,
            itemsDropped: noItems
        },

        PLAYER_WARRIOR: {
            id: 8,
            name:'Warrior',
            graphicIndexes:[game.Graphic.KNIGHT_M],
            shadowGraphic: game.Graphic.BIG_SHADOW_LOW,

            atk: {
                start: 30,
                minGrowth: 3,
                maxGrowth: 9
            },
            def: {
                start: 0,
                minGrowth: 0,
                maxGrowth: 3
            },
            life: {
                start: 100,
                minGrowth: 5,
                maxGrowth: 15
            },

            abilities: [
                {
                    id: game.Ability.THROWING_KNIVES.id
                },
                {
                    id: game.Ability.REVIVE.id
                }
            ],

            abilityAI: game.AbilityAI.RANDOM,
            
            chanceToDropItem: 0,
            itemsDropped: noItems
        },

        PLAYER_WIZARD: {
            id: 9,
            name:'Wizard',
            graphicIndexes:[game.Graphic.WIZARD_M],
            shadowGraphic: game.Graphic.BIG_SHADOW_LOW,

            atk: {
                start: 30,
                minGrowth: 3,
                maxGrowth: 9
            },
            def: {
                start: 0,
                minGrowth: 0,
                maxGrowth: 3
            },
            life: {
                start: 100,
                minGrowth: 5,
                maxGrowth: 15
            },

            abilities: [
                {
                    id: game.Ability.FIREBALL.id
                },
                {
                    id: game.Ability.HEAL.id
                }
            ],

            abilityAI: game.AbilityAI.RANDOM,
            
            chanceToDropItem: 0,
            itemsDropped: noItems
        },

        NPC_OLD_MAN_WIZARD: {
            id: 10,
            name: 'Old Man Wizard',
            graphicIndexes:[game.Graphic.KING_1],

            atk: {
                start: 30,
                minGrowth: 3,
                maxGrowth: 9
            },
            def: {
                start: 0,
                minGrowth: 0,
                maxGrowth: 3
            },
            life: {
                start: 100,
                minGrowth: 5,
                maxGrowth: 15
            },
            
            chanceToDropItem: 0,
            itemsDropped: noItems
        },

        YETI: {
            id: 11,
            graphicIndexes:[game.Graphic.YETI],

            atk: {
                start: 10,
                minGrowth: 1,
                maxGrowth: 1
            },
            def: {
                start: 0,
                minGrowth: 1,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 5,
                maxGrowth: 10
            },
            
            chanceToDropItem: .1,
            itemsDropped: higherChanceForUsableItems
        },

        ICE_WATER_ELEMENTAL: {
            id: 12,
            graphicIndexes:[game.Graphic.ICE_WATER_ELEMENTAL],

            atk: {
                start: 10,
                minGrowth: 1,
                maxGrowth: 1
            },
            def: {
                start: 0,
                minGrowth: 1,
                maxGrowth: 1
            },
            life: {
                start: 50,
                minGrowth: 5,
                maxGrowth: 10
            },
            
            chanceToDropItem: .1,
            itemsDropped: higherChanceForUsableItems
        }
    };

    /**
     * Each class has 5 costumes (the default is specified in game.UnitType).
     * The classes are only 1x1, so we only need to specify an array of length 1
     * for each.
     * 
     * @type {Array:(Array:Number)}
     */
    window.game.EXTRA_ARCHER_COSTUMES = [game.UnitType.PLAYER_ARCHER.graphicIndexes, [game.Graphic.RANGER_F],[game.Graphic.HIGH_ELF_RANGER_F],[game.Graphic.DROW_RANGER],[game.Graphic.WOOD_ELF_RANGER_F]];
    window.game.EXTRA_WARRIOR_COSTUMES = [game.UnitType.PLAYER_WARRIOR.graphicIndexes, [game.Graphic.BERSERKER_M],[game.Graphic.PALADIN_M],[game.Graphic.KNIGHT_F],[game.Graphic.PALADIN_F]];
    window.game.EXTRA_WIZARD_COSTUMES = [game.UnitType.PLAYER_WIZARD.graphicIndexes, [game.Graphic.SHAMAN_F],[game.Graphic.SHAMAN_M],[game.Graphic.PRIEST_F],[game.Graphic.WIZARD_F]];

    /**
     * Gets unit data based on the ID passed in. 'level' is used to level up the
     * unit a certain number of times before returning the data.
     *
     * Final stats get stored in finalAtk, finalDef, and finalLife.
     * @param {Number} unitID - the ID of the unit
     * @param {Number} level  - the level to produce the unit at. If you omit
     * this or specify -1, you will simply get the unit data without final
     * stats.
     * @return {game.UnitType} the associated unit data
     */
    window.game.GetUnitDataFromID = function(unitID, level) {
        var unitData = null;
        for ( var key in game.UnitType ) {
            var unitDataTemplate = game.UnitType[key];
            if ( unitDataTemplate.id == unitID ) {
                unitData = unitDataTemplate;

                if ( level === undefined || level == -1) {
                    break;
                }

                // Store in different variables in case the caller still wants
                // to know the starting value or growth amounts.
                unitData.finalAtk = unitData.atk.start;
                unitData.finalDef = unitData.def.start;
                unitData.finalLife = unitData.life.start;

                // Level up the unit as many times as needed
                for (var i = 0; i < level - 1; i++) {
                    unitData.finalAtk += game.util.randomInteger(unitData.atk.minGrowth, unitData.atk.maxGrowth);
                    unitData.finalDef += game.util.randomInteger(unitData.def.minGrowth, unitData.def.maxGrowth);
                    unitData.finalLife += game.util.randomInteger(unitData.life.minGrowth, unitData.life.maxGrowth);
                };

                unitData.level = level;

                break;
            }
        }

        if ( unitData == null ) {
            console.log('Error - ' + unitID + ' is not a valid unit ID');
            if ( typeof(unitID) !== 'number' ) {
                // If you hit this, it's likely that you passed in the entire
                // unitData instead of just the ID.
                console.log('The above error happened because unitID isn\'t even a number.');
            }
        }

        return unitData;
    };

    /**
     * This function ensures you didn't define an unit ID twice, and it will
     * insert default values where necessary. It is called immediately after it
     * is defined (it's an IIFE).
     */
    ( function verifyAllUnitData() {
        var unitIDs = [];
        
        for ( var key in game.UnitType ) {
            var unitType = game.UnitType[key];

            // ID is necessary
            if ( unitType.id === undefined ) {
                game.util.debugDisplayText('Fatal error: there is a unitType missing an ID!', 'id missing');
            }

            // If you left off a name, form it based on the name of the key.
            if ( unitType.name === undefined ) {
                if ( key.length > 1 ) {
                    // ORC --> Orc
                    unitType.name = key[0] + key.substring(1).toLowerCase();
                } else {
                    unitType.name = key;
                }
            }

            // If absolutely no abilities are defined, give this unit an empty
            // array for abilities.
            if ( unitType.abilities === undefined ) {
                unitType.abilities = [];
            }

            // Makes sure that each unit type can attack. If the basic attack ability 
            // isn't present, add it to the ability list.
            var abilityIndex = game.AbilityManager.hasAbility(game.Ability.ATTACK.id, unitType.abilities);
            if ( abilityIndex == -1 ) {
                unitType.abilities.push( {id:game.Ability.ATTACK.id} );
            }
            
            // Now that it at least has ATTACK, fill in any missing ability
            // data.
            game.AbilityManager.setDefaultAbilityAttrIfUndefined(unitType.abilities);

            // If absolutely no ability AI is defined, give this unit a default 
            // one here.
            if ( unitType.abilityAI === undefined ) {
                unitType.abilityAI = game.AbilityAI.RANDOM;
            }

            if ( unitType.shadowGraphic === undefined ) {
                unitType.shadowGraphic = game.Graphic.MED_SHADOW_LOW;
            }

            game.util.useDefaultIfUndefined(unitType, 'width', DEFAULT_UNIT_WIDTH);
            game.util.useDefaultIfUndefined(unitType, 'height', DEFAULT_UNIT_HEIGHT);

            var id = unitType.id;
            if ( unitIDs.indexOf(id) != -1 ) {
                // Get the first unit with that ID
                var first = game.GetUnitDataFromID(id, 1);
                console.log('Fatal error! You duplicated a unit id (' + id + 
                    '). Duplicates: ' + first.name + ' and ' + unitType.name);

                game.util.debugDisplayText('Check console log - duplicate unit ID detected.', 'unit');
            }

            if ( unitType.chanceToDropItem > 0 && 
                (unitType.itemsDropped === undefined || unitType.itemsDropped.length == 0 ) ) {
                game.util.debugDisplayText('Fatal error: a unit has a chanceToDropItem but no itemsDropped! ID: ' + 
                    unitType.id, 'no items dropped' + unitType.id);
            }

            unitIDs.push(id);
        }
    }());

}());
