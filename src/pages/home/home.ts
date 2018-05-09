import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestapiService } from "../../providers/restapi-service/restapi-service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  visitsToday;
  contacts = false;
  visits: any;
  user: number;

  constructor(public navCtrl: NavController, public restapiService: RestapiService, private storage: Storage) {
    this.user = 104718;

    this.getVisits();
  }
  ionViewWillEnter() {
    this.getVisits();
  }

  ngOnInit() {

  }

  getVisits() {
    this.storage.get('visits').then((data) => {
      this.visits = JSON.parse(data);
    });
  }
}
