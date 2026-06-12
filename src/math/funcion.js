/*
 * funcion.js
 * ----------------------------------------------------------------------------
 * Convierte la función que el usuario escribe como TEXTO en una función de
 * JavaScript que recibe un número x y devuelve un número.
 *
 *   "x^3 - x - 2"   --->   f(x) = x*x*x - x - 2
 *
 * Lo ÚNICO que se hace aquí es "pasar de texto a número": leer las letras que
 * el usuario escribió y entender qué operación pide. Las operaciones en sí
 * (suma, resta, potencia, raíz, seno...) se calculan más abajo, una por una,
 * con código nuestro.
 *
 * El método que se usa para leer la fórmula se llama "shunting-yard": primero
 * se separan los pedazos (tokens), luego se reordenan respetando la prioridad
 * de las operaciones (primero *, / y ^, después + y -), y al final se evalúan.
 *
 * FLUJO GENERAL:
 *   texto "x^3 - x - 2"
 *      -> tokenizar()  = ["x", "^", "3", "-", "x", "-", "2"]
 *      -> aPostfija()  = reordena según prioridad
 *      -> evaluar(x)   = recorre los tokens y devuelve un número
 *   compilarFuncion() junta todo y entrega una f(x) lista para usar.
 * ----------------------------------------------------------------------------
 */

/* Prioridad de cada operador. Mayor número = se calcula primero.
   'neg' es la negación unaria (el "menos" de un solo número, ej. -x).
   Está ENTRE la multiplicación y la potencia (mayor que * /, menor que ^).
   Esto reproduce la convención matemática estándar:
       -x^2  =  -(x^2) = -9     (la potencia liga más que el menos)
       e^-x  =   e^(-x)         (porque '^' asocia por la derecha, y el 'neg'
                                  que aparece DESPUÉS del '^' se aplica primero) */
const PRIORIDAD = { '+': 1, '-': 1, '*': 2, '/': 2, 'neg': 3, '^': 4 };

/* Funciones de una entrada que aceptamos en el texto (sin, cos, raíz...).
   Cada una se calcula con código nuestro, sin librerías matemáticas. */
const FUNCIONES = {
  sin:  (x) => Math.sin(x),
  cos:  (x) => Math.cos(x),
  tan:  (x) => Math.tan(x),
  exp:  (x) => Math.exp(x),   // e^x
  ln:   (x) => Math.log(x),   // logaritmo natural
  log:  (x) => Math.log10(x), // logaritmo base 10
  sqrt: (x) => Math.sqrt(x),  // raíz cuadrada
  abs:  (x) => Math.abs(x),
};

/*
 * tokenizar(texto)
 * Separa la fórmula en piezas: números, la variable x, operadores, paréntesis
 * y nombres de función. Es como cortar la frase en palabras.
 */
