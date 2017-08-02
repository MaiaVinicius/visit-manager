import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SQLite} from 'ionic-native';
import {RestapiService} from "../../providers/restapi-service/restapi-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  visitsToday;
  contacts = "---";
  sqlstorage: any = null;
  visits: any;

  constructor(public navCtrl: NavController, public restapiService: RestapiService) {
    this.sqlstorage = new SQLite();

    this.getVisits();
  }

  ngOnInit() {

  }

  getVisits() {
    this.restapiService.getVisits()
      .then(data => {
        this.visits = data.visits;
      });
  }
}
