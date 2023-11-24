import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Flight } from 'src/app/data/schema/Flight';
import { Journey } from 'src/app/data/schema/Journey';
import { FlightRq } from 'src/app/data/schema/RqResponse.interface';
import { Transport } from 'src/app/data/schema/Transport';
import { HttpReqsService } from 'src/app/data/service/HttpReqs.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  mappedData: Flight[] = [];
  originList: string[] = [];
  destinationList: string[] = [];
  JourneyRes!: Journey;
  currencyList: any[] = [];
  currencyBase: any;
  showJourney = false;

  formJourney = new FormBuilder().group({
    origin: ['',Validators.required],
    destination: ['',Validators.required],
    currency: ['',Validators.required]
  });

  constructor(
    private httpReqs: HttpReqsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.httpReqs.get('flights/0').subscribe(
      (resp: FlightRq[]) => {
        const CoriginList = new Set<string>();
        const CdestinationList = new Set<string>();
        resp.map(item => {
          const transportObj = new Transport(
            item.flightCarrier,
            item.flightNumber
          );

          CoriginList.add(item.departureStation);
          CdestinationList.add(item.arrivalStation);

          this.mappedData.push(
            new Flight(
              transportObj,
              item.departureStation,
              item.arrivalStation,
              item.price
            )
          );
        });

        this.originList = [...CoriginList];
        this.destinationList = [...CdestinationList];
      }
    );

    this.httpReqs.convertCurrency()
      .subscribe(resp => {
        this.currencyBase = resp.base;
        this.formJourney.get("currency")?.setValue(this.currencyBase);
        Object.keys(resp.rates).forEach(key => {
          this.currencyList.push({
            currency: key,
            value: resp.rates[key]
          });
        });

      });
  }

  getJourney() {
    if (this.formJourney.valid) {
      const OriginSelected = this.formJourney.get('origin')?.value;
      const DestinationSelected = this.formJourney.get('destination')?.value;
      const CurrencySelected = this.formJourney.get('currency')?.value ?? "";

      const originArr: Flight[] = [];
      const flightsMap: Flight[] = [];
      let priceTot = 0;

      this.mappedData.map((item) => {
        if (item.$origin === OriginSelected) {
          originArr.push(new Flight(
            item.$transport,
            item.$origin,
            item.$destination,
            item.$price));
        }
      });

      originArr.map(originItem => {
        if (originItem.$destination === DestinationSelected) {
          originItem.$price = this.convertCurrency(CurrencySelected,originItem.$price);
          flightsMap.push(originItem);
        }

        this.mappedData.map(itemMappedData => {
          let itemMap = new Flight(
            itemMappedData.$transport,
            itemMappedData.$origin,
            itemMappedData.$destination,
            itemMappedData.$price);

          if (originItem.$destination === itemMap.$origin) {
            if (itemMap.$destination === DestinationSelected) {
              originItem.$price = this.convertCurrency(CurrencySelected,originItem.$price);
              flightsMap.push(originItem);
              itemMap.$price = this.convertCurrency(CurrencySelected,itemMap.$price);;
              flightsMap.push(itemMap);
            }
          }
        })
      })

      if (flightsMap.length) {
        flightsMap.map(itemF => {
          priceTot += itemF.$price
        });
      }

      this.JourneyRes = new Journey(
        flightsMap,
        OriginSelected ?? "",
        DestinationSelected ?? "",
        priceTot
      );

      this.showJourney = true;
    }
    return false;
  }

  convertCurrency(currency:string, value:number) {
    const baseValue = this.currencyList.find(i => i.currency === this.currencyBase);
    const baseValueUSD = this.currencyList.find(i => i.currency === "USD");
    const baseValueConverted = value * (baseValue.value / baseValueUSD.value);

    const currencyValue = this.currencyList.find(i => i.currency === currency);
    const currencyValueConverted = baseValueConverted * currencyValue.value;

    console.log(currencyValueConverted);
    
    return currencyValueConverted;
  }

}
