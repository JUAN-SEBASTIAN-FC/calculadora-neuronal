Proyecto Final
Fundamentos de An´alisis y Calculo Num´erico
Mateo Echeverry Correa, Ing
2026 - I
Introducci´on
Los m´etodos num´ericos constituyen una de las herramientas m´as importantes para
resolver problemas matem´aticos cuya soluci´on anal´ıtica resulta dif´ıcil o imposible de obtener. Entre estos m´etodos, el m´etodo de bisecci´on y el m´etodo de Newton-Raphson son
ampliamente utilizados para aproximar ra´ıces de ecuaciones no lineales.
El objetivo de este proyecto es desarrollar una aplicaci´on interactiva capaz de visualizar gr´aficamente el comportamiento iterativo de ambos m´etodos, permitiendo analizar
el proceso de convergencia, los errores obtenidos y la aproximaci´on de la ra´ız en cada
iteraci´on.
El proyecto busca fortalecer la comprensi´on conceptual de los m´etodos num´ericos mediante herramientas visuales e interactivas.
Objetivo General
Dise˜nar e implementar una aplicaci´on interactiva que permita visualizar paso a paso
el funcionamiento de los m´etodos de Bisecci´on y Newton-Raphson para la aproximaci´on
de ra´ıces de ecuaciones no lineales.
Objetivos Espec´ıficos
Implementar el m´etodo de Bisecci´on.
Implementar el m´etodo de Newton-Raphson.
Permitir el ingreso din´amico de funciones matem´aticas como texto.
Generar visualizaciones gr´aficas del proceso iterativo.
Mostrar tablas de iteraciones y errores.

Permitir navegar entre iteraciones para observar el comportamiento de cada m´etodo.
Analizar la convergencia y estabilidad de los m´etodos.
Descripci´on General del Proyecto
El sistema deber´a permitir al usuario ingresar una funci´on matem´atica no lineal y
ejecutar los m´etodos de Bisecci´on y Newton-Raphson sobre dicha funci´on.
La aplicaci´on deber´a mostrar gr´aficamente:
La funci´on ingresada.
Las aproximaciones generadas en cada iteraci´on.
El comportamiento del m´etodo conforme avanzan las iteraciones.
La aproximaci´on de la ra´ız.
Adem´as, deber´a existir un mecanismo que permita al usuario avanzar o retroceder
entre iteraciones para visualizar el comportamiento del algoritmo paso a paso.
Requerimientos Funcionales
1. Ingreso de Funci´on
El sistema deber´a permitir ingresar funciones matem´aticas como texto, por ejemplo:
f(x) = x
3 − x − 2
o
f(x) = e
−x − x
La aplicaci´on deber´a interpretar correctamente la funci´on y evaluarla num´ericamente.
2. M´etodo de Bisecci´on
El usuario deber´a poder ingresar:
Intervalo inicial [a, b]
N´umero m´aximo de iteraciones
Tolerancia o error deseado

La aplicaci´on deber´a:
Mostrar cada iteraci´on.
Graficar el intervalo actual.
Mostrar el punto medio utilizado en cada paso.
Mostrar la aproximaci´on de la ra´ız.
3. M´etodo de Newton-Raphson
El usuario deber´a poder ingresar:
Valor inicial x0
N´umero m´aximo de iteraciones
Tolerancia o error deseado
La aplicaci´on deber´a:
Calcular autom´aticamente la derivada de la funci´on.
Mostrar gr´aficamente la recta tangente utilizada en cada iteraci´on.
Mostrar el valor aproximado de la ra´ız.
Visualizar el desplazamiento entre iteraciones.
4. Visualizaci´on Iterativa
El sistema deber´a incluir controles que permitan:
Avanzar iteraci´on por iteraci´on.
Retroceder iteraciones.
Reproducir autom´aticamente el proceso iterativo.
Reiniciar el procedimiento.

5. Tabla de Iteraciones
Para ambos m´etodos se deber´a generar una tabla que muestre:
N´umero de iteraci´on
Aproximaci´on actual
Valor de la funci´on
Error absoluto
Error relativo
La tabla deber´a mostrarse dentro de la aplicaci´on.
Requerimientos T´ecnicos
El proyecto puede desarrollarse en cualquier lenguaje de programaci´on.
El uso de librer´ıas gr´aficas queda a elecci´on del grupo.
La interfaz debe ser interactiva y visualmente clara.
El sistema debe manejar errores de entrada del usuario.
El proyecto debe ser completamente funcional.
Caracter´ısticas Opcionales (Puntos Adicionales)
Comparaci´on simult´anea entre Bisecci´on y Newton-Raphson.
Exportaci´on de gr´aficas.
Historial de funciones utilizadas.
Modo oscuro.
Animaciones avanzadas.
Soporte para m´ultiples ra´ıces.

Trabajo en Equipo
El proyecto deber´a desarrollarse en grupos.
Cada integrante deber´a participar activamente en el desarrollo.
Durante la sustentaci´on cualquier integrante podr´a ser interrogado sobre cualquier
parte del sistema.
Sustentaci´on
Durante la sustentaci´on se evaluar´a:
Comprensi´on matem´atica de los m´etodos.
Correcta implementaci´on algor´ıtmica.
Calidad de la visualizaci´on gr´afica.
Explicaci´on del comportamiento de convergencia.
Calidad t´ecnica del c´odigo.
Participaci´on de todos los integrantes.
Entregables
Sustentaci´on del proyecto:
• Tecnolog´ıas utilizadas.
• Arquitectura del sistema.
• Funcionamiento general.
• Dificultades encontradas.
Demostraci´on funcional del proyecto.

Imagenes ilustrativas
El objetivo principal del proyecto no es ´unicamente implementar algoritmos num´ericos,
sino comprender visual y matem´aticamente el comportamiento de los m´etodos iterativos y
su convergencia.
