export interface BreadCrumb {
  title: string;
  link: string;
}

export interface ColumnType {
  header: string;
  accessor?: string;
  content?: any;
  width?: string;
}

export interface ResponseFormat<T> {
  success: boolean;
  msg?: string;
  data?: T | null;
  errors?: any;
  status?: number;
}
