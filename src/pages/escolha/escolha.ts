import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';

/**
 * Generated class for the EscolhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage implements NavLifecycles {
  public carro: Carro;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
                this.carro = this.navParams.get('carroSelecionado');
  }

  ionViewDidLoad() {
    
  }

}
