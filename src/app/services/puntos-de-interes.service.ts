import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntosDeInteresService {
  private mostrarRutaSubject = new Subject<any>();

private puntosDeInteres: { name: string; coords: [number, number]; description?: string; tipo: string; imageUrl: string }[] = [
    // Puntos de interés
    {
      name: 'Zócalo de Iguala',
      coords: [18.3496, -99.5396],
      description: 'El centro histórico de la ciudad con jardines y la Parroquia de San Francisco.',
      tipo: 'Puntos de interés',
      imageUrl: 'https://guerrero.quadratin.com.mx/www/wp-content/uploads/2022/04/iguala13-1160x700.jpg'
    },
    {
      name: 'Laguna de Tuxpan',
      coords: [18.3665, -99.5295],
      description: 'Un hermoso cuerpo de agua ideal para paseos y actividades recreativas.',
      tipo: 'Puntos de interés',
      imageUrl: ''
    },
    {
      name: 'Cerro del Tehuehue',
      coords: [18.3600, -99.5333],
      description: 'Un mirador natural con vistas impresionantes de Iguala.',
      tipo: 'Puntos de interés',
      imageUrl: ''
    },

    // Centros Culturales
    {
      name: 'Parroquia de San Francisco de Asís',
      coords: [18.3495, -99.5398],
      description: 'Una iglesia emblemática en el corazón de Iguala.',
      tipo: 'Centros Culturales',
      imageUrl: ''
    },
    {
      name: 'Museo de la Bandera',
      coords: [18.3485, -99.5402],
      description: 'Un museo dedicado a la historia de la Bandera de México.',
      tipo: 'Centros Culturales',
      imageUrl: ''
    },
    {
      name: 'Teatro de la Ciudad',
      coords: [18.3521, -99.5422],
      description: 'Un teatro que ofrece obras de teatro y conciertos.',
      tipo: 'Centros Culturales',
      imageUrl: ''
    },

    // Comida
    {
      name: 'Restaurante El Fogoncito',
      coords: [18.3512, -99.5411],
      description: 'Un restaurante típico de Iguala con deliciosa comida.',
      tipo: 'Comida',
      imageUrl: ''
    },
    {
      name: 'Taquería La Mexicana',
      coords: [18.3521, -99.5422],
      description: 'Una taquería que ofrece tacos y otros platillos mexicanos.',
      tipo: 'Comida',
      imageUrl: ''
    },
    {
      name: 'Cafetería La Casa de los Abuelos',
      coords: [18.3555, -99.5456],
      description: 'Una cafetería que ofrece café y postres.',
      tipo: 'Comida',
      imageUrl: ''
    },

    // Hoteles
    {
      name: 'Hotel Casa Grande',
      coords: [18.3521, -99.5422],
      description: 'Un hotel cómodo y acogedor en el centro de Iguala.',
      tipo: 'Hoteles',
      imageUrl: ''
    },
    {
      name: 'Hotel La Morada',
      coords: [18.3555, -99.5456],
      description: 'Un hotel que ofrece habitaciones cómodas y un servicio amable.',
      tipo: 'Hoteles',
      imageUrl: ''
    },
    {
      name: 'Hotel El Patio',
      coords: [18.3587, -99.5469],
      description: 'Un hotel que ofrece habitaciones cómodas y un patio acogedor.',
      tipo: 'Hoteles',
      imageUrl: ''
    },

    // Centro Comercial
    {
      name: 'Centro Comercial Plaza Iguala',
      coords: [18.3555, -99.5456],
      description: 'Un centro comercial con tiendas y servicios.',
      tipo: 'Centro Comercial',
      imageUrl: ''
    },
    {
      name: 'Mercado de Artesanías',
      coords: [18.3521, -99.5422],
      description: 'Un mercado que ofrece artesanías y productos locales.',
      tipo: 'Centro Comercial',
      imageUrl: ''
    },
    {
      name: 'Tienda de Souvenirs',
      coords: [18.3512, -99.5411],
      description: 'Una tienda que ofrece souvenirs y recuerdos de Iguala.',
      tipo: 'Centro Comercial',
      imageUrl: ''
    }
  ];

  getPuntosDeInteres(): { name: string; coords: [number, number]; description?: string; tipo: string; imageUrl: string }[] {
    return this.puntosDeInteres;
  }
  getPuntosDeInteresPorTipo(tipo: string): { name: string; coords: [number, number]; description?: string; tipo: string }[] {
    return this.puntosDeInteres.filter(punto => punto.tipo === tipo);
  }
  mostrarRuta(lugar: any) {
    this.mostrarRutaSubject.next(lugar);
  }

  getMostrarRutaObservable() {
    return this.mostrarRutaSubject.asObservable();
  }
}