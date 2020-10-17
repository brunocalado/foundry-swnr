export class ValidatedDialog extends Dialog {
    constructor(dialogData, options) {
        super(dialogData, options);
        this.failCallback = dialogData.failCallback;
    }
    validate(button) {
        const innerHTML = this.element.find('.window-content').children();
        const elementsToCheck = Array.from(innerHTML.find('select,input,textarea'));
        const problems = [];
        const good = elementsToCheck.map(e => {
            const markedRequired = e.getAttribute('required') == null;
            const checkValid = e.checkValidity();
            const blankValue = e.value !== '';
            const elementGood = markedRequired || checkValid && blankValue;
            // TODO: add some basic error messages
            if (elementGood) {
                e.parentElement.classList.remove('failed-validation');
            }
            else {
                e.parentElement.classList.add('failed-validation');
            }
            return elementGood;
        }).reduce((e, n) => { return e && n; });
        return good;
    }
    submit(button) {
        if (this.validate(button)) {
            return super.submit(button);
        }
        else {
            this.failCallback(button);
        }
    }
}
//# sourceMappingURL=ValidatedDialog.js.map