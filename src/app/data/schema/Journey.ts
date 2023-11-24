import { Flight } from "./Flight";

export class Journey {
    private flights: Flight[];
    private origins: string;
    private destination: string;
    private price: number;

    constructor(
        flights: Flight[],
        origins: string,
        destination: string,
        price: number,
    ) {
        this.flights = flights;
        this.origins = origins;
        this.destination = destination;
        this.price = price;
    }

    /**
     * Getter $flights
     * @return {Flight[]}
     */
    public get $flights(): Flight[] {
        return this.flights;
    }

    /**
     * Getter $origins
     * @return {string}
     */
    public get $origins(): string {
        return this.origins;
    }

    /**
     * Getter $destination
     * @return {string}
     */
    public get $destination(): string {
        return this.destination;
    }

    /**
     * Getter $price
     * @return {number}
     */
    public get $price(): number {
        return this.price;
    }

    /**
     * Setter $flights
     * @param {Flight[]} value
     */
    public set $flights(value: Flight[]) {
        this.flights = value;
    }

    /**
     * Setter $origins
     * @param {string} value
     */
    public set $origins(value: string) {
        this.origins = value;
    }

    /**
     * Setter $destination
     * @param {string} value
     */
    public set $destination(value: string) {
        this.destination = value;
    }

    /**
     * Setter $price
     * @param {number} value
     */
    public set $price(value: number) {
        this.price = value;
    }

}