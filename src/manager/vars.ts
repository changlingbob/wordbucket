let COMMAND = '$';
let BRACE = ['{', '}'];

const setCommand = (command: string): void => {
  COMMAND = command;
};

const setBrace = (braces: string[]): void => {
  BRACE = braces;
};

export default {
  BRACE,
  COMMAND,
  setBrace,
  setCommand,
};
