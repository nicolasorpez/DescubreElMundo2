import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  private map: L.Map | undefined;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
    this.addPointsOfInterest();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [18.3458, -99.5397] as L.LatLngTuple, // Coordenadas de Iguala
      zoom: 14 // Zoom ajustado para la ciudad
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private addPointsOfInterest(): void {
    // Ícono personalizado para los puntos de interés
    const interestIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/7369/7369110.png', // Ruta al ícono que desees usar
      iconSize: [32, 32], // Tamaño del ícono
      iconAnchor: [16, 32], // Punto de anclaje del ícono
      popupAnchor: [0, -32] // Posición del popup respecto al ícono
    });

    // Lista de puntos de interés en Iguala
    const pointsOfInterest: { name: string; coords: L.LatLngTuple; description?: string }[] = [
      {
        name: 'Zócalo de Iguala',
        coords: [18.3496, -99.5396],
        description: 'El centro histórico de la ciudad con jardines y la Parroquia de San Francisco.'
      },
      {
        name: 'Parroquia de San Francisco de Asís',
        coords: [18.3495, -99.5398],
        description: 'Una iglesia emblemática en el corazón de Iguala.'
      },
      {
        name: 'Laguna de Tuxpan',
        coords: [18.3665, -99.5295],
        description: 'Un hermoso cuerpo de agua ideal para paseos y actividades recreativas.'
      },
      {
        name: 'Museo de la Bandera',
        coords: [18.3485, -99.5402],
        description: 'Un museo dedicado a la historia de la Bandera de México.'
      },
      {
        name: 'Cerro del Tehuehue',
        coords: [18.3600, -99.5333],
        description: 'Un mirador natural con vistas impresionantes de Iguala.'
      }
    ];

    // Agregar los puntos al mapa con sus íconos y popups
    pointsOfInterest.forEach(point => {
      L.marker(point.coords, { icon: interestIcon })
        .addTo(this.map!)
        .bindPopup(`<b>${point.name}</b><br>${point.description || ''}`);
    });
  }
}
