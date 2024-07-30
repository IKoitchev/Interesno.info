export interface ArticleDto {
  title: string;
  text: string;
  pictures: string[];
  uploadDate: Date;
}
export interface ProductionDto {
  link: string;
  title: string;
  place: string;
  dates: ProductionDate[];
}

export interface ProductionDate {
  date: Date;
  time: Date;
  tickets: string;
}
