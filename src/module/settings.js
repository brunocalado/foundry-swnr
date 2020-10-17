export const registerSettings = function () {
    // Register any custom system settings here
    game.settings.register("swnr", "useHomebrewLuckSave", {
        name: "swnr.settings.useHomebrewLuckSave",
        hint: "swnr.settings.useHomebrewLuckSaveHint",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: (setting) => { return; }
    });
};
//# sourceMappingURL=settings.js.map