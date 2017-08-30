import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {AddContactPage} from '../add-contact/add-contact';
import {RestapiService} from "../../providers/restapi-service/restapi-service";
import {ConfigPage} from "../config/config";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    contacts = false;
    user;
    visits = false;
    tab1Root = HomePage;
    tab2Root = AddContactPage;
    tab3Root = ConfigPage;

    constructor(public restapiService: RestapiService) {
        this.user = 104718;
        this.getVisits();
    }

    getVisits() {
        this.restapiService.getVisits(this.user)
            .then(data => {

                this.visits = data.visits;
            });
    }
}
