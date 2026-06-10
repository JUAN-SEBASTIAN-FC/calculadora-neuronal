/*
 * index.js (carpeta math)
 * ----------------------------------------------------------------------------
 * Punto único de entrada para toda la parte matemática del proyecto.
 * Así el resto de la app importa de un solo lugar:
 *
 *     import { compilarFuncion, biseccion, newton } from './math/index.js';
 *
 * Archivos del módulo:
 *   - funcion.js   -> convierte el texto en f(x) y calcula la derivada
 *   - biseccion.js -> método de bisección
 *   - newton.js    -> método de Newton-Raphson
 * ----------------------------------------------------------------------------
 */

export { compilarFuncion, derivada } from './funcion.js';
export { biseccion } from './biseccion.js';
export { newton } from './newton.js';
