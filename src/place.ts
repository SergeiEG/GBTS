export class Place {
  constructor(
    private readonly provider: string,
    public readonly originalId: string,
    public readonly title: string,
    public readonly photo: string,
    public readonly remoteness: number | "N/A",
    public readonly details: string,
    public readonly priceForOneDay: number,
    public readonly totalPrice: number
  ) {}

  get id() {
    return this.provider + "-" + this.originalId;
  }
}
