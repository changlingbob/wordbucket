class Word {
  private words: string;
  private weight: number;
  
  constructor(words: string, weight: number = 1) {
    this.words = words;
    this.weight = weight;
  }
  
  public roll = (): string => {
    return this.words;
  }
}

export default Word;