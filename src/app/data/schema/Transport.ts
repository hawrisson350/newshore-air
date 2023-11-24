export class Transport {
    private flightCarrier: string;
    private flightNumber: string;

    constructor(
        flightCarrier: string,
        flightNumber: string
    ) {
        this.flightCarrier = flightCarrier;
        this.flightNumber = flightNumber;
    }

    /**
     * Getter $flightCarrier
     * @return {string}
     */
    public get $flightCarrier(): string {
        return this.flightCarrier;
    }

    /**
     * Getter $flightNumber
     * @return {string}
     */
    public get $flightNumber(): string {
        return this.flightNumber;
    }

    /**
     * Setter $flightCarrier
     * @param {string} value
     */
    public set $flightCarrier(value: string) {
        this.flightCarrier = value;
    }

    /**
     * Setter $flightNumber
     * @param {string} value
     */
    public set $flightNumber(value: string) {
        this.flightNumber = value;
    }


}
