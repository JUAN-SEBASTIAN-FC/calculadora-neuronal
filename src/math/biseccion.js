/*
 * biseccion.js
 * ----------------------------------------------------------------------------
 * Método de BISECCIÓN para encontrar una raíz (un x donde f(x) = 0).
 *
 * IDEA (la misma de los ejercicios del cuaderno):
 *   1. Partimos de un intervalo [a, b] donde la función cambia de signo,
 *      es decir  f(a) * f(b) < 0. Si cambia de signo, seguro hay una raíz
 *      en medio (el teorema de Bolzano).
 *   2. Calculamos el punto medio:  c = (a + b) / 2.
 *   3. Miramos en qué mitad sigue el cambio de signo:
 *         - si f(a)*f(c) < 0  -> la raíz está en [a, c]  -> b = c
 *         - si no             -> la raíz está en [c, b]  -> a = c
 *   4. Repetimos. El intervalo se parte a la mitad cada vez, así que c se
 *      acerca cada vez más a la raíz.
 *   5. Paramos cuando el error es suficientemente pequeño o se acaban las
 *      iteraciones.
 *
 * ERROR (igual que en el cuaderno):
 *      error relativo = | (c_nuevo - c_anterior) / c_nuevo |
 *   En la primera iteración no hay c_anterior, así que el error queda vacío.
 *
 * Cada iteración se guarda en una lista para poder mostrar la tabla y mover
 * la gráfica paso a paso después.
 * ----------------------------------------------------------------------------
 */

/*
 * biseccion(f, a, b, tolerancia, maxIter)
 *   f          -> la función ya compilada (de funcion.js), recibe x da número
 *   a, b       -> extremos del intervalo inicial
 *   tolerancia -> error deseado para detenerse (ej. 1e-6 = 0.000001)
 *   maxIter    -> número máximo de iteraciones por seguridad
 *
 * Devuelve un objeto con:
 *   pasos      -> lista de iteraciones (para la tabla y la gráfica)
 *   raiz       -> mejor aproximación encontrada
 *   convergio  -> true si llegó a la tolerancia
 *   mensaje    -> texto explicando cómo terminó
 */
export function biseccion(f, a, b, tolerancia = 1e-6, maxIter = 50) {
  const pasos = [];

  let fa = f(a);
  let fb = f(b);

  // Comprobación clave: la función DEBE cambiar de signo en [a, b].
  if (fa * fb > 0) {
    return {
      pasos: [],
      raiz: null,
      convergio: false,
      mensaje: 'No hay cambio de signo en [a, b]: f(a)·f(b) debe ser negativo.',
    };
  }

  let cAnterior = null; // punto medio de la iteración previa (para el error)

  for (let n = 1; n <= maxIter; n++) {
    // 1) Punto medio
    const c = (a + b) / 2;
    const fc = f(c);

    // 2) Error relativo respecto al c anterior (vacío en la 1ª iteración)
    let errorRel = null;
    let errorAbs = null;
    if (cAnterior !== null) {
      errorAbs = Math.abs(c - cAnterior);
      errorRel = Math.abs((c - cAnterior) / c);
    }

    // 3) Guardamos esta iteración con todo lo que la gráfica/tabla necesita.
    pasos.push({
      n: n,            // número de iteración
      a: a,            // extremo izquierdo actual
      b: b,            // extremo derecho actual
      x: c,            // aproximación de la raíz (el punto medio)
      fx: fc,          // valor de la función en c
      absError: errorAbs,
      relError: errorRel,
      converged: false,
    });

    // 4) ¿Ya es suficientemente bueno?
    //    Paramos si f(c) es prácticamente 0, o si el error es muy chico.
    if (fc === 0 || (errorRel !== null && errorRel < tolerancia)) {
      pasos[pasos.length - 1].converged = true;
      return {
        pasos,
        raiz: c,
        convergio: true,
        mensaje: 'Raíz encontrada en ' + n + ' iteraciones.',
      };
    }

    // 5) Elegimos la mitad donde sigue el cambio de signo.
    if (fa * fc < 0) {
      b = c;          // la raíz está a la izquierda
      fb = fc;
    } else {
      a = c;          // la raíz está a la derecha
      fa = fc;
    }

    cAnterior = c;
  }

  // Si se acabaron las iteraciones sin alcanzar la tolerancia,
  // igual devolvemos la mejor aproximación que tengamos.
  const ultimo = pasos[pasos.length - 1];
  return {
    pasos,
    raiz: ultimo ? ultimo.x : null,
    convergio: false,
    mensaje: 'Se alcanzó el máximo de iteraciones (' + maxIter + ').',
  };
}
