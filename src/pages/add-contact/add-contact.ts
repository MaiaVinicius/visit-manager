import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from "@ionic-native/native-geocoder";
import { RestapiService } from "../../providers/restapi-service/restapi-service";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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
    contactInfo;
    apiURL = "https://clinic.feegow.com.br/feegow_components/api/contatoscomercial/";
    private http: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
        public restapiService: RestapiService, private storage: Storage, private alertCtrl: AlertController) {

        this.loadSpecialties();
        this.loadSoftwares();

        this.resetForm();
        this.user = 104718;
    }

    resetForm() {
        this.contactInfo = {
            lat: 0,
            lng: 0,
            acceptInsurance: 2,
            functionSpeakedWith: 2,
            currentSoftware: "Outro",
            satisfaction: 2
        };
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

    showAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sucesso',
            subTitle: 'Seu item foi adicionado com sucesso!',
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    }
                }
            ]
        });
        alert.present();
    }

    addContact() {
        this.storage.get('visits').then((data) => {
            var visits;
            if (data === null) {
                visits = [];
            } else {
                visits = JSON.parse(data);
            }

            visits.push(this.contactInfo);
            this.storage.set('visits', JSON.stringify(visits));
            this.showAlert();
        });

        //this.restapiService.saveContact(this.contactInfo, this.user).then((result) => {
        //  console.log(result);

        //this.resetForm();
        //this.navCtrl.setRoot(HomePage);
        // }, (err) => {
        //   console.log(err);
        //});
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
