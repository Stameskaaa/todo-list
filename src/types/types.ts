export interface InitialState {
  allTasks: string[];
  deletedTasks: string[];
  completedTasks: string[];
  currentTasks: string[];
}

export interface Credentials {
  login: string;
  pass: string;
}
