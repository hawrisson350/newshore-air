export interface FlightRq {
    departureStation: string;
    arrivalStation: string;
    flightCarrier: string;
    flightNumber: string;
    price: number;
}

export interface JourneyFlightTransportRq {
    FlightCarrier: string;
    FlightNumber: string;
}

export interface JourneyFlightRq {
    Origin: string;
    Destination: string;
    Price: number;
    Transport: JourneyFlightTransportRq[];
}

export interface JourneyRq {
    Journey: {
        Origin: string;
        Destination: string;
        Price: number;
        Flights: JourneyFlightRq[];
    }
}
