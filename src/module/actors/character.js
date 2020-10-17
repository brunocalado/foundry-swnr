import { calculateStats } from "../utils";
export default class SWNRCharacterActor extends Actor {
    // data: 
    prepareData() {
        super.prepareData();
        if (this.data.type == "character")
            this._prepareCharacterData(this.data.data);
    }
    getRollData() {
        const data = super.getRollData();
        data.itemTypes = this.itemTypes;
        return data;
    }
    initialize() {
        super.initialize();
    }
    _prepareCharacterData(data) {
        calculateStats(data.stats);
        data.systemStrain.max = data.stats.con.base + data.stats.con.boost - data.systemStrain.permanent;
        if (!data.save)
            data.save = {};
        const save = data.save;
        const base = 16 - data.level.value;
        save.physical = Math.max(1, base - Math.max(data.stats.str.mod, data.stats.con.mod));
        save.evasion = Math.max(1, base - Math.max(data.stats.dex.mod, data.stats.int.mod));
        save.mental = Math.max(1, base - Math.max(data.stats.wis.mod, data.stats.cha.mod));
        save.luck = Math.max(1, base);
        if (this.items == null)
            return;
        // AC
        const armor = (this.items.filter(i => i.type === "armor" && i.data.data.use));
        const shields = armor.filter(i => i.data.data.shield);
        const baseAc = Math.max(data.baseAc, ...armor.map(i => i.data.data.ac + ((shields.filter(s => s.id !== i.id).length !== 0) ? 1 : 0)));
        data.ac = baseAc + data.stats.dex.mod;
        // effort
        const psychicSkills = (this.items.filter(i => i.type === "skill" && i.data.data.source === "psychic"));
        const effort = data.effort;
        effort.max = Math.max(1, 1 + Math.max(data.stats.con.mod, data.stats.wis.mod) +
            Math.max(0, ...psychicSkills.map(i => i.data.data.rank))) + effort.bonus;
        effort.value = effort.max - effort.current - effort.scene - effort.day;
        //encumbrance
        if (!data.encumbrance)
            data.encumbrance = { ready: { max: 0, value: 0 }, stowed: { max: 0, value: 0 } };
        const encumbrance = data.encumbrance;
        encumbrance.ready.max = Math.floor(data.stats.str.total / 2);
        encumbrance.stowed.max = data.stats.str.total;
        const inventory = this.items.filter(i => i.type === 'item' || i.type === "weapon" || i.type === "armor");
        const itemInvCost = function (i) {
            let itemSize = 1;
            if (i.type === 'item') {
                const itemData = i.data.data;
                const bundle = itemData.bundle;
                itemSize = Math.ceil(itemData.quantity / (bundle.bundled ? bundle.amount : 1));
            }
            return itemSize * i.data.data.encumbrance;
        };
        encumbrance.ready.value = inventory.filter(i => i.data.data.location === "readied").map(itemInvCost).reduce((i, n) => i + n, 0);
        encumbrance.stowed.value = inventory.filter(i => i.data.data.location === "stowed").map(itemInvCost).reduce((i, n) => i + n, 0);
    }
}
// canvas.tokens.controlled[0].actor.update({ data: { effort: { bonus: 0, value: 0, scene: 0, day: 0 } } })
//# sourceMappingURL=character.js.map