import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PuntosDeInteresService } from '../../services/puntos-de-interes.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  private map!: L.Map;
  private puntosDeInteres!: any[];
  private mostrarRuta: boolean = false;

  constructor(private puntosDeInteresService: PuntosDeInteresService) { }

  ngOnInit(): void {
    this.initMap();
    this.cargarPuntosDeInteres();
    this.map.on('click', (e) => {
      if (this.mostrarRuta) {
        // Aquí puedes implementar la lógica para mostrar la ruta en el mapa
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [18.3496, -99.5396],
      zoom: 14
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  
    this.map.on('click', (e) => {
      if (this.mostrarRuta) {
        // Aquí puedes implementar la lógica para mostrar la ruta en el mapa
      }
    });
  }


  private cargarPuntosDeInteres(): void {
    this.puntosDeInteres = this.puntosDeInteresService.getPuntosDeInteres();
    this.mostrarPuntosDeInteresEnMapa();
  }

  private mostrarPuntosDeInteresEnMapa(): void {
    const puntosDeInteresIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/7369/7369110.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const usuarioIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    this.puntosDeInteres.forEach(punto => {
      const marker = L.marker([punto.coords[0], punto.coords[1]], { icon: puntosDeInteresIcon });
      marker.addTo(this.map);
      marker.bindPopup(punto.name);
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const marker = L.marker([lat, lng], { icon: usuarioIcon });
        marker.addTo(this.map);
        marker.bindPopup('Tu ubicación actual');
        alert('Ubicación obtenida exitosamente');
      }, error => {
        console.error(error);
        alert('No se pudo obtener la ubicación actual');
      });
  }

}
mostrarRutaEnMapa(lugar: any) {
  this.mostrarRuta = true;
  // Obtener la ubicación actual del usuario
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    // Dibujar la ruta en el mapa desde la ubicación actual del usuario hasta el punto de interés seleccionado
    const ruta = L.polyline([
      [lat, lng],
      [lugar.coords[0], lugar.coords[1]]
    ]);
    ruta.addTo(this.map);
  }, error => {
    console.error(error);
  });
}

}