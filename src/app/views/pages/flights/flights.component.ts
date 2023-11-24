import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  formJourney = new FormBuilder().group({
    origin: [''],
    destination: [''],
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
  }

  getJourney() {
    const OriginSelected = this.formJourney.get('origin')?.value;
    const DestinationSelected = this.formJourney.get('destination')?.value;
    let originArr: Flight[] = [];
    let flightsMap: Flight[] = [];
    let priceTot=0;

    this.mappedData.map((item) => {
      if (item.$origin == OriginSelected) {
        originArr.push(item)
      }
    });

    originArr.map(originItem => {
      if (originItem.$destination === DestinationSelected) {
        flightsMap.push(originItem);
      }

      this.mappedData.map(itemMap => {
        if (originItem.$destination === itemMap.$origin) {
          if (itemMap.$destination === DestinationSelected) {
            flightsMap.push(originItem);
            flightsMap.push(itemMap);
          }
        }
      })
    })

    if(flightsMap.length){
      flightsMap.map(itemF=>{
        priceTot+=itemF.$price
      });
    }

    this.JourneyRes = new Journey(
      flightsMap,
      OriginSelected ?? "",
      DestinationSelected ?? "",
      priceTot
    );


  }

}
