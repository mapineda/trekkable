import { Component } from '@angular/core';
import { NavController, Loading, Alert } from 'ionic-angular';
import { Rooms } from '../../providers/rooms/rooms';
import { AvailableRoomsPage } from '../available-rooms/available-rooms';

@Component({
  templateUrl: 'build/pages/search/search.html',
})
export class SearchPage {

    roomType: any;
    guests: any;
    beds: any;
    priceRange: any;
    from: any;
    to: any;

    constructor(private nav: NavController, private alertCtrl: AlertController, private roomsService: Rooms) {

        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.priceRange = {
            lower: 0,
            upper: 500
        };

        this.roomType = 'standard';
        this.guests = 1;
        this.beds = 1;
        this.from = today.toISOString();
        this.to = tomorrow.toISOString();

    }

    findRooms(){

        let loading = Loading.create({
            content: "Finding rooms..."
        });

        this.nav.present(loading);

        let options = {
            roomType: this.roomType,
            guests: this.guests,
            beds: this.beds,
            priceRange: this.priceRange,
            from: this.from,
            to: this.to
        };

        this.roomsService.getRooms(options).then((data) => {

            loading.dismiss();

            if(typeof(data[0]) === "undefined"){
                let alert = Alert.create({
                    title: 'Oops!',
                    subTitle: 'Sorry, no rooms could be found for your search criteria.',
                    buttons: ['Ok']
                });

                this.nav.present(alert);
            } else {
                this.nav.push(AvailableRoomsPage, {
                    rooms: data,
                    details: options
                });
            }

        }, (err) => {
            console.log(err);
        });

    }

}
