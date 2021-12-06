import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms'; // importar libreria
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Mae } from 'src/models/mae.models'; // importar libreria
import { MaeService } from '../services/mae/mae.service'; // importar clase definida para los servicios

@Component({
  selector: 'create-mae',
  templateUrl: './create-mae.component.html',
  styleUrls: ['./create-mae.component.css']
})
export class CreateMaeComponent implements OnInit {

  content: string = "Hola mundo";
  texto: string = "";

  errorMessage = 'Este campo es requerido.';
  private isEditing = false;
  private maeId!: string;  // para que la variable inicialmente acepte nulos, podemos agregarle al final el signo de exclamasión.
  mae: Mae = {
    id: '',
    codigo:'',
    nombre: '',
  };

  constructor(public maeService: MaeService,  public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => { //Va capturar la ruta y va a esperar a que se llame; va recibir un arrowFunction con parametro que se va llamar paramap de tipo paramMap.
      if (paramMap.has('maeId')) {                          // Cuando se llame a la ruta vamos a preguntar: si la ruta, es decir, si paramMap tiene el parametro MaeId
        this.isEditing = true;                              // Si tiene el parametro entonces isEditing es true.
        this.maeId = paramMap.get('maeId')!;                // Cuando estamos en modo edicion, capturamos el Id (identificamos el objeto que estamos editando)
        this.maeService.getMae(this.maeId).subscribe((maeData)=>{ //Traemos el resto de la informacion para cargarlo al formulario y con eso creamos una nueva instancia cargando la informacion que viene del backend
          this.mae = {
            id: maeData._id,
            codigo: maeData.codigo,
            nombre:maeData.nombre,
          };
        });
      } else {
        this.isEditing = false;

      }
    });
  }

  showText(){
    this.content = this.texto; // this. por ser variable de la misma class CreatePostComponent
  }

  saveMae(form: NgForm){
    if(form.invalid) {
      return;
    }

    if(this.isEditing){
      this.maeService.updateMae(form.value,this.maeId)
    } else {
      this.maeService.addMae(form.value);
    }
    form.resetForm(); // metodo para limpiar el formulario
  }

  getErrorMessage(){
    return this.errorMessage;
  }

}
