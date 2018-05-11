import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ConfigPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  userId;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController) {
    
  }

  setUserId() {
      this.storage.set('userId', this.userId);
      this.showAlert();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Seu ID foi definido com sucesso',
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

}
