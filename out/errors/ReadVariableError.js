export class ReadVariableError extends Error {
    constructor(message, word) {
        super(message);
        this.name = 'ReadVariableError';
        this.message = message || `Invalid variable read encountered in ${word}`;
        this.word = word;
    }
}
//# sourceMappingURL=ReadVariableError.js.map