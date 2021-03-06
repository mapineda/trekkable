import { Component } from '@angular/core';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { Rooms } from '../../providers/rooms/rooms';

@Component({
  templateUrl: 'build/pages/booking/booking.html',
})
export class BookingPage {

    room: any;
    details: any;
    checkIn: any;
    checkOut: any;

    constructor(private nav: NavController, private navParams: NavParams, private roomsService: Rooms) {
        this.room = this.navParams.get('room');
        this.details = this.navParams.get('details');
        this.checkIn = new Date(this.details.from).toString().substring(0,15);
        this.checkOut = new Date(this.details.to).toString().substring(0,15);
    }

    book(){

        let newReservation = {
            _id: this.room._id,
            from: this.details.from.substring(0,10),
            to: this.details.from.substring(0,10)
        }

        let loading = Loading.create({
            content: "Booking room..."
        });

        this.nav.present(loading);

        this.roomsService.reserveRoom(newReservation).then((res) => {

            loading.dismiss();
            this.nav.popToRoot();

        }, (err) => {
            console.log(err);
        });

    }

}
