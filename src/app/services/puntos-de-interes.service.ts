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
      name : 'Universidad Tecnologica',
      coords: [18.367023704666483, -99.53390347273655],
      description : 'Ubicacion Actual',
      tipo: 'Escuela',
      imageUrl : 'https://lh5.googleusercontent.com/p/AF1QipM4EyzbK_6POAxCGMPZviJkUM4u1P8i8memo9au=w408-h306-k-no'

    },
    {
      name: 'Zócalo de Iguala',
      coords: [18.34531328176439, -99.54051247089704]
      ,
      description: 'El centro histórico de la ciudad con jardines y la Parroquia de San Francisco.',
      tipo: 'Puntos de interés',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPYCGz5uMCSOkMt3ZmSCSiw1VU4GkQIaW4CYPaW=w408-h272-k-no'
    },
    {
      name: 'Laguna de Tuxpan',
      coords: [18.35621739748376, -99.49114395980969]
,
      description: 'Un hermoso cuerpo de agua ideal para paseos y actividades recreativas.',
      tipo: 'Puntos de interés',
      imageUrl: 'https://i.pinimg.com/originals/e4/00/f0/e400f05ab69ee7b250aaa394a1d0e816.jpg'
    },
    {
      name: 'Cerro del Tehuehue',
      coords: [18.329496782212335, -99.53291256460756]
,
      description: 'Un mirador natural con vistas impresionantes de Iguala.',
      tipo: 'Puntos de interés',
      imageUrl: 'https://www.diariodequeretaro.com.mx/incoming/jdi5ww-bandera-cerro-tehuehe-en-iguala.jpg/ALTERNATES/LANDSCAPE_1140/Bandera%20Cerro%20Tehuehe,%20en%20Iguala.jpg'
    },

    // Centros Culturales
    {
      name: 'Parroquia de San Francisco de Asís',
      coords: [18.345062697861554, -99.53927370887995]
,
      description: 'Una iglesia emblemática en el corazón de Iguala.',
      tipo: 'Centros Culturales',
      imageUrl: 'https://c2.staticflickr.com/6/5055/5455137944_f19a5a5613_b.jpg' 
    },
    {
      name: 'Museo de la Bandera',
      coords: [18.345052017616513, -99.54111346052763]
,
      description: 'Un museo dedicado a la historia de la Bandera de México.',
      tipo: 'Centros Culturales',
      imageUrl: 'https://live.staticflickr.com/2629/3975189367_9a6e06283e_b.jpg'
    },
    {
      name: 'Resinto Ferial',
      coords: [18.35566141555435, -99.52215696124682]
    ,
      description: 'Un Local donde se ubica en el mes de Febrero una Feria a la Bandera ',
      tipo: 'Centros Culturales',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipNLgmtbnfMLKP-7_VrqG9NPXjG5ubU5ACJGlvA=w408-h306-k-no'
    },

    // Comida
    {
      name: 'Los Laureles',
      coords: [18.346004235064115, -99.54006301505069]
      ,
      description: 'Un restaurante típico de Iguala con deliciosa comida.',
      tipo: 'Comida',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipMV149axGglfi-NXPxe-6S4dQa-WRITMmz8PX53=w408-h306-k-no'
    },
    {
      name: 'El Taxqueño',
      coords: [18.34877413082951, -99.53911887754144]
,
      description: 'Una taquería que ofrece tacos y otros platillos mexicanos.',
      tipo: 'Comida',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipOBn-YimL6ncm5ETrLL2ULYv9BfGPZH0E3T0v3x=w408-h725-k-no'
    },
    {
      name: 'Torteria El Cuais',
      coords: [18.344456332795, -99.53941928493076]
,
      description: 'Una torteria y jugueria.',
      tipo: 'Comida',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipOncMxsuBL2ePfqQ4RiyfitmWxSwXrQvdePqc1h=w408-h306-k-no'
    },

    // Hoteles
    {
      name: 'Hotel Real 1900',
      coords: [18.345475797406138, -99.53731642451532]
      ,
      description: 'Un hotel cómodo y acogedor en el centro de Iguala.',
      tipo: 'Hoteles',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipMvrEvSOdFnZ86MqPZR-Md53JQEZ8TdC6eDGrQ7=w408-h272-k-no'
    },
    {
      name: 'Hotel Maria Isabel',
      coords: [18.345923873161126, -99.54044924443234]
,
      description: 'Un hotel que ofrece habitaciones cómodas y un servicio amable.',
      tipo: 'Hoteles',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPamtjEQPoTRmAhWl_HlbOGUo9L0ynGwmlcMP_r=w408-h725-k-no'
    },
    {
      name: 'Hotel Maria Luisa',
      coords: [18.343520544150365, -99.53379736652637]
,
      description: 'Un hotel que ofrece habitaciones cómodas y un patio acogedor.',
      tipo: 'Hoteles',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPPBXFClphTnwCe-oQgF2NzuZGO4HOh5i3HBB92=w493-h240-k-no'
    },

    // Centro Comercial
    {
      name: 'Centro Comercial Plaza Iguala',
      coords: [18.343671343445102, -99.52122809190021]
,
      description: 'Un centro comercial con tiendas y servicios.',
      tipo: 'Centro Comercial',
      imageUrl: 'https://www.galeriastamarindos.com/wp-content/uploads/2021/10/3.2-1-1536x864.jpg'
    },
    {
      name: 'Casa de Piedra',
      coords: [18.34604496914711, -99.53731643320565]
,
      description: 'Un mercado que ofrece artesanías y productos locales.',
      tipo: 'Centro Comercial',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipNF03ch2OAbU6-n93FvjrEmlwVuaDW9z5-TW54p=w408-h544-k-no'
    },
    {
      name: 'Plaza PeriNorte',
      coords: [18.354316813238924, -99.52616126962626]
      ,
      description: 'Una tienda que ofrece tiendas de ropa y restaurantes de alitas',
      tipo: 'Centro Comercial',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPJ7FDC_g_gDs9PhNbcspz-lBm6m7uLudK1cS3J=w408-h725-k-no'
    },
    {
      name: 'Casa Cuernavaca',
      coords: [18.93879564901335, -99.24570377842785],
      description:'Casa de Familia en cuernavaca',
      tipo:'Casa',
      imageUrl:'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=SI7-ZD0LjSxka3DaQdfFwA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=277.36768&pitch=0&thumbfov=100'}

    
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