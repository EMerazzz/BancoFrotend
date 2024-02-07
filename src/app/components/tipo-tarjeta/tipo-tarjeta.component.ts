import { Component, OnInit } from '@angular/core';
import { tipoTarjeta } from 'src/app/models/Clientes-model';
import { ClientesService } from 'src/app/service/clientes.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-tipo-tarjeta',
  templateUrl: './tipo-tarjeta.component.html',
  styleUrls: ['./tipo-tarjeta.component.css']
})
export class TipoTarjetaComponent implements OnInit{
  Submitforms(){
    const formData = this.formTipoTarjeta.value;
  }
  listTipoTarjeta: tipoTarjeta[] = [];
  formTipoTarjeta!: FormGroup;
  isUpdate: boolean = false;
  constructor(private clientesService: ClientesService, private formBuilder: FormBuilder) {}

  list() {
    this.clientesService.getTipoTarjeta().subscribe(resp => {
      if (resp) {
        this.listTipoTarjeta = resp;
      }
    });
  }
  ngOnInit(): void {
    // Llama al método list() en el ngOnInit
    this.list();

    this.formTipoTarjeta = this.formBuilder.group({
      codTipoTarjeta: [''],
      nombreTarjeta: [''],
      restriccionCredito: [''],
    });
  }
  newTipoTarjeta() {
    this.isUpdate = false;
    this.formTipoTarjeta.reset();
  }

  selectItem(item: any) {
    this.isUpdate = true;
    this.formTipoTarjeta.patchValue(item);
  }

  save() {
    const formData = this.formTipoTarjeta?.value;
    console.log('Datos del formulario en save:', formData)
    this.clientesService.saveTipoTarjeta(this.formTipoTarjeta.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formTipoTarjeta.reset();
        
      }
    });
  }

  update() {
    this.clientesService.updateTipoTarjeta(this.formTipoTarjeta.value).subscribe(resp => {
      if (resp) {
        this.list();
      }
    });
  }
}
