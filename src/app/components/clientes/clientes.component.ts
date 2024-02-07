import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
import { FormBuilder, FormGroup, FormControl,Validators  } from '@angular/forms';
import { clientes } from 'src/app/models/Clientes-model';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
Submitforms(){
  const formData = this.formClientes.value;
}
listClientes: clientes[] = [];
  formClientes!: FormGroup;
  isUpdate: boolean = false;
  constructor(private clientesService: ClientesService, private formBuilder: FormBuilder) {}

  list() {
    this.clientesService.getClientes().subscribe(resp => {
      if (resp) {
        this.listClientes = resp;
      }
    });
  }

  ngOnInit(): void {
    // Llama al método list() en el ngOnInit
    this.list();

    this.formClientes = this.formBuilder.group({
      codCliente: ['', Validators.required],
      usuario: [''],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      telefono: [''],
      direccion: [''],
      correo: [''],
      paisResidencia: [''],
    });
  }

  
  newCliente() {
    this.isUpdate = false;
    this.formClientes.reset();
  }

  selectItem(item: any) {
    this.isUpdate = true;
    this.formClientes.patchValue(item);
  }

  save() {
    const formData = this.formClientes?.value;
    console.log('Datos del formulario en save:', formData)
    this.clientesService.saveClientes(this.formClientes.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formClientes.reset();
        
      }
    });
  }

  update() {
    this.clientesService.updateClientes(this.formClientes.value).subscribe(resp => {
      if (resp) {
        this.list();
      }
    });
  }
 
}