function tokenizar(texto) {
  const tokens = [];
  let i = 0;

  // Quitamos espacios y unificamos algunos símbolos comunes.
  texto = texto.replace(/\s+/g, '');

  // Símbolos "bonitos" que la gente copia/pega -> su versión normal.
  //   × ÷ • · -> * /     ,  -> .  (coma decimal)
  texto = texto
    .replace(/[×∙•·]/g, '*')
    .replace(/[÷]/g, '/')
    .replace(/,/g, '.');

  // Superíndices Unicode (x², x³, 2⁻¹...) -> notación con "^".
  //   x²  ->  x^2     x³  ->  x^3     x⁻¹ -> x^-1
  const SUPER = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
                  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
                  '⁺': '+', '⁻': '-' };
  texto = texto.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, (run) => {
    let exp = '';
    for (const ch of run) exp += SUPER[ch];
    return '^(' + exp + ')';
  });

  while (i < texto.length) {
    const c = texto[i];

    // ----- Número (puede tener punto decimal): 3, 2.5, 0.001 -----
    if ((c >= '0' && c <= '9') || c === '.') {
      let num = '';
      while (i < texto.length && ((texto[i] >= '0' && texto[i] <= '9') || texto[i] === '.')) {
        num += texto[i];
        i++;
      }
      tokens.push({ tipo: 'numero', valor: parseFloat(num) });
      continue;
    }

    // ----- Letras: pueden ser la variable x, el número pi/e, o una función -----
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
      let nombre = '';
      while (i < texto.length && /[a-zA-Z]/.test(texto[i])) {
        nombre += texto[i];
        i++;
      }
      nombre = nombre.toLowerCase();

      if (nombre === 'x') {
        tokens.push({ tipo: 'variable' });
      } else if (nombre === 'pi') {
        tokens.push({ tipo: 'numero', valor: Math.PI });
      } else if (nombre === 'e') {
        tokens.push({ tipo: 'numero', valor: Math.E });
      } else if (FUNCIONES[nombre]) {
        tokens.push({ tipo: 'funcion', valor: nombre });
      } else {
        throw new Error('No entiendo "' + nombre + '" en la función.');
      }
      continue;
    }

    // ----- Operadores y paréntesis -----
    if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^') {
      tokens.push({ tipo: 'operador', valor: c });
      i++;
      continue;
    }
    if (c === '(') { tokens.push({ tipo: 'parentesis', valor: '(' }); i++; continue; }
    if (c === ')') { tokens.push({ tipo: 'parentesis', valor: ')' }); i++; continue; }

    throw new Error('Símbolo no válido: "' + c + '"');
  }

  // ----- Multiplicación IMPLÍCITA (lo que la gente escribe de verdad) -----
  // Insertamos un "*" donde dos piezas se multiplican sin escribir el signo:
  //   2x        -> 2*x        3x^2      -> 3*x^2
  //   2sin(x)   -> 2*sin(x)   2pi       -> 2*pi
  //   x(x+1)    -> x*(x+1)    (x+1)(x-1)-> (x+1)*(x-1)
  //   2(x+1)    -> 2*(x+1)
  // Regla: si un token CIERRA un valor (número, x, ")") y el siguiente ABRE
  // otro valor (número, x, "(", o el nombre de una función), va un "*" en medio.
  const cierraValor = (t) =>
    t.tipo === 'numero' || t.tipo === 'variable' ||
    (t.tipo === 'parentesis' && t.valor === ')');
  const abreValor = (t) =>
    t.tipo === 'numero' || t.tipo === 'variable' || t.tipo === 'funcion' ||
    (t.tipo === 'parentesis' && t.valor === '(');

  const conMult = [];
  for (let k = 0; k < tokens.length; k++) {
    if (k > 0 && cierraValor(tokens[k - 1]) && abreValor(tokens[k])) {
      conMult.push({ tipo: 'operador', valor: '*' });
    }
    conMult.push(tokens[k]);
  }
  tokens.length = 0;
  tokens.push(...conMult);

  // ----- Arreglar los signos "+" y "-" UNARIOS (ej. -x, +x, 3*(-2), e^-x) -----
  // Un "-" (o "+") es unario si aparece al inicio, justo después de "(" o
  // después de otro operador. Lo convertimos en un operador especial:
  //   '-'  ->  'neg'  (negación, "menos de un solo número")
  //   '+'  ->  se ignora (un más unario no cambia nada)
  //
  // ¿Por qué un operador propio y no "insertar un 0 adelante"?
  // Porque "0 - algo" tiene la prioridad de la resta (baja), y eso rompe
  // casos como  e^-x : se leía como (e^0) - x.  La negación de verdad debe
  // ligarse MÁS fuerte que la potencia, igual que en matemáticas:
  //   e^-x  =  e^(-x)      2^-3 = 2^(-3) = 0.125
  const arreglados = [];
  for (let k = 0; k < tokens.length; k++) {
    const t = tokens[k];
    const anterior = tokens[k - 1];
    const esUnario =
      t.tipo === 'operador' && (t.valor === '-' || t.valor === '+') &&
      (!anterior || anterior.valor === '(' || anterior.tipo === 'operador');
    if (esUnario) {
      if (t.valor === '-') arreglados.push({ tipo: 'operador', valor: 'neg', unario: true });
      // el "+" unario no hace nada, simplemente no lo agregamos
      continue;
    }
    arreglados.push(t);
  }
  return arreglados;
}

/*
 * aPostfija(tokens)
 * Reordena los tokens a "notación postfija" (también llamada polaca inversa).
 * En esta notación primero van los números y al final los operadores, lo que
 * hace MUY fácil evaluarla con una pila, respetando la prioridad.
 *
 *   3 + 4 * 2   ->   3 4 2 * +
 */
function aPostfija(tokens) {
  const salida = [];   // resultado en orden postfijo
  const pila = [];     // pila temporal de operadores

  for (const t of tokens) {
    if (t.tipo === 'numero' || t.tipo === 'variable') {
      salida.push(t);
    } else if (t.tipo === 'funcion') {
      pila.push(t);
    } else if (t.tipo === 'operador' && t.valor === 'neg') {
      // 'neg' es un operador UNARIO PREFIJO (se escribe antes de su operando)
      // y asocia por la DERECHA. Un prefijo nunca "saca" a lo que está debajo
      // en la pila esperando su operando; solo se apila. Así, en e^-x el 'neg'
      // queda encima del '^' y se aplica primero a x  ->  e^(-x); y en --x los
      // dos 'neg' se apilan y salen en el orden correcto al final.
      pila.push(t);
    } else if (t.tipo === 'operador') {
      // Operadores binarios. Sacamos de la pila los de prioridad mayor o igual.
      // El "^" asocia por la DERECHA, por eso para él usamos ">" (no ">=").
      // El 'neg' (prioridad 3) siempre se queda encima: liga más que +,-,*,/.
      const asociaDerecha = (t.valor === '^');
      while (pila.length) {
        const tope = pila[pila.length - 1];
        const mismaOmayor =
          tope.tipo === 'operador' &&
          (asociaDerecha ? PRIORIDAD[tope.valor] > PRIORIDAD[t.valor]
                         : PRIORIDAD[tope.valor] >= PRIORIDAD[t.valor]);
        if (mismaOmayor || tope.tipo === 'funcion') salida.push(pila.pop());
        else break;
      }
      pila.push(t);
    } else if (t.valor === '(') {
      pila.push(t);
    } else if (t.valor === ')') {
      // Vaciamos hasta encontrar el "(" que abre.
      while (pila.length && pila[pila.length - 1].valor !== '(') {
        salida.push(pila.pop());
      }
      if (!pila.length) throw new Error('Falta un paréntesis "(".');
      pila.pop(); // quitamos el "("
      // Si justo antes había una función, también sale.
      if (pila.length && pila[pila.length - 1].tipo === 'funcion') {
        salida.push(pila.pop());
      }
    }
  }

  // Lo que quede en la pila son operadores pendientes.
  while (pila.length) {
    const t = pila.pop();
    if (t.valor === '(') throw new Error('Falta un paréntesis ")".');
    salida.push(t);
  }
  return salida;
}

