import { Component, inject } from '@angular/core';

import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from '@angular/material/table';

import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/Producto';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private productoServicio = inject(ProductoService)
  public listaProducto: Producto[] = []
  public displayedColumns: string[] = ['nombre', 'marca', 'precio'];

  constructor() {
    this.productoServicio.lista().subscribe({
      next: (data) => {
        if (Array.isArray(data.value)) {
          if (data.value.length > 0) {
              this.listaProducto = data.value;
          }
      } else {
          // Si `data.value` es un solo objeto `Producto`, conviértelo en un array
          this.listaProducto = [data.value];
      }
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

}
