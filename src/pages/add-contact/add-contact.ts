import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";
import {RestapiService} from "../../providers/restapi-service/restapi-service";

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
  address;
  specialties;
  softwares;
  lat;
  lng;
  contactInfo = {};
  apiURL = "https://clinic.feegow.com.br/feegow_components/api/contatoscomercial/";
  private http: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
              public restapiService: RestapiService) {
    this.loadSpecialties();
    this.loadSoftwares();
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

      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
    });
  }

  addContact() {
    this.restapiService.saveContact(this.contactInfo).then((result) => {
      console.log(result);
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
