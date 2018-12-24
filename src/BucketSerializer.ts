import Bucket from './Bucket';

export interface ISerializedBucket {
  name: string;
  children: ISerializedBucket[];
  words: ISerializedWordEntry[];
}

export interface ISerializedWordEntry {
  words: string;
  weight: number;
}  

export function load(data:string, parent?:Bucket): void {
  try {
    const input = JSON.parse(data);
    Bucket.deserialize(input, parent);
  } catch (e) {
    throw `Couldn't parse saved data: ${e}`;
  }
  return;
}

export function serialize(): string {
  return Bucket.serialize();
}

export function fromCSV(data:string): void {
  const rows = data.split('\n');
  
}