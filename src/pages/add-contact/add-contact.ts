import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from "@ionic-native/native-geocoder";
import { RestapiService } from "../../providers/restapi-service/restapi-service";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

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
        public restapiService: RestapiService, private storage: Storage, private alertCtrl: AlertController, public events: Events) {

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
    }

    ionViewWillEnter() {
        this.geolocation.getCurrentPosition().then((resp) => {

            this.contactInfo.lat = resp.coords.latitude;
            this.contactInfo.lng = resp.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
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
            this.events.publish('visitsnumber', visits);
            this.showAlert();
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
