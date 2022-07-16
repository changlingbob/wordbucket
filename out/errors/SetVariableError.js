export class SetVariableError extends Error {
    constructor(message, word) {
        super(message);
        this.name = 'SetVariableError';
        this.message = message || `Invalid variable setting encountered in ${word}`;
        this.word = word;
    }
}
//# sourceMappingURL=SetVariableError.js.map