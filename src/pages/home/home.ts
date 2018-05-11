import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestapiService } from "../../providers/restapi-service/restapi-service";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { InfoModalPage } from '../../pages/info-modal/info-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  visitsToday;
  contacts = false;
  visits: any;
  user: number;
  apiURL = "https://clinic.feegow.com.br/feegow_components/api/contatoscomercial/";

  constructor(public navCtrl: NavController, public restapiService: RestapiService, private storage: Storage, private alertCtrl: AlertController, public modalCtrl: ModalController) {

  }

  ionViewWillEnter() {
    this.getVisits();
    this.autoSync();
  }

  ngOnInit() {
  }

  errorSyncAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Ocorreu um erro na sincronização de dados!'
    });
    alert.present();
  }

  sucessSyncAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: 'Dados sincronizados com sucesso!'
    });
    alert.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sincronizar dados',
      subTitle: 'Você deseja sincronizar seus dados atuais com o servidor?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.postAPI();
          }
        },

        {
          text: 'Não',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  getVisits() {
    this.storage.get('visits').then((data) => {
      this.visits = JSON.parse(data);
    });
  }

  autoSync() {
    var curHour = new Date().getHours();

    if (this.visits === null) {
      console.log('null visits')
    }
    else if (curHour >= 18) {
      this.postAPI();
    }
    else {
      console.log(this.visits);
    }
  }

  infoModal(i) {
    this.storage.get('visits').then((data) => {
      let jsonData = JSON.parse(data);

      let info = jsonData[i];

      let infoModal = this.modalCtrl.create(InfoModalPage, { info: info });
      infoModal.present();

    });
  }

  postAPI() {
    this.storage.get('userId').then((data) => {
      this.restapiService.saveContact(this.visits, data)
        .subscribe(
          res => {
            this.sucessSyncAlert();
            this.storage.remove('visits');
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          },
          err => {
            this.errorSyncAlert();
          }
        );
    });
  }

}
