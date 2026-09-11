/* =========================================================================
   MUNDIAL LLANTAS — LÓGICA DEL SITIO
   -------------------------------------------------------------------------
   Este archivo se encarga de:
     1. Poner los datos de CONFIG (teléfono, WhatsApp, dirección) en la página
     2. Construir el catálogo y todos los filtros
     3. Menú móvil, ventana de detalle y formulario de WhatsApp
   No necesita servidor ni base de datos: todo corre en el navegador.
   ========================================================================= */

(function () {
  'use strict';

  /* ------------------------- Utilidades básicas ------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const pesos = new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  });

  /** Quita tildes y pasa a minúsculas para que la búsqueda sea flexible. */
  const normalizar = (txt) => String(txt)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

  /** Arma el enlace de WhatsApp con un mensaje ya escrito. */
  function linkWhatsapp(extra) {
    const base = CONFIG.mensajeWhatsapp || 'Hola, quiero más información';
    const texto = extra ? base + ' ' + extra : base;
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  /** Devuelve la medida de una llanta en formato 205/55 R16 */
  const medidaTexto = (p) => p.medida
    ? p.medida.ancho + '/' + p.medida.perfil + ' R' + p.medida.rin
    : (p.rin ? 'Rin ' + p.rin + '"' : '');

  const ETIQUETAS_CAT = {
    todos: 'Todos',
    llantas: 'Llantas',
    rines: 'Rines',
    accesorios: 'Accesorios',
    repuestos: 'Repuestos',
    servicios: 'Servicios'
  };

  /* ═══════════════════ 1. DATOS DE CONTACTO EN LA PÁGINA ═══════════════ */
  function aplicarConfig() {
    // Enlaces de WhatsApp repartidos por todo el sitio
    ['nav-wa', 'hero-wa', 'banda-wa', 'card-wa', 'wa-float', 'vacio-wa'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) { el.href = linkWhatsapp(''); el.target = '_blank'; el.rel = 'noopener'; }
    });

    // Teléfono
    const tel = 'tel:' + CONFIG.telefonoLink;
    $('#card-tel').href = tel;
    $('#topbar-tel').href = tel;
    $('#topbar-tel').textContent = 'Llámanos: ' + CONFIG.telefono;
    $('#txt-tel').textContent = CONFIG.telefono;
    $('#foot-tel').textContent = CONFIG.telefono;

    // WhatsApp visible
    $('#txt-wa').textContent = 'Escríbenos: ' + CONFIG.telefono;

    // Dirección, mapa y horario
    $('#card-mapa').href = CONFIG.mapa;
    $('#txt-dir').textContent = CONFIG.direccion + ' · ' + CONFIG.ciudad;
    $('#foot-dir').textContent = CONFIG.direccion + ', ' + CONFIG.ciudad;
    $('#txt-horario').textContent = CONFIG.horario;
    $('#foot-horario').textContent = CONFIG.horario;
    $('#foot-mail').textContent = CONFIG.correo;

    $('#foot-eslogan').textContent = CONFIG.eslogan;
    $('#foot-aviso').textContent = AVISO_PRECIOS;
    $('#nota-precios').textContent = AVISO_PRECIOS;
    $('#anio').textContent = new Date().getFullYear();

    // Cifras del inicio
    $('#stats-grid').innerHTML = CONFIG.stats.map((s) =>
      '<div class="stat"><b>' + s.valor + '</b><span>' + s.texto + '</span></div>'
    ).join('');

    // Redes sociales (solo se muestran las que tengan enlace)
    const ICONOS = {
      instagram: '<path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.8-.1m0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1m0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8m0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2m6.3-8.2a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0"/>',
      facebook: '<path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12"/>',
      tiktok: '<path fill="currentColor" d="M16.6 5.8a4.8 4.8 0 0 1-1-3.1h-3.3v12.9a2.4 2.4 0 1 1-1.7-2.3V9.9a5.7 5.7 0 1 0 5 5.6V9.1a7.9 7.9 0 0 0 4.6 1.5V7.3a4.7 4.7 0 0 1-3.6-1.5"/>'
    };
    const nombres = { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' };
    $('#redes').innerHTML = Object.keys(ICONOS)
      .filter((r) => CONFIG[r])
      .map((r) => '<a class="red" href="' + CONFIG[r] + '" target="_blank" rel="noopener" ' +
        'aria-label="' + nombres[r] + '"><svg viewBox="0 0 24 24" width="20" height="20">' +
        ICONOS[r] + '</svg></a>')
      .join('');
  }

  /* ══════════════════════ 2. ESTADO DE LOS FILTROS ═════════════════════ */
  const estado = {
    categoria: 'todos',
    texto: '',
    marca: '',
    ancho: '',
    perfil: '',
    rin: '',
    precioMax: 0,
    orden: 'rel'
  };

  const PRECIO_TOPE = Math.ceil(Math.max.apply(null, PRODUCTOS.map((p) => p.precio)) / 50000) * 50000;

  /* --------- Construye las opciones de los <select> y los chips --------- */
  function construirControles() {
    // Chips de categoría con su contador
    const cats = ['todos', 'llantas', 'rines', 'accesorios', 'repuestos', 'servicios'];
    $('#chips').innerHTML = cats.map((c) => {
      const n = c === 'todos' ? PRODUCTOS.length : PRODUCTOS.filter((p) => p.categoria === c).length;
      return '<button type="button" class="chip' + (c === 'todos' ? ' is-active' : '') + '" data-cat="' + c + '">' +
        ETIQUETAS_CAT[c] + '<small>' + n + '</small></button>';
    }).join('');

    // Medidas disponibles (tomadas de las llantas y los rines del catálogo)
    const unicos = (arr) => Array.from(new Set(arr)).sort((a, b) => a - b);
    const llantas = PRODUCTOS.filter((p) => p.medida);

    llenarSelect('#f-ancho', unicos(llantas.map((p) => p.medida.ancho)));
    llenarSelect('#f-perfil', unicos(llantas.map((p) => p.medida.perfil)));
    llenarSelect('#f-rin', unicos(
      llantas.map((p) => p.medida.rin).concat(PRODUCTOS.filter((p) => p.rin).map((p) => p.rin))
    ));

    // Rango de precio
    const range = $('#f-precio');
    range.max = PRECIO_TOPE;
    range.value = PRECIO_TOPE;
    estado.precioMax = PRECIO_TOPE;
    $('#precio-top').textContent = pesos.format(PRECIO_TOPE);
    $('#precio-val').textContent = pesos.format(PRECIO_TOPE);

    actualizarMarcas();
  }

  function llenarSelect(sel, valores) {
    const el = $(sel);
    el.innerHTML = '<option value="">--</option>' +
      valores.map((v) => '<option value="' + v + '">' + v + '</option>').join('');
  }

  /** Las marcas se recalculan según la categoría activa. */
  function actualizarMarcas() {
    const base = estado.categoria === 'todos'
      ? PRODUCTOS
      : PRODUCTOS.filter((p) => p.categoria === estado.categoria);

    const marcas = Array.from(new Set(base.map((p) => p.marca))).sort((a, b) => a.localeCompare(b, 'es'));
    const sel = $('#f-marca');
    const previa = estado.marca;

    sel.innerHTML = '<option value="">Todas las marcas</option>' +
      marcas.map((m) => '<option value="' + m + '">' + m + '</option>').join('');

    // Conserva la marca elegida si sigue existiendo en la categoría nueva
    if (previa && marcas.indexOf(previa) !== -1) { sel.value = previa; }
    else { estado.marca = ''; sel.value = ''; }
  }

  /** Activa o desactiva los selects de medida según la categoría. */
  function actualizarMedidas() {
    const cat = estado.categoria;
    const usaMedida = (cat === 'todos' || cat === 'llantas');
    const usaRin = usaMedida || cat === 'rines';

    $('#medidas').classList.toggle('is-off', !usaRin);
    $('#f-ancho').disabled = !usaMedida;
    $('#f-perfil').disabled = !usaMedida;
    $('#f-rin').disabled = !usaRin;

    if (!usaMedida) { estado.ancho = ''; estado.perfil = ''; $('#f-ancho').value = ''; $('#f-perfil').value = ''; }
    if (!usaRin) { estado.rin = ''; $('#f-rin').value = ''; }
  }

  /* ═════════════════════════ 3. FILTRAR Y PINTAR ═══════════════════════ */
  function filtrar() {
    const q = normalizar(estado.texto).trim();
    const palabras = q ? q.split(/\s+/) : [];

    let lista = PRODUCTOS.filter((p) => {
      if (estado.categoria !== 'todos' && p.categoria !== estado.categoria) return false;
      if (estado.marca && p.marca !== estado.marca) return false;
      if (estado.precioMax && p.precio > estado.precioMax) return false;

      // Medidas: si el usuario elige una, el producto debe tenerla
      if (estado.ancho && (!p.medida || p.medida.ancho !== +estado.ancho)) return false;
      if (estado.perfil && (!p.medida || p.medida.perfil !== +estado.perfil)) return false;
      if (estado.rin) {
        const rinProducto = p.medida ? p.medida.rin : p.rin;
        if (rinProducto !== +estado.rin) return false;
      }

      // Búsqueda por texto: deben coincidir todas las palabras
      if (palabras.length) {
        const heno = normalizar([
          p.nombre, p.marca, p.desc, ETIQUETAS_CAT[p.categoria],
          medidaTexto(p), p.etiqueta || ''
        ].join(' ')).replace(/\//g, ' ');
        return palabras.every((w) => heno.indexOf(w.replace(/\//g, ' ')) !== -1);
      }
      return true;
    });

    // Orden
    if (estado.orden === 'menor') lista.sort((a, b) => a.precio - b.precio);
    else if (estado.orden === 'mayor') lista.sort((a, b) => b.precio - a.precio);
    else if (estado.orden === 'az') lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

    pintar(lista);
  }

  function tarjeta(p) {
    const medida = medidaTexto(p);
    return '' +
      '<article class="card">' +
      '<div class="card__fig">' +
      (p.etiqueta ? '<span class="card__tag">' + p.etiqueta + '</span>' : '') +
      '<span class="card__cat">' + ETIQUETAS_CAT[p.categoria] + '</span>' +
      '<img src="assets/img/' + p.img + '" alt="' + p.nombre + '" loading="lazy" width="112" height="112">' +
      '</div>' +
      '<div class="card__body">' +
      '<span class="card__marca">' + p.marca + '</span>' +
      '<h3 class="card__nombre">' + p.nombre + '</h3>' +
      (medida ? '<span class="card__medida">' + medida + '</span>' : '') +
      '<p class="card__precio">' + pesos.format(p.precio) +
      '<small>' + (p.desde ? 'Precio desde · referencia' : 'Precio de referencia') + '</small>' +
      '</p>' +
      '<div class="card__acciones">' +
      '<a class="btn btn--primary" href="' + linkWhatsapp(p.nombre) + '" target="_blank" rel="noopener">Cotizar</a>' +
      '<button class="btn btn--ghost" type="button" data-ver="' + p.id + '">Ver</button>' +
      '</div>' +
      '</div>' +
      '</article>';
  }

  function pintar(lista) {
    const grid = $('#grid');
    const vacio = $('#vacio');

    grid.innerHTML = lista.map(tarjeta).join('');
    vacio.hidden = lista.length > 0;
    grid.hidden = lista.length === 0;

    const cat = estado.categoria === 'todos' ? 'productos' : ETIQUETAS_CAT[estado.categoria].toLowerCase();
    $('#contador').innerHTML = lista.length
      ? 'Mostrando <b>' + lista.length + '</b> ' + (lista.length === 1 ? 'resultado' : 'resultados') +
      ' en ' + cat
      : 'Sin resultados';
  }

  /* ═══════════════════════ 4. VENTANA DE DETALLE ═══════════════════════ */
  function abrirModal(id) {
    const p = PRODUCTOS.find((x) => x.id === id);
    if (!p) return;
    const medida = medidaTexto(p);

    $('#modal-cuerpo').innerHTML = '' +
      '<div class="modal__fig"><img src="assets/img/' + p.img + '" alt="' + p.nombre + '"></div>' +
      '<span class="card__marca">' + p.marca + ' · ' + ETIQUETAS_CAT[p.categoria] + '</span>' +
      '<h3 id="modal-titulo">' + p.nombre + '</h3>' +
      '<p style="color:var(--texto-2);margin:0">' + p.desc + '</p>' +
      '<p class="modal__precio">' + (p.desde ? 'Desde ' : '') + pesos.format(p.precio) + '</p>' +
      '<div class="modal__datos">' +
      (medida ? '<div><span>Medida</span><b>' + medida + '</b></div>' : '') +
      '<div><span>Marca</span><b>' + p.marca + '</b></div>' +
      '<div><span>Línea</span><b>' + ETIQUETAS_CAT[p.categoria] + '</b></div>' +
      '<div><span>Disponibilidad</span><b>Consultar existencias</b></div>' +
      '</div>' +
      '<div class="modal__acciones">' +
      '<a class="btn btn--primary btn--lg" href="' + linkWhatsapp(p.nombre) + '" target="_blank" rel="noopener">Cotizar por WhatsApp</a>' +
      '<a class="btn btn--ghost btn--lg" href="tel:' + CONFIG.telefonoLink + '">Llamar</a>' +
      '</div>' +
      '<p style="font-size:.75rem;color:var(--texto-3);margin:0">' + AVISO_PRECIOS + '</p>';

    $('#modal').hidden = false;
    document.body.classList.add('sin-scroll');
    $('.modal__x').focus();
  }

  function cerrarModal() {
    $('#modal').hidden = true;
    document.body.classList.remove('sin-scroll');
  }

  /* ══════════════════════════ 5. EVENTOS ═══════════════════════════════ */
  function eventos() {
    // --- Chips de categoría ---
    $('#chips').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      seleccionarCategoria(chip.dataset.cat);
    });

    // --- Campos del panel de filtros ---
    let timer;
    $('#q').addEventListener('input', (e) => {
      clearTimeout(timer);
      const val = e.target.value;
      timer = setTimeout(() => { estado.texto = val; filtrar(); }, 180);
    });

    $('#f-marca').addEventListener('change', (e) => { estado.marca = e.target.value; filtrar(); });
    $('#f-ancho').addEventListener('change', (e) => { estado.ancho = e.target.value; filtrar(); });
    $('#f-perfil').addEventListener('change', (e) => { estado.perfil = e.target.value; filtrar(); });
    $('#f-rin').addEventListener('change', (e) => { estado.rin = e.target.value; filtrar(); });
    $('#f-orden').addEventListener('change', (e) => { estado.orden = e.target.value; filtrar(); });

    $('#f-precio').addEventListener('input', (e) => {
      estado.precioMax = +e.target.value;
      $('#precio-val').textContent = pesos.format(estado.precioMax);
      filtrar();
    });

    // --- Limpiar filtros ---
    const limpiar = () => {
      estado.categoria = 'todos';
      estado.texto = ''; estado.marca = '';
      estado.ancho = ''; estado.perfil = ''; estado.rin = '';
      estado.precioMax = PRECIO_TOPE; estado.orden = 'rel';

      $('#q').value = '';
      $('#f-ancho').value = ''; $('#f-perfil').value = ''; $('#f-rin').value = '';
      $('#f-orden').value = 'rel';
      $('#f-precio').value = PRECIO_TOPE;
      $('#precio-val').textContent = pesos.format(PRECIO_TOPE);

      $$('.chip').forEach((c) => c.classList.toggle('is-active', c.dataset.cat === 'todos'));
      actualizarMarcas();
      actualizarMedidas();
      filtrar();
    };
    $('#limpiar').addEventListener('click', limpiar);
    $('#vacio-limpiar').addEventListener('click', limpiar);

    // --- Botones de las líneas y del footer que llevan al catálogo ---
    $$('[data-goto]').forEach((el) => {
      el.addEventListener('click', () => {
        seleccionarCategoria(el.dataset.goto);
        $('#catalogo').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // --- Ver detalle ---
    $('#grid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-ver]');
      if (btn) abrirModal(+btn.dataset.ver);
    });
    $$('[data-cerrar]').forEach((el) => el.addEventListener('click', cerrarModal));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !$('#modal').hidden) cerrarModal();
    });

    // --- Menú móvil ---
    const burger = $('#burger'), nav = $('#nav');
    burger.addEventListener('click', () => {
      const abierto = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', abierto);
      burger.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    $$('.nav__link, .nav .btn').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }));

    // --- Botón "Filtros" en celular ---
    $('#filtros-toggle').addEventListener('click', () => {
      $('#filtros').classList.toggle('is-open');
    });

    // --- Sombra del header al bajar ---
    window.addEventListener('scroll', () => {
      $('#header').classList.toggle('is-scrolled', window.scrollY > 12);
    }, { passive: true });

    // --- Enlace activo del menú según la sección visible ---
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entradas) => {
        entradas.forEach((en) => {
          if (!en.isIntersecting) return;
          $$('.nav__link').forEach((a) =>
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['inicio', 'catalogo', 'servicios', 'nosotros', 'contacto']
        .forEach((id) => { const s = document.getElementById(id); if (s) obs.observe(s); });
    }

    // --- Formulario: arma el mensaje y abre WhatsApp ---
    $('#form').addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = $('#f-nombre'), msg = $('#f-msg'), vehiculo = $('#f-vehiculo');

      [nombre, msg].forEach((c) => c.classList.toggle('campo-error', !c.value.trim()));
      if (!nombre.value.trim() || !msg.value.trim()) {
        (!nombre.value.trim() ? nombre : msg).focus();
        return;
      }

      let texto = 'Hola, soy ' + nombre.value.trim() + '. ';
      if (vehiculo.value.trim()) texto += 'Mi vehículo es un ' + vehiculo.value.trim() + '. ';
      texto += msg.value.trim();

      window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }

  function seleccionarCategoria(cat) {
    if (!ETIQUETAS_CAT[cat]) return;
    estado.categoria = cat;
    $$('.chip').forEach((c) => c.classList.toggle('is-active', c.dataset.cat === cat));
    actualizarMarcas();
    actualizarMedidas();
    filtrar();
  }

  /* ═══════════════════════════ 6. ARRANQUE ═════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    aplicarConfig();
    construirControles();
    actualizarMedidas();
    eventos();
    filtrar();
  });
})();
