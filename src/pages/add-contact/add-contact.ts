import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";
import {RestapiService} from "../../providers/restapi-service/restapi-service";
import {HomePage} from "../home/home";

/**
 * Generated class for the AddContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html'

})
export class AddContactPage {
  user;
  address;
  specialties;
  softwares;
  contactInfo = {lat: 0, lng: 0};
  apiURL = "https://clinic.feegow.com.br/feegow_components/api/contatoscomercial/";
  private http: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
              public restapiService: RestapiService) {
    this.loadSpecialties();
    this.loadSoftwares();
    this.user = 104718;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.address = resp.coords.latitude;
    }).catch((error) => {
      this.address = "Erro " + error;
    });

    let watch = this.geolocation.watchPosition();

    this.address = "Get geolocation";
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude

      this.contactInfo.lat = data.coords.latitude;
      this.contactInfo.lng = data.coords.longitude;
    });
  }

  addContact() {
    this.restapiService.saveContact(this.contactInfo, this.user).then((result) => {
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      console.log(err);
    });
  }

  loadSpecialties() {
    this.restapiService.getSpecialties().then((result) => {
      this.specialties = result;
    }, (err) => {
      console.log(err);
    });
  }

  loadSoftwares() {
    this.restapiService.getSoftwares().then((result) => {
      this.softwares = result;
    }, (err) => {
      console.log(err);
    });
  }
}
