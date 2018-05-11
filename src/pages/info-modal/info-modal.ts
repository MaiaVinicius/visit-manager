import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the InfoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html',
})
export class InfoModalPage {
  info;

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    this.info = params.get('info')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  functionAcceptInsurance() {
    let value = this.info['acceptInsurance'];

    if (value == "1") {
      return "Sim"
    }
    else if (value == "2") {
      return "Não"
    }
  }

  functionSpeakedWith() {
    let value = this.info['functionSpeakedWith'];

    if (value == "1") {
      return "Administrador"
    }
    else if (value == "2") {
      return "Secretária"
    }
    else if (value == "3") {
      return "Faturista"
    }
    else if (value == "4") {
      return "Sócio"
    }
  }

}
