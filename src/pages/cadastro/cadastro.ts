import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { Agendamento } from '../../modelos/agendamentos';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  private _alerta: Alert;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _alertCtrl: AlertController,
              private _agendamentosService: AgendamentosServiceProvider,
              private _agendamentoDao: AgendamentoDaoProvider) {
                this.carro = this.navParams.get('carroSelecionado');
                this.precoTotal = this.navParams.get('precoTotal');
  }

  agenda() {
    if (!this.nome || !this.endereco || !this.email) {
      this._alertCtrl.create({
        title: 'Preenchimento Obrigtório',
        subTitle: 'Preencha todos os campos!',
        buttons: [
          { text: 'OK' }
        ]
      }).present();

      return;
    }
    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
    };

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let mensagem = '';

    this._agendamentosService.agenda(agendamento)
    .mergeMap((valor) => {
      let observable = this._agendamentoDao.salva(agendamento);
      if (valor instanceof Error) {
        throw valor;
      }
      return observable;
    })
    .finally(
      () => {
        this._alerta.setSubTitle(mensagem);
        this._alerta.present();
      }
    )
    .subscribe(
      () => mensagem = 'Agendamento realizado com sucesso!',
      (err: Error) => mensagem = err.message
    );
  }
}