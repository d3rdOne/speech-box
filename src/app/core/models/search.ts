import { SearchCategory } from "../enums/enums";

export interface Search {
  term: string;
  category: SearchCategory;
}