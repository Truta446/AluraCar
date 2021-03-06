import { Agendamento } from './../../modelos/agendamentos';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
  }

  private _geraChave(agendamento: Agendamento) {
    return agendamento.emailCliente + agendamento.data.substr(0,10);
  }

  salva(agendamento: Agendamento) {
    let chave = this._geraChave(agendamento);

    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

}
