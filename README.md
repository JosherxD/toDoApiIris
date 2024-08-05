# Introduction 
En este proyecto, hemos implementado una solución para gestionar una lista de tareas (To Do List) mediante una API, utilizando Amazon DynamoDB como base de datos No-SQL. La solución cumple con los siguientes criterios:

Construcción de un CRUD: Se han creado las operaciones básicas para la gestión de tareas: Crear, Leer, Actualizar y Eliminar (CRUD).
Capa de Seguridad: Se ha añadido una capa de autenticación para asegurar el acceso a la API.

Control de Errores: Se ha implementado un manejo de errores robusto que devuelve códigos de estado HTTP adecuados.

Colección de Postman: Se ha incluido una colección de Postman para probar todas las operaciones del API.

# Getting Started

instalacion de dependencias 

npm install 


# Build 

# Archivo ToDoesUsesCases

Esta clase proporciona una interfaz para interactuar con los datos de tus tareas (To-Dos). Ofrece métodos para:

Obtener todas las tareas:

TypeScript
const todasLasTareas = await todoService.getAllToDoes();
Usa el código con precaución.

Obtener una tarea específica:
TypeScript
const tareaEspecifica = await todoService.getToDo('123');
Usa el código con precaución.

Crear una nueva tarea:
TypeScript
const nuevaTarea: ToDo = {
    id: '456',
    titulo: 'Nueva Tarea',
    completado: false
};
const tareaCreada = await todoService.createToDo(nuevaTarea);
Usa el código con precaución.

Actualizar una tarea existente:
TypeScript

tareaEspecifica.titulo = 'Tarea Actualizada';
const tareaActualizada = await todoService.updateToDo(tareaEspecifica);
Usa el código con precaución.

Eliminar una tarea:
TypeScript

const eliminada = await todoService.deleteToDo('789');
Usa el código con precaución.

Explicación de los métodos:
getAllToDoes(): Devuelve una promesa que se resuelve con un arreglo de objetos ToDo, representando todas las tareas existentes.
getToDo(id: string): Devuelve una promesa que se resuelve con el objeto ToDo que coincide con el ID proporcionado, o undefined si no se encuentra ninguna tarea.
createToDo(toDo: ToDo): Crea una nueva tarea. Si la tarea ya existe, devuelve false. De lo contrario, devuelve la tarea creada.
updateToDo(toDo: ToDo): Actualiza una tarea existente. Si la tarea no existe, devuelve false. De lo contrario, devuelve la tarea actualizada.
deleteToDo(id: string): Elimina una tarea por su ID. Devuelve true si la eliminación fue exitosa, false si no se encontró la tarea.
Dependencias:
Esta clase depende de ToDoesRepository, la cual se encarga de la persistencia de los datos (por ejemplo, en una base de datos).

Ejemplo de uso completo:

TypeScript
import { ToDoesUsesCases, ToDo } from './todos.service';

const todoService = new ToDoesUsesCases(toDoRepository); // Reemplaza toDoRepository con tu instancia real

________________________________________///________________________________________________

# archivo clienteDb.ts

Descripción
La clase ToDoesDb implementa la interfaz ToDoesRepository y se encarga de interactuar con una base de datos DynamoDB para gestionar tareas (To-Dos). Utiliza la biblioteca AWS SDK for JavaScript para realizar operaciones de creación, lectura, actualización y eliminación de registros en la tabla DynamoDB especificada.

Métodos:
getToDoes():

Obtiene todas las tareas almacenadas en la tabla DynamoDB.
Utiliza un ScanCommand para realizar la consulta.
Devuelve un arreglo de objetos ToDo o undefined si no se encuentran tareas.
getToDo(id: string):

Obtiene una tarea específica por su ID.
Utiliza un GetCommand para realizar la consulta.
Devuelve un objeto ToDo si se encuentra la tarea, o undefined si no existe.
createOrUpdateToDo(toDo: ToDo):

Crea o actualiza una tarea en la tabla DynamoDB.
Utiliza un PutCommand para realizar la operación.
Devuelve true si la operación fue exitosa.
deleteToDo(id: string):

Elimina una tarea por su ID de la tabla DynamoDB.
Utiliza un DeleteCommand para realizar la eliminación.
Devuelve true si la eliminación fue exitosa.


___________________________________//____________________________________________

#  archivo server.ts

Este archivo contiene la configuración principal del servidor Express para la aplicación de gestión de tareas (To-Do). Aquí se definen los middlewares, las rutas de la API y el proceso de inicio del servidor.

Clase Server
La clase Server se encarga de la inicialización y configuración del servidor Express.

Propiedades:

app: Objeto Application de Express que representa la aplicación del servidor.
port: String que contiene el puerto en el que escuchará el servidor (definido por la variable de entorno PORT).
apiPaths: Objeto que define las rutas base de la API.
Métodos:

constructor(): Inicializa la aplicación Express, obtiene el puerto del entorno y configura los middlewares y rutas.
middlewares(): Configura los middlewares utilizados por la aplicación.
cors(): Habilita CORS para permitir solicitudes de orígenes cruzados.
expres.json(): Permite analizar el body de las solicitudes en formato JSON.
routes(): Define las rutas de la API de la aplicación.
this.app.use(this.apiPaths.toDoes, toDoesRoutes): Asocia las rutas de la API relacionadas con las tareas (To-Dos) al módulo toDoesRoutes importado.
listen(): Inicia el servidor Express escuchando en el puerto especificado e imprime un mensaje de confirmación a la consola.


_____________________________________//_________________________________________
# Postman

{
	"info": {
		"_postman_id": "65835fb5-31a2-45ce-90e2-d4a69d9769b3",
		"name": "IrisToDo",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "2691361"
	},
	"item": [
		{
			"name": "http://localhost:3000/v1/api/toDoes/3",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/v1/api/toDoes/3",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"v1",
						"api",
						"toDoes",
						"3"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:3000/v1/api/toDoes",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"description\": \"tarea 1\",\n    \"id\": \"1\",\n    \"active\": true\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/v1/api/toDoes",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"v1",
						"api",
						"toDoes"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:3000/v1/api/toDoes",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/v1/api/toDoes",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"v1",
						"api",
						"toDoes"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:3000/v1/api/toDoes",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"description\": \"Alonso malparido\",\n    \"id\": \"10\",\n    \"active\": true\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/v1/api/toDoes",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"v1",
						"api",
						"toDoes"
					]
				}
			},
			"response": []
		}
	]
}

# Contribute

Deiby Rendon 