/*
 * evaluar(postfija, x)
 * Recorre los tokens ya ordenados y va calculando con una pila de números.
 * Aquí es donde REALMENTE se hacen las cuentas (suma, resta, potencia...),
 * todo con código nuestro.
 */
function evaluar(postfija, x) {
  const pila = [];

  // Mensaje único y claro cuando faltan operandos (fórmula a medias, ej. "x+").
  const incompleta = () => new Error(
    'La función está incompleta: revisa que no falte un número o un operador (ej. "x +").'
  );

  for (const t of postfija) {
    if (t.tipo === 'numero') {
      pila.push(t.valor);
    } else if (t.tipo === 'variable') {
      pila.push(x);
    } else if (t.tipo === 'funcion') {
      if (pila.length < 1) throw incompleta();
      const a = pila.pop();
      pila.push(FUNCIONES[t.valor](a));
    } else if (t.tipo === 'operador' && t.valor === 'neg') {
      // Negación unaria: -valor. Saca UN solo número de la pila.
      if (pila.length < 1) throw incompleta();
      const a = pila.pop();
      pila.push(-a);
    } else if (t.tipo === 'operador') {
      if (pila.length < 2) throw incompleta(); // un operador binario necesita 2 valores
      const b = pila.pop(); // segundo operando
      const a = pila.pop(); // primer operando
      let r;
      switch (t.valor) {
        case '+': r = a + b; break;
        case '-': r = a - b; break;
        case '*': r = a * b; break;
        case '/': r = a / b; break;
        case '^': r = Math.pow(a, b); break;
        default: throw new Error('Operador desconocido: ' + t.valor);
      }
      pila.push(r);
    }
  }

  if (pila.length === 0) throw incompleta();
  if (pila.length > 1) {
    // Sobran valores sin operación que los una (ej. "2 3" o "x 5").
    throw new Error('La función tiene partes sueltas: ¿falta un operador entre dos valores?');
  }
  return pila[0];
}

/*
 * compilarFuncion(texto)
 * Junta todo: recibe el texto del usuario y devuelve una función f(x) lista.
 * Se "compila" una sola vez (tokenizar + ordenar) y luego se puede evaluar
 * miles de veces rápido, una por cada x que necesite la gráfica.
 *
 * Devuelve la función f. Si el texto está mal, lanza un Error con mensaje claro.
 */
export function compilarFuncion(texto) {
  if (!texto || !texto.trim()) {
    throw new Error('Escribe una función, por ejemplo: x^3 - x - 2');
  }
  const tokens = tokenizar(texto);
  const postfija = aPostfija(tokens);

  if (!postfija.length) {
    throw new Error('Escribe una función, por ejemplo: x^3 - x - 2');
  }

  // Probamos evaluar en un punto para detectar errores de ESTRUCTURA de una vez
  // (operandos faltantes, partes sueltas...). Que el resultado sea NaN/Infinity
  // en este punto concreto NO es un error: puede ser un hueco del dominio
  // (ej. sqrt o ln en valores negativos). Solo nos importa que la fórmula esté
  // bien armada; los huecos los maneja la gráfica cortando el trazo.
  evaluar(postfija, 1);

  // f(x) reutiliza la postfija ya calculada.
  return function f(x) {
    return evaluar(postfija, x);
  };
}

/*
 * derivada(f, x)
 * Calcula f'(x) de forma NUMÉRICA, sin derivar a mano ni con librerías.
 * Idea: la derivada es la pendiente. La aproximamos mirando cuánto cambia f
 * un poquito a la izquierda y un poquito a la derecha de x (h muy pequeño):
 *
 *        f(x + h) - f(x - h)
 * f'(x)≈ -------------------     (fórmula de diferencias centradas)
 *               2h
 *
 * Esta versión "centrada" es más exacta que mirar solo hacia un lado.
 */
export function derivada(f, x, h = 1e-6) {
  return (f(x + h) - f(x - h)) / (2 * h);
}
