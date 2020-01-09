import { Component, OnInit } from '@angular/core';
import { ModousuarioService } from 'src/app/servicios/Modo-Usuario/modousuario.service';

@Component({
  selector: 'app-default-sidebar',
  templateUrl: './default-sidebar.component.html',
  styleUrls: ['./default-sidebar.component.css']
})
export class DefaultSidebarComponent implements OnInit {

  modoUsuario: string = 'pro';

  constructor( private ModoUser: ModousuarioService) { }
  ngOnInit() {
  }
  // manda un nuevo modo de usuario al servicio que administra el modo usuario
  setValue() {
    console.log(this.modoUsuario);
    this.ModoUser.actualizarModoUser(this.modoUsuario);
  }

}
