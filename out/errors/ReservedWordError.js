export class ReservedWordError extends Error {
    constructor(message, title) {
        super(message);
        this.name = 'ReservedWordError';
        this.message = message || 'Invalid bucket title!';
        this.title = title;
    }
}
//# sourceMappingURL=ReservedWordError.js.map