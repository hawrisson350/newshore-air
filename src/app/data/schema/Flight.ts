import { Transport } from "./Transport";

export class Flight {
    private transport: Transport;
    private origin: string;
    private destination: string;
    private price: number;

    constructor(
        transport: Transport,
        origin: string,
        destination: string,
        price: number) {
        this.transport = transport;
        this.origin = origin;
        this.destination = destination;
        this.price = price;
    }

    /**
     * Getter $transport
     * @return {Transport}
     */
    public get $transport(): Transport {
        return this.transport;
    }

    /**
     * Getter $origin
     * @return {string}
     */
    public get $origin(): string {
        return this.origin;
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
     * Setter $transport
     * @param {Transport} value
     */
    public set $transport(value: Transport) {
        this.transport = value;
    }

    /**
     * Setter $origin
     * @param {string} value
     */
    public set $origin(value: string) {
        this.origin = value;
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
