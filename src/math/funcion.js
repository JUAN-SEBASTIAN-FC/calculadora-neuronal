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

/* Prioridad de cada operador. Mayor número = se calcula primero. */
const PRIORIDAD = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };

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

  // ----- Arreglar el signo menos "unario" (ej. -x, o 3*(-2)) -----
  // Si un "-" aparece al inicio o justo después de "(" o de otro operador,
  // en realidad significa "0 - ...", así que insertamos un 0 adelante.
  const arreglados = [];
  for (let k = 0; k < tokens.length; k++) {
    const t = tokens[k];
    const anterior = tokens[k - 1];
    const esMenosUnario =
      t.tipo === 'operador' && t.valor === '-' &&
      (!anterior || anterior.valor === '(' || anterior.tipo === 'operador');
    if (esMenosUnario) {
      arreglados.push({ tipo: 'numero', valor: 0 });
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
    } else if (t.tipo === 'operador') {
      // Sacamos de la pila los operadores que tengan prioridad mayor o igual.
      // El "^" se trata por la derecha, por eso usamos ">" en vez de ">=".
      while (pila.length) {
        const tope = pila[pila.length - 1];
        const mismaOmayor =
          tope.tipo === 'operador' &&
          (t.valor === '^' ? PRIORIDAD[tope.valor] > PRIORIDAD[t.valor]
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

  for (const t of postfija) {
    if (t.tipo === 'numero') {
      pila.push(t.valor);
    } else if (t.tipo === 'variable') {
      pila.push(x);
    } else if (t.tipo === 'funcion') {
      const a = pila.pop();
      pila.push(FUNCIONES[t.valor](a));
    } else if (t.tipo === 'operador') {
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

  if (pila.length !== 1) throw new Error('La función está incompleta.');
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

  // Probamos evaluar en un punto para detectar errores de inmediato.
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
