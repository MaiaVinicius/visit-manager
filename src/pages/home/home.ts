import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestapiService } from "../../providers/restapi-service/restapi-service";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public restapiService: RestapiService, private storage: Storage, private alertCtrl: AlertController) {
    this.user = 104718;

    this.getVisits();
    this.autoSync();
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
            this.restapiService.saveContact(this.visits, this.user)      
            .subscribe(
              res => {
                this.postAPI();
              },
              err => {
                this.errorSyncAlert();
              }
            );
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

  postAPI() {
    this.restapiService.saveContact(this.visits, this.user)      
    .subscribe(
      res => {
        this.sucessSyncAlert();
        this.storage.remove('visits')
      },
      err => {
        this.errorSyncAlert();
      }
    );
  }
}
