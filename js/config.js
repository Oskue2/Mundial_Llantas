/* =========================================================================
   MUNDIAL LLANTAS — CONFIGURACIÓN DEL SITIO
   -------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE DEBES EDITAR PARA PONER LOS DATOS REALES.
   Cambia los valores entre comillas y guarda. No toques los nombres
   que están antes de los dos puntos (whatsapp, telefono, etc.).
   ========================================================================= */

const CONFIG = {

   /* --- Nombre y frase de la marca --------------------------------------- */
   marca: 'Mundial Llantas',
   eslogan: 'Llantas, accesorios y mantenimiento para tu carro',

   /* --- WhatsApp ---------------------------------------------------------
      Formato: código de país + número, SIN espacios, SIN + y SIN guiones.
      Colombia = 57. Ejemplo: 3001234567  ->  '573001234567'            */
   whatsapp: '573203258615',

   /* Texto que aparece ya escrito cuando el cliente abre el chat.
      El nombre del producto se agrega automáticamente al final.        */
   mensajeWhatsapp: 'Hola Mundial Llantas, quiero cotizar:',

   /* --- Teléfono fijo / celular para llamar ------------------------------ */
   telefono: '+57 320 325 8615',      // como se muestra en pantalla
   telefonoLink: '+573203258615',     // como lo marca el celular

   /* --- Correo (opcional, se muestra en Contacto) ------------------------ */
   correo: 'contacto@mundialllantas.com',

   /* --- Dirección y horario ---------------------------------------------- */
   direccion: 'Cl. 14, Barrio Raicero',
   ciudad: 'Florencia, Colombia',
   horario: 'Lunes a viernes 8:00 a.m. - 6:00 p.m. · Sábados 8:00 a.m. - 2:00 p.m.',

   /* Link "Cómo llegar". Pega aquí el enlace de Google Maps del local.     */
   mapa: 'https://maps.app.goo.gl/G6HTPGJjXFQN1ooq7',

   /* --- Redes sociales (deja '' vacío para ocultar el ícono) ------------- */
   instagram: 'https://instagram.com/',
   facebook: 'https://facebook.com/',
   tiktok: '',

   /* --- Años de experiencia y datos del contador del inicio -------------- */
   stats: [
      { valor: '+15', texto: 'años en el mercado' },
      { valor: '+40', texto: 'marcas disponibles' },
      { valor: '+5.000', texto: 'clientes satisfechos' },
      { valor: '100%', texto: 'productos garantizados' }
   ]
};

/* Aviso legal que se muestra en el pie de página y en el catálogo.
   El sitio NO vende en línea: solo redirige a contacto.               */
const AVISO_PRECIOS =
   'Los precios son de referencia y pueden variar sin previo aviso. ' +
   'Este sitio es informativo: no realiza ventas ni pagos en línea. ' +
   'Confirma disponibilidad y valor final por WhatsApp o teléfono.';
