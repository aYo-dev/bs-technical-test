export interface SimpleAction {
  type: string;
}

export interface DataAction<T> extends SimpleAction {
  payload: T
}
