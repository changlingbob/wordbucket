import Word from '../word';

class Bucket {
  public title: string;
  private children: Bucket[];
  private words: Word[];

  constructor(title: string) {
    this.children = [];
    this.words = [];
    this.title = title;
  }

  public create = (title: string): Bucket => {
    const bucket = new Bucket(title);
    this.children.push(bucket);

    return bucket;
  }

  public add = (word: string, weight?: number): void => {
    this.words.push(new Word(word, weight));
    return;
  }

  public roll = (): string => {
    return "";
  }
}

export default Bucket;
