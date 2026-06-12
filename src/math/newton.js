/*
 * newton.js
 * ----------------------------------------------------------------------------
 * Método de NEWTON-RAPHSON para encontrar una raíz (un x donde f(x) = 0).
 *
 * IDEA (la misma de los ejercicios del cuaderno):
 *   - Partimos de un valor inicial x0 (una primera adivinanza de la raíz).
 *   - En ese punto trazamos la recta TANGENTE a la curva.
 *   - Donde esa tangente cruza el eje x, ese es el nuevo (y mejor) candidato.
 *   - Repetimos desde ese nuevo punto.
 *
 * FÓRMULA (la del cuaderno):
 *
 *                    f(xn)
 *      x_{n+1} = xn - ------
 *                    f'(xn)
 *
 *   donde f'(xn) es la derivada (la pendiente de la tangente). Aquí la derivada
 *   la calculamos de forma numérica en funcion.js, así no hay que derivar a mano.
 *
 * ERROR (igual que en el cuaderno):
 *      error relativo = | (x_nuevo - x_anterior) / x_nuevo |
 *
 * Como Newton usa la pendiente, normalmente converge mucho más rápido que la
 * bisección (en pocas iteraciones).
 * ----------------------------------------------------------------------------
 */

import { derivada } from './funcion.js';

/*
 * newton(f, x0, tolerancia, maxIter)
 *   f          -> la función ya compilada (de funcion.js)
 *   x0         -> valor inicial (primera aproximación)
 *   tolerancia -> error deseado para detenerse (ej. 1e-6)
 *   maxIter    -> número máximo de iteraciones por seguridad
 *
 * Devuelve un objeto con:
 *   pasos      -> lista de iteraciones (para la tabla y la gráfica)
 *   raiz       -> mejor aproximación encontrada
 *   convergio  -> true si llegó a la tolerancia
 *   mensaje    -> texto explicando cómo terminó
 *
 * Además, cada paso guarda 'pendiente' (f'(xn)) para poder DIBUJAR la recta
 * tangente de esa iteración en la gráfica.
 */
export function newton(f, x0, tolerancia = 1e-6, maxIter = 50) {
  const pasos = [];

  let x = x0;            // x actual (xn)

  for (let n = 1; n <= maxIter; n++) {
    const fx = f(x);              // f(xn)
    const pendiente = derivada(f, x); // f'(xn) -> derivada numérica

    // Si la pendiente es casi 0, la tangente es horizontal y no cruza el eje:
    // el método no puede continuar (división por casi cero).
    if (Math.abs(pendiente) < 1e-12) {
      return {
        pasos,
        raiz: null,
        convergio: false,
        mensaje: 'La derivada es casi cero en x = ' + x + '. Prueba otro valor inicial.',
      };
    }

    // Fórmula de Newton: el siguiente x.
    const xNuevo = x - fx / pendiente;

    // Error de ESTE paso: cuánto saltó la aproximación de x a xNuevo.
    // Es el mismo número que usamos para decidir si parar, así la tabla y la
    // condición de parada siempre coinciden (igual que en bisección).
    const errorAbs = Math.abs(xNuevo - x);
    const errorRel = Math.abs((xNuevo - x) / xNuevo);

    // Guardamos esta iteración. 'x' es la aproximación actual (xn) y
    // 'pendiente' sirve para dibujar la tangente en la gráfica.
    pasos.push({
      n: n,
      x: x,             // aproximación actual (xn)
      fx: fx,           // f(xn)
      pendiente: pendiente, // f'(xn), para la recta tangente
      xNuevo: xNuevo,   // a dónde apunta la tangente (xn+1)
      absError: errorAbs,
      relError: errorRel,
      converged: false,
    });

    // ¿Ya convergió? Paramos si:
    //   - f(xn) es prácticamente 0 (ya estamos en la raíz), o
    //   - el salto de xn a xNuevo es menor que la tolerancia.
    // Usamos el criterio mixto tol*(1+|xNuevo|) en vez del error relativo a
    // secas: el relativo divide entre xNuevo y EXPLOTA cuando la raíz es 0
    // (ej. x^3), impidiendo converger aunque ya estemos en la raíz.
    const umbral = tolerancia * (1 + Math.abs(xNuevo));
    const fxCasiCero = Math.abs(fx) < tolerancia;
    if (fx === 0 || fxCasiCero || errorAbs < umbral) {
      pasos[pasos.length - 1].converged = true;
      return {
        pasos,
        raiz: xNuevo,
        convergio: true,
        mensaje: 'Raíz encontrada en ' + n + ' iteraciones.',
      };
    }

    // Avanzamos al siguiente punto.
    x = xNuevo;
  }

  // Se acabaron las iteraciones sin alcanzar la tolerancia.
  const ultimo = pasos[pasos.length - 1];
  return {
    pasos,
    raiz: ultimo ? ultimo.xNuevo : null,
    convergio: false,
    mensaje: 'Se alcanzó el máximo de iteraciones (' + maxIter + ').',
  };
}
