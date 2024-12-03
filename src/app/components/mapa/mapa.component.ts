import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'; // Importa la biblioteca de enrutamiento
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { PuntosDeInteresService } from '../../services/puntos-de-interes.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private puntosDeInteres!: any[];
  private ubicacionActual!: L.LatLng;
  private ubicacionMarker!: L.Marker; // Para actualizar la ubicación en tiempo real
  private locationWatchId!: number; // ID para detener el watch

  constructor(private puntosDeInteresService: PuntosDeInteresService) {}

  ngOnInit(): void {
    this.initMap();
    this.cargarPuntosDeInteres();
  }

  ngOnDestroy(): void {
    if (this.locationWatchId) {
      navigator.geolocation.clearWatch(this.locationWatchId);
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [18.3496, -99.5396],  // Ubicación inicial (ejemplo: Cuernavaca)
      zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.obtenerUbicacionActual();  // Inicia la geolocalización
  }

  private obtenerUbicacionActual(): void {
    if (navigator.geolocation) {
      this.locationWatchId = navigator.geolocation.watchPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = position.coords.accuracy; // Precisión en metros
          this.ubicacionActual = L.latLng(lat, lng);

          if (accuracy > 50) {
            console.warn(`Precisión baja: ${accuracy} metros. La ubicación puede no ser exacta.`);
          }

          if (this.ubicacionMarker) {
            this.ubicacionMarker.setLatLng(this.ubicacionActual);
          } else {
            const usuarioIcon = L.icon({
              iconUrl: 'https://uploads.turbologo.com/uploads/design/hq_preview_image/4491376/draw_svg20210511-18666-61ytug.svg.png',
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            });

            this.ubicacionMarker = L.marker(this.ubicacionActual, { icon: usuarioIcon }).addTo(this.map);
          }

          this.map.setView(this.ubicacionActual, 14);

          console.log(`Ubicación actual: (${lat}, ${lng}), Precisión: ${accuracy} metros`);

          this.mostrarPuntosDeInteresEnMapa();
        },
        error => {
          console.error('Error al obtener la ubicación:', error);
          Swal.fire({
            title: 'Error de geolocalización',
            text: 'No se pudo obtener la ubicación actual. Asegúrate de haber habilitado los permisos de ubicación.',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // Incrementa el tiempo de espera
          maximumAge: 0 // Evitar usar la ubicación en caché
        }
      );
    } else {
      Swal.fire({
        title: 'Geolocalización no soportada',
        text: 'Tu navegador no soporta la geolocalización.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
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
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/10007/10007695.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    this.puntosDeInteres.forEach(punto => {
      const puntoLatLng = L.latLng(punto.coords[0], punto.coords[1]);

      const distancia = this.ubicacionActual
        ? this.ubicacionActual.distanceTo(puntoLatLng) / 1000 // Conversión a kilómetros
        : 0;

      const marker = L.marker(puntoLatLng, { icon: puntosDeInteresIcon }).addTo(this.map);

      marker.bindPopup(
        `<strong>${punto.name}</strong><br>Distancia: ${distancia.toFixed(2)} km<br>
        <button id="traceRouteBtn" data-lat="${punto.coords[0]}" data-lng="${punto.coords[1]}">
          Trazar Ruta
        </button>`
      );

      marker.on('popupopen', () => {
        const button = document.getElementById('traceRouteBtn')!;
        button.addEventListener('click', () => {
          const lat = parseFloat(button.getAttribute('data-lat')!);
          const lng = parseFloat(button.getAttribute('data-lng')!);
          this.trazarRuta(L.latLng(lat, lng));
        });
      });
    });
  }

  private trazarRuta(destino: L.LatLng): void {
    const routingControl = L.Routing.control({
      waypoints: [this.ubicacionActual, destino],
      routeWhileDragging: true,
      show: false,
      formatter: new L.Routing.Formatter({
        language: 'es',
        units: 'imperial',
        distanceTemplate: '{distance} {unit}'
      })
    });
  
    routingControl.getPlan().setWaypoints([this.ubicacionActual, destino]);
    routingControl.addTo(this.map);
  }

}
