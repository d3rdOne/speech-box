export interface Speech {
  id: number,
  title: string,
  content: string,
  keywords: string[];
  date: string;
  author: string;
  checked?: boolean;
  favorite: boolean;
  archived?: boolean;
}
