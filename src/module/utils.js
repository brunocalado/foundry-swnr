export function calculateStats(stats) {
    for (const stat of Object.values(stats)) {
        stat.total = stat.base + stat.boost;
        const v = (stat.total - 10.5) / 3.5;
        stat.mod = Math.min(2, Math.max(-2, Math[v < 0 ? 'ceil' : "floor"](v))) + stat.bonus;
    }
}
export function limitConcurrency(fn) {
    let limited = false;
    return async function (...args) {
        if (limited) {
            return;
        }
        limited = true;
        const r = await fn.apply(this, args);
        limited = false;
        return r;
    };
}
export function initSkills(actor, skillSet) {
    const items = skills[skillSet].map(element => {
        const skillRoot = `swnr.skills.${skillSet}.${element}.`;
        return {
            type: 'skill',
            name: game.i18n.localize(skillRoot + 'name'),
            data: {
                rank: -1,
                pool: 'ask',
                description: game.i18n.localize(skillRoot + 'text'),
                source: 'Revised',
                dice: "2d6"
            }
        };
    });
    actor.createEmbeddedEntity("OwnedItem", items);
}
const skills = {
    'none': [],
    'spaceMagic': [
        'knowMagic',
        'useMagic',
        'sunblade',
        'fight'
    ],
    "classic": [
        "artist",
        "athletics",
        "bureaucracy",
        "business",
        "combat-energy",
        "combat-gunnery",
        "combat-primitive",
        "combat-projectile",
        "combat-psitech",
        "combat-unarmed",
        "computer",
        "culture-alien",
        "culture-criminal",
        "culture-spacer",
        "culture-traveller",
        "culture",
        "culture",
        "culture",
        "exosuit",
        "gambling",
        "history",
        "instructor",
        "language",
        "leadership",
        "navigation",
        "perception",
        "persuade",
        "profession",
        "religion",
        "science",
        "security",
        "stealth",
        "steward",
        "survival",
        "tactics",
        "tech-astronautic",
        "tech-maltech",
        "tech-medical",
        "tech-postech",
        "tech-pretech",
        "tech-psitech",
        "vehicle-air",
        "vehicle-grav",
        "vehicle-land",
        "vehicle-space",
        "vehicle-water"
    ],
    "revised": [
        "administer",
        "connect",
        "exert",
        "fix",
        "heal",
        "know",
        "lead",
        "notice",
        "perform",
        "pilot",
        "program",
        "punch",
        "shoot",
        "sneak",
        "stab",
        "survive",
        "talk",
        "trade",
        "work"
    ],
    "psionic": [
        "biopsionics",
        "metapsionics",
        "precognition",
        "telekinesis",
        "telepathy",
        "teleportation"
    ]
};
//# sourceMappingURL=utils.js.map