import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AddContactPage } from '../add-contact/add-contact';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    contacts = false;
    user;
    visits = false;
    tab1Root = HomePage;
    tab2Root = AddContactPage;

    constructor(private storage: Storage, public events: Events) {
        this.user = 104718;
        events.subscribe('visitsnumber', (visits) => {
            this.visits = visits
        });
    }

    ionViewDidEnter() {
        this.storage.get('visits').then((data) => {
            var visits;
            if (data === null) {
                visits = [];
            } else {
                visits = JSON.parse(data);
            }
            this.visits = visits;
          });
       }
      
}
