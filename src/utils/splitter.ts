import Manager from "../manager";

export const splitString = (input: string, output: string[] = []): string[] => {
  if (input.length === 0) {
    return output;
  }
  
  const commandChar = findCommand(input);
  output.push(input.slice(0, commandChar).trim());
  output.push()
  
  return splitString(input, output);
}

export const findCommand = (input: string): number => {
  const re = new RegExp(`${Manager.COMMAND}${Manager.BRACE[0]}[^${Manager.BRACE[1]}]${Manager.BRACE[1]}`);
  const results = re.exec(input);
  console.log(results);
  if (results) {
    return input.indexOf(results[0]);
  } else {
    return -1;
  }
}