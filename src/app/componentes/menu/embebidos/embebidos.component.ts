import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-embebidos',
  templateUrl: './embebidos.component.html',
  styleUrls: ['./embebidos.component.css']
})
export class EmbebidosComponent implements OnInit {
r = 0
g = 0
b = 0
colval = "rgb(" + this.r + "," + this.g + "," + this.b + ")"

  constructor(private router: Router, private cliente: ClienteService) {
    console.log(this.colval)

  }
  ngOnInit() {
  }

  updateRGB(){
    const rgb = {r: this.r, g: this.g, b: this.b}

    this.colval = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    document.getElementById('cuadro').style.background = this.colval;

    this.cliente.postRGB(rgb).subscribe(res=>{
      if(res['operacion']){
        alert("Se actualizó el color")
      }else{
        alert("No se pudo actualizar el color")
      }
    })

  }

}
