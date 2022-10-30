export class WorkSession {
  public id?: string;
  public name: string;
  public startDate: Date;
  public endDate: Date;

  constructor(name: string, startDate: Date, endDate: Date, id?: string) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
