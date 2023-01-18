import { Component } from '@angular/core';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';

@Component({
  selector: 'app-tipo-cambio',
  templateUrl: './tipo-cambio.component.html'
})
export class TipoCambioComponent {

  form: any = {
    monto: '',
    monedaOrigen: 'USD',
    monedaDestino: 'SOL'
  }
  result: any = {}

  constructor(private tipoCambioService: TipoCambioService) {}

  cambiar() {
    this.tipoCambioService.save(this.form.monto, this.form.monedaOrigen, this.form.monedaDestino).subscribe(resp=>{
      console.log(resp);
      this.result = resp;
    });
  }

}
