import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'; // Importa la biblioteca de enrutamiento
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
  private ubicacionActual!: L.LatLng;
  private routingControl!: L.Routing.Control; // Control de enrutamiento

  constructor(private puntosDeInteresService: PuntosDeInteresService) {}

  ngOnInit(): void {
    this.initMap();
    this.cargarPuntosDeInteres();
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

    this.obtenerUbicacionActual();
  }

  private obtenerUbicacionActual(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.ubicacionActual = L.latLng(lat, lng);

          const usuarioIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });

          const marker = L.marker(this.ubicacionActual, { icon: usuarioIcon });
          marker.addTo(this.map);
          marker.bindPopup('Tu ubicación actual').openPopup();

          this.mostrarPuntosDeInteresEnMapa();
        },
        error => {
          console.error('Error al obtener la ubicación:', error);
          alert('No se pudo obtener la ubicación actual');
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador.');
    }
  }

  private cargarPuntosDeInteres(): void {
    this.puntosDeInteres = this.puntosDeInteresService.getPuntosDeInteres();
    if (this.ubicacionActual) {
      this.mostrarPuntosDeInteresEnMapa();
    }
  }

  private mostrarPuntosDeInteresEnMapa(): void {
    const puntosDeInteresIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/7369/7369110.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    this.puntosDeInteres.forEach(punto => {
      const puntoLatLng = L.latLng(punto.coords[0], punto.coords[1]);

      // Calcular la distancia en kilómetros
      const distancia = this.ubicacionActual
        ? this.ubicacionActual.distanceTo(puntoLatLng) / 1000 // Conversión a kilómetros
        : 0;

      const marker = L.marker(puntoLatLng, { icon: puntosDeInteresIcon });
      marker.addTo(this.map);

      marker.bindPopup(
        `<strong>${punto.name}</strong><br>Distancia: ${distancia.toFixed(2)} km<br>
        <button onclick="window.dispatchEvent(new CustomEvent('traceRoute', { detail: { lat: ${punto.coords[0]}, lng: ${punto.coords[1]} } }))">
          Trazar Ruta
        </button>`
      );
    });

    // Escucha el evento personalizado para trazar la ruta
    window.addEventListener('traceRoute', (event: any) => {
      const { lat, lng } = event.detail;
      this.trazarRuta(L.latLng(lat, lng));
    });
  }

  private trazarRuta(destino: L.LatLng): void {
    if (this.routingControl) {
      this.map.removeControl(this.routingControl); // Elimina la ruta anterior
    }

    this.routingControl = L.Routing.control({
      waypoints: [this.ubicacionActual, destino],
      routeWhileDragging: true,
      show: false // Oculta el panel de enrutamiento
    }).addTo(this.map);
  }
}
