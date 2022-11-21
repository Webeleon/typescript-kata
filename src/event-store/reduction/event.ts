export interface ApplicationEvent<Actions, DataType> {
  version: number;
  createdAt: Date;
  action: Actions;
  data: DataType;
}
