import { Component } from '@angular/core';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html'
})
export class ActualizarComponent {

  form: any = {
    monto: '',
    monedaOrigen: 'USD',
    monedaDestino: 'SOL'
  }
  result: any = {}

  constructor(private tipoCambioService: TipoCambioService) {}

  cambiar() {
    this.tipoCambioService.update(this.form.monto).subscribe(resp=>{
      this.result = resp;
      Swal.fire('Tipo de Cambio',`Registro Exitoso!`,'success');
    });
  }

}
