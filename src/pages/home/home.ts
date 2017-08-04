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
  contacts = false;
  sqlstorage: any = null;
  visits: any;
  user: number;

  constructor(public navCtrl: NavController, public restapiService: RestapiService) {
    this.sqlstorage = new SQLite();
    this.user = 104718;

    this.getVisits();
  }

  ngOnInit() {

  }

  getVisits() {
    this.restapiService.getVisits(this.user)
      .then(data => {
        this.visits = data.visits;
      });
  }
}
