import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-resgistro',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './resgistro.component.html',
  styleUrl: './resgistro.component.css'
})
export class ResgistroComponent {
  private accessoService = inject(AccesoService);
  private router = inject(Router)
  public formBuild = inject(FormBuilder)

  public formRegistro: FormGroup = this.formBuild.group({
    nombre: ['', Validators.required],
    correo: ['', Validators.required],
    clave: ['', Validators.required]
  })

  registrarse() {
    if (this.formRegistro.invalid) return;

    const objeto: Usuario = {
      nombre: this.formRegistro.value.correo,
      correo: this.formRegistro.value.correo,
      clave: this.formRegistro.value.clave
    }

    this.accessoService.registrarse(objeto).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.router.navigate([""])
        } else {
          alert("No se pudo registrar")
        }
      }, error: (error) => {
        console.log(error.message);

      }
    })
  }

  volver() {
    this.router.navigate([""])
  }
}
