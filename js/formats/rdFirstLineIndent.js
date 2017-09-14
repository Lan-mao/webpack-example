import Parchment from 'parchment';

class RdFirstLineIndentAttributor extends Parchment.Attributor.Class {
    add(node, value) {
        if (value === '+1' || value === '-1') {
            let indent = this.value(node) || 0;
            value = (value === '+1' ? (indent + 1) : (indent - 1));
        }
        if (value === 0) {
            this.remove(node);
            return true;
        } else {
            return super.add(node, value);
        }
    }

    canAdd(node, value) {
        console.log("RdFirstLineIndentAttributor log..... canAdd");
        return super.canAdd(node, value) || super.canAdd(node, parseInt(value));
    }

    value(node) {
        console.log("RdFirstLineIndentAttributor log..... value");
        return parseInt(super.value(node)) || undefined;  // Don't return NaN
    }
}

let RdFirstLineIndentClass = new RdFirstLineIndentAttributor('rdFirstLineIndent', 'ql-first-line-indent', {
    scope: Parchment.Scope.BLOCK,
    whitelist: [2]
});

export { RdFirstLineIndentClass };
