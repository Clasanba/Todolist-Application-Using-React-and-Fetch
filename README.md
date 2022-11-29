# What To Do this Week?

What To Do This Week es la continuación de What To Do Today. En este ejercicio las tareas se guardan en la base de datos e incorpora un botón para borrar todas las tareas de la base de datos.


<img src="src/img/wtdtw.png">
<img src="src/img/wtdtw-tasks.png">

## Instala dependencias

```
$ npm install
```

## ¡Empieza a programar!

For Windows, Mac, Linux or Gitpod, start the webpack server with live reload:
- `$ npm run start`
<p>
  <a href="https://gitpod.io#https://github.com/4GeeksAcademy/react-hello.git"><img src="https://raw.githubusercontent.com/4GeeksAcademy/react-hello/master/open-in-gitpod.svg?sanitize=true" />
  </a>
</p>
Esta plantilla es similar a create-react-app pero está pensada para los estudiantes de la Academia 4Geeks.

## 📝 Instrucciones

 - Haz que tu TODO List se sincronice con la API de backend cada vez que se agregue o elimine una tarea.

 - Agregue un botón de limpieza de todas las tareas que eliminará toda la lista del servidor y actualizará la lista vacía en el front-end.

## ✨ Sobre el Proyecto

Este ejercico cumple todos los requisitos. 

Apunte sobre el código:

La Api utilizada no permite tener un array vacio. Por ello, para borrar la última tarea de la lista, hay que borrar la lista completa de la base de datos. Cada vez que se borren todas las tareas de la base de datos y se quiera volver a usar, habrá que crear una nueva lista en la base de datos, antes de agregar una nueva tarea.

<img src="src/img/WTDTW responsive.png">

Puedes probar cómo funciona aquí:

https://what-to-do-this-week.vercel.app/
