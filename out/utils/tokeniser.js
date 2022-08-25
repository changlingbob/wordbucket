import { VARS } from '../manager';
import { SUBTOKENS } from '../word';
export var checkFullToken = function (token) {
    return token[0] === VARS.COMMAND &&
        token[1] === VARS.BRACE[0] &&
        token.slice(-1) === VARS.BRACE[1];
};
export var checkSubToken = function (token) {
    return token[0] === VARS.COMMAND && SUBTOKENS.indexOf(token.slice(1)) > -1;
};
//# sourceMappingURL=tokeniser.js.map