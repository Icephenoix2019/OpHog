( function() {

    /**
     * InventoryUI base-class constructor
     * The inventory UI keeps track of available items (equippable and usable),
     * but it also tracks the equipped items, so it's sort of like the inventory
     * for each character class too.
     */
    window.game.InventoryUI = function InventoryUI() {
        
        /**
         * Array of SlotUI objects. These should never be rearranged since they
         * are referred to by numerical index (slotUI.slotIndex).
         * @type {Array:SlotUI}
         */
        this.slots = [];

        /**
         * The currently selected slot.
         * @type {SlotUI}
         */
        this.selectedSlotUI = null;

        /**
         * Holds the id of the HTML tag for the item description. This
         * is a jQuery selector.
         * This is the item that you're using. If this is null, then you're not
         * in USE mode. It is set when you click "Use" so that you can still
         *
         * Ex) Let's say you have this div:
         * <div id="item-description"></div>
         *
         * This variable should be equal to $('#item-description')
         * @type {String}
         */
        this.$itemDescriptionID = "";

    };

    /**
     * This should be called whenever a Slot is added to the inventory.
     *
     * That way, the UI can make a new SlotUI to show it.
     * @param {Slot} slot - the slot to add
     */
    window.game.InventoryUI.prototype.addedSlot = function(slot) {};

    /**
     * Shows the inventory UI.
     */
    window.game.InventoryUI.prototype.show = function() {};

    /**
     * Hides the inventory UI.
     */
    window.game.InventoryUI.prototype.hide = function() {};

    /**
     * This is called when a slot's item is changed.
     * @param  {Number} slotIndex The index of the Slot/SlotUI that changed.
     */
    window.game.InventoryUI.prototype.updatedSlot = function(slotIndex) {
        // This is necessary because Slot sets an item before a corresponding
        // SlotUI even exists, so we need to make sure it's been added.
        if ( slotIndex >= this.slots.length ) return;

        // Update the slot UI
        this.slots[slotIndex].updateItem();
    };

    /**
     * Selects a slot. There can only be one selected slot.
     * @param {SlotUI} slotUI The slot to select
     */
    window.game.InventoryUI.prototype.clickedSlot = function(slotUI) {
        if ( this.selectedSlotUI != null ) {
            this.selectedSlotUI.deselectSlot();
        }
        this.selectedSlotUI = slotUI;
        slotUI.selectSlot();
    };

    /**
     * @return {SlotUI} the slot that was selected
     */
    window.game.InventoryUI.prototype.getSelectedSlot = function() {
        return this.selectedSlotUI;
    };

    /**
     * Updates the description based on which item is selected.
     * @return {null}
     */
    window.game.InventoryUI.prototype.updateDescription = function() {
        // Make a var here so I don't have to type 'this' all the time
        var selectedSlotUI = this.selectedSlotUI;
        if ( selectedSlotUI == null ) return;

        var slot = selectedSlotUI.slot;
        
        var item = slot.item;
        var desc = '<no description for this> - ' + 'Slot type: ' + slot.slotType + ' Item: ' + item;
        if (item == null) {
            desc = 'You don\'t have an item selected.';
        } else {
            desc = item.htmlDescription;
        }

        if (slot.isEquipSlot()) {
            this.$itemDescriptionID.attr('class', 'equip-slot');
        } else if (slot.isUsableSlot()) {
            this.$itemDescriptionID.attr('class', 'use-slot');
        }

        this.$itemDescriptionID.html(desc);
    };

}()); 