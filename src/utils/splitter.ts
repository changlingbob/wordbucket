import { VARS } from '../manager';

export const findCommand = (
  input: string
): { commandChar: number; commandEnd: number } => {
  const re = new RegExp(
    `\\${VARS.COMMAND}\\${VARS.BRACE[0]}[^\\${VARS.BRACE[1]}]+?\\${VARS.BRACE[1]}`
  );
  const results = re.exec(input);

  if (results) {
    return {
      commandChar: input.indexOf(results[0]),
      commandEnd: input.indexOf(results[0]) + results[0].length,
    };
  }

  return { commandChar: -1, commandEnd: -1 };
};

export const splitString = (input: string, output: string[] = []): string[] => {
  const { commandChar, commandEnd } = findCommand(input);
  if (commandChar === -1) {
    output.push(input);

    return output;
  }

  output.push(input.slice(0, commandChar));
  output.push(input.slice(commandChar, commandEnd));

  return splitString(input.slice(commandEnd), output);
};
