export class Event
{
  constructor(
    // tslint:disable-next-line: variable-name
    public _id?: number,
    public name?: string,
    public date?: string,
    public description?: string,
    public price?: number
  ){}

   public toString(): string
  {
    return `
   Event
    ----------------
    Name       : ${this.name}
    Date       : ${this.date}
    Description: ${this.description}
    Price      : ${this.price}
   --------------------------
    `;
   }
}
