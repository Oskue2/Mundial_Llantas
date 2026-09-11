/* =========================================================================
   CATÁLOGO DE PRODUCTOS Y SERVICIOS
   -------------------------------------------------------------------------
   Para agregar un producto, copia un bloque { ... } completo, pégalo
   debajo y cambia los datos. Recuerda dejar la coma entre bloques.

   categoria : 'llantas' | 'rines' | 'accesorios' | 'repuestos' | 'servicios'
   precio    : número sin puntos ni signo $ (ejemplo: 350000)
   desde     : true  -> muestra "Desde $..."  (útil para servicios)
   medida    : solo para llantas -> { ancho: 205, perfil: 55, rin: 16 }
   rin       : solo para rines   -> 17
   etiqueta  : texto pequeño de la esquina ('Más vendido', 'Oferta', ...)
   img       : archivo dentro de assets/img/
   ========================================================================= */

const PRODUCTOS = [

  /* ------------------------------ LLANTAS ------------------------------ */
  { id: 1, nombre: 'Llanta Michelin Energy XM2+', categoria: 'llantas', marca: 'Michelin',
    precio: 349900, medida: { ancho: 185, perfil: 65, rin: 15 }, img: 'llanta.svg',
    etiqueta: 'Más vendido',
    desc: 'Alto rendimiento en piso mojado y larga duración para uso urbano diario.' },

  { id: 2, nombre: 'Llanta Bridgestone Turanza T005', categoria: 'llantas', marca: 'Bridgestone',
    precio: 419900, medida: { ancho: 195, perfil: 55, rin: 16 }, img: 'llanta.svg',
    desc: 'Confort de marcha silencioso y frenado corto en carretera.' },

  { id: 3, nombre: 'Llanta Goodyear Assurance MaxLife', categoria: 'llantas', marca: 'Goodyear',
    precio: 389900, medida: { ancho: 205, perfil: 55, rin: 16 }, img: 'llanta.svg',
    etiqueta: 'Oferta',
    desc: 'Diseñada para máximo kilometraje sin sacrificar agarre.' },

  { id: 4, nombre: 'Llanta Pirelli Cinturato P7', categoria: 'llantas', marca: 'Pirelli',
    precio: 529900, medida: { ancho: 225, perfil: 45, rin: 17 }, img: 'llanta.svg',
    desc: 'Perfil bajo deportivo con excelente respuesta en curva.' },

  { id: 5, nombre: 'Llanta Continental PowerContact 2', categoria: 'llantas', marca: 'Continental',
    precio: 299900, medida: { ancho: 175, perfil: 70, rin: 13 }, img: 'llanta.svg',
    desc: 'Opción económica y resistente para carros de ciudad.' },

  { id: 6, nombre: 'Llanta Hankook Kinergy Eco2', categoria: 'llantas', marca: 'Hankook',
    precio: 319900, medida: { ancho: 185, perfil: 60, rin: 14 }, img: 'llanta.svg',
    desc: 'Baja resistencia a la rodadura: ayuda a reducir consumo de combustible.' },

  { id: 7, nombre: 'Llanta Yokohama BluEarth GT', categoria: 'llantas', marca: 'Yokohama',
    precio: 469900, medida: { ancho: 215, perfil: 60, rin: 17 }, img: 'llanta.svg',
    desc: 'Equilibrio entre confort, duración y estabilidad a alta velocidad.' },

  { id: 8, nombre: 'Llanta Firestone Destination A/T', categoria: 'llantas', marca: 'Firestone',
    precio: 749900, medida: { ancho: 265, perfil: 70, rin: 16 }, img: 'llanta.svg',
    etiqueta: 'Camioneta',
    desc: 'Todo terreno para camioneta: tracción en trocha y comportamiento estable en asfalto.' },

  { id: 9, nombre: 'Llanta Toyo Open Country A/T III', categoria: 'llantas', marca: 'Toyo',
    precio: 879900, medida: { ancho: 265, perfil: 65, rin: 17 }, img: 'llanta.svg',
    desc: 'Taco agresivo, flancos reforzados y gran resistencia al corte.' },

  { id: 10, nombre: 'Llanta Kumho Ecsta HS51', categoria: 'llantas', marca: 'Kumho',
    precio: 559900, medida: { ancho: 235, perfil: 45, rin: 18 }, img: 'llanta.svg',
    desc: 'Compuesto deportivo con muy buen agarre en seco.' },

  { id: 11, nombre: 'Llanta Michelin Primacy 4', categoria: 'llantas', marca: 'Michelin',
    precio: 699900, medida: { ancho: 235, perfil: 60, rin: 18 }, img: 'llanta.svg',
    desc: 'Seguridad en mojado desde la primera hasta la última vuelta.' },

  { id: 12, nombre: 'Llanta Bridgestone Dueler H/T', categoria: 'llantas', marca: 'Bridgestone',
    precio: 819900, medida: { ancho: 245, perfil: 65, rin: 17 }, img: 'llanta.svg',
    desc: 'Highway terrain para SUV: silenciosa y de desgaste parejo.' },

  /* -------------------------------- RINES ------------------------------ */
  { id: 13, nombre: 'Rin deportivo aluminio 15"', categoria: 'rines', marca: 'Genérico',
    precio: 289900, rin: 15, img: 'rin.svg',
    desc: 'Rin de aluminio liviano, acabado negro satinado. Precio por unidad.' },

  { id: 14, nombre: 'Rin deportivo aluminio 16"', categoria: 'rines', marca: 'Genérico',
    precio: 339900, rin: 16, img: 'rin.svg',
    etiqueta: 'Más vendido',
    desc: 'Diseño de 5 rayos, alto brillo. Consulta el patrón de tornillos.' },

  { id: 15, nombre: 'Rin racing 17" doble tono', categoria: 'rines', marca: 'Genérico',
    precio: 429900, rin: 17, img: 'rin.svg',
    desc: 'Acabado negro con labio pulido, ideal para perfil bajo.' },

  { id: 16, nombre: 'Rin camioneta 18" off-road', categoria: 'rines', marca: 'Genérico',
    precio: 549900, rin: 18, img: 'rin.svg',
    desc: 'Rin reforzado para uso mixto en camioneta y SUV.' },

  /* ------------------------------ REPUESTOS ---------------------------- */
  { id: 17, nombre: 'Batería Mac 12V 60Ah', categoria: 'repuestos', marca: 'Mac',
    precio: 429900, img: 'bateria.svg', etiqueta: 'Garantía 12 meses',
    desc: 'Libre de mantenimiento. Incluye instalación en el local.' },

  { id: 18, nombre: 'Batería Willard 12V 75Ah', categoria: 'repuestos', marca: 'Willard',
    precio: 549900, img: 'bateria.svg',
    desc: 'Mayor arranque en frío, recomendada para camionetas.' },

  { id: 19, nombre: 'Aceite Mobil Super 20W-50 (cuarto)', categoria: 'repuestos', marca: 'Mobil',
    precio: 42900, img: 'aceite.svg',
    desc: 'Aceite mineral para motores a gasolina de alto kilometraje.' },

  { id: 20, nombre: 'Aceite Castrol GTX 10W-40 sintético', categoria: 'repuestos', marca: 'Castrol',
    precio: 69900, img: 'aceite.svg',
    desc: 'Semisintético con protección extra contra lodos.' },

  { id: 21, nombre: 'Filtro de aceite Fram', categoria: 'repuestos', marca: 'Fram',
    precio: 32900, img: 'filtro.svg',
    desc: 'Compatible con la mayoría de motores japoneses y coreanos.' },

  { id: 22, nombre: 'Filtro de aire Bosch', categoria: 'repuestos', marca: 'Bosch',
    precio: 48900, img: 'filtro.svg',
    desc: 'Mejora el flujo de aire y protege el motor del polvo.' },

  { id: 23, nombre: 'Pastillas de freno Brembo', categoria: 'repuestos', marca: 'Brembo',
    precio: 189900, img: 'freno.svg', etiqueta: 'Recomendado',
    desc: 'Juego delantero. Frenado firme y bajo nivel de polvo.' },

  { id: 24, nombre: 'Amortiguador Monroe delantero', categoria: 'repuestos', marca: 'Monroe',
    precio: 259900, img: 'accesorio.svg',
    desc: 'Precio por unidad. Recomendamos cambiarlos por pares.' },

  /* ----------------------------- ACCESORIOS ---------------------------- */
  { id: 25, nombre: 'Bombillo LED H4 6000K (par)', categoria: 'accesorios', marca: 'Osram',
    precio: 129900, img: 'luz.svg', etiqueta: 'Nuevo',
    desc: 'Luz blanca de alta visibilidad, instalación tipo plug and play.' },

  { id: 26, nombre: 'Exploradoras LED barra 10"', categoria: 'accesorios', marca: 'Genérico',
    precio: 219900, img: 'luz.svg',
    desc: 'Ideal para camioneta. Incluye soportes y arnés.' },

  { id: 27, nombre: 'Juego de tapetes de caucho', categoria: 'accesorios', marca: 'Genérico',
    precio: 89900, img: 'accesorio.svg',
    desc: 'Cuatro piezas, bordes altos, fáciles de lavar.' },

  { id: 28, nombre: 'Forro de timón cuero sintético', categoria: 'accesorios', marca: 'Genérico',
    precio: 39900, img: 'accesorio.svg',
    desc: 'Antideslizante, disponible en negro y negro con costura roja.' },

  { id: 29, nombre: 'Plumillas limpiaparabrisas (par)', categoria: 'accesorios', marca: 'Bosch',
    precio: 59900, img: 'accesorio.svg',
    desc: 'Barrido silencioso. Te ayudamos a elegir la medida exacta.' },

  { id: 30, nombre: 'Gato hidráulico tipo botella 2 ton', categoria: 'accesorios', marca: 'Genérico',
    precio: 109900, img: 'accesorio.svg',
    desc: 'Compacto y resistente, indispensable en el baúl.' },

  { id: 31, nombre: 'Kit de carretera reglamentario', categoria: 'accesorios', marca: 'Genérico',
    precio: 79900, img: 'accesorio.svg', etiqueta: 'Obligatorio',
    desc: 'Conos, chaleco, extintor, botiquín, tacos y herramienta básica.' },

  { id: 32, nombre: 'Cera y kit de brillo 3M', categoria: 'accesorios', marca: '3M',
    precio: 74900, img: 'accesorio.svg',
    desc: 'Limpia, protege la pintura y realza el color.' },

  /* ------------------------------ SERVICIOS ---------------------------- */
  { id: 33, nombre: 'Montaje y balanceo de llantas', categoria: 'servicios', marca: 'Servicio',
    precio: 25000, desde: true, img: 'servicio.svg', etiqueta: 'Por llanta',
    desc: 'Desmontaje, montaje, balanceo computarizado y válvula nueva.' },

  { id: 34, nombre: 'Alineación computarizada', categoria: 'servicios', marca: 'Servicio',
    precio: 75000, desde: true, img: 'servicio.svg',
    desc: 'Ajuste de convergencia, camber y caster con equipo digital.' },

  { id: 35, nombre: 'Cambio de aceite y filtro', categoria: 'servicios', marca: 'Servicio',
    precio: 95000, desde: true, img: 'aceite.svg',
    desc: 'Incluye mano de obra y revisión de niveles. Aceite según el motor.' },

  { id: 36, nombre: 'Revisión y cambio de frenos', categoria: 'servicios', marca: 'Servicio',
    precio: 80000, desde: true, img: 'freno.svg',
    desc: 'Diagnóstico de pastillas, discos y líquido de frenos.' },

  { id: 37, nombre: 'Rotación de llantas', categoria: 'servicios', marca: 'Servicio',
    precio: 40000, desde: true, img: 'llanta.svg',
    desc: 'Prolonga la vida útil del juego completo. Recomendada cada 10.000 km.' },

  { id: 38, nombre: 'Diagnóstico electrónico', categoria: 'servicios', marca: 'Servicio',
    precio: 60000, desde: true, img: 'bateria.svg',
    desc: 'Lectura de códigos de falla con escáner y reporte del estado.' }
];
