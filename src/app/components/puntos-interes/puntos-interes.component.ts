import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './../mapa/mapa.component';
import { MenuComponent } from "../menu/menu.component";
import { PuntosDeInteresService } from './../../services/puntos-de-interes.service';

@Component({
  selector: 'app-puntos-interes',
  standalone: true,
  templateUrl: './puntos-interes.component.html',
  styleUrls: ['./puntos-interes.component.css'],
  imports: [CommonModule, MapaComponent, MenuComponent]
})
export class PuntosInteresComponent {
  constructor(private puntosDeInteresService: PuntosDeInteresService) { }
  lugares: { name: string; coords: [number, number]; description?: string; tipo: string; imageUrl: string }[] = [];
  ngAfterViewInit(): void {
    this.lugares = this.puntosDeInteresService.getPuntosDeInteres();
  }

  mostrarRuta(lugar: any) {
    if (lugar.coords) {
      this.puntosDeInteresService.mostrarRuta(lugar);
    } else {
      console.error('La propiedad coords no existe en el objeto lugar');
    }
  }
}