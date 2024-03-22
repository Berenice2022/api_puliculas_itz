/**
 * @swagger
 * /peliculas:
 *  get:
 *    summary: Obtener todos las peliculas
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Lista de peliculas
 *
 */

/**
 * @swagger
 * /peliculas/{id}:
 *   get:
 *     summary: Obtener una pelicula por ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pelicula
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles dela pelicula
 */

/**
 * @swagger
 * /peliculas:
 *   post:
 *     summary: Crear una nueva pelicula
 *     security:
 *      - bearerAuth: []
 *     consummes:
 *       - application/json:
 *     parameters:
 *       - in: body
 *         required: true
 *         name: peliculas
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *               example: "Nombre de la pelicula"
 *             autor:
 *               type: string
 *               example: "Nombre del autor"
 *             genero:
 *               type: string
 *               example: "Genero de la pelicula"
 *             lenguage:
 *               type: string
 *               example: "Lenguage de la pelicula"
 *             duracion:
 *               type: string
 *               example: "Duracion de la pelicula"
 *             año:
 *               type: number
 *               example: 2024
 *             sinopsis:
 *               type: string
 *               example: "Sinopsis de la pelicula"
 *             precio:
 *               type: number
 *               example: 15000
 *     responses:
 *       201:
 *         description: Pelicula creada con exito
 */

/**
 * @swagger
 * /peliculas/{id}:
 *   put:
 *     summary: Actualizar una pelicula por ID
 *     security:
 *      - bearerAuth: []
 *     consummes:
 *       - application/json:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del la pelicula a actualizar
 *         schema:
 *           type: string
 *       - in: body
 *         required: true
 *         name: peliculas
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *               example: "Nombre de la pelicula"
 *             autor:
 *               type: string
 *               example: "Nombre del autor"
 *             genero:
 *               type: string
 *               example: "Genero de la pelicula"
 *             lenguage:
 *               type: string
 *               example: "Lenguage de la pelicula"
 *             duracion:
 *               type: string
 *               example: "Duracion de la pelicula"
 *             año:
 *               type: number
 *               example: 2024
 *             sinopsis:
 *               type: string
 *               example: "Sinopsis de la pelicula"
 *             precio:
 *               type: number
 *               example: 15000
 *     responses:
 *       200:
 *         description: Pelicula actualizada con exito
 */

/**
 * @swagger
 * /peliculas/{id}:
 *   delete:
 *     summary: Eliminar pelicula por ID
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pelicula
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pelicula eliminada con exito
 *       404:
 *         description: Error al eliminar pelicula
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     parameters:
 *       - in: body
 *         required: true
 *         name: user
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "bere@gmail.com"
 *             password:
 *               type: string
 *               example: "qwerty123"
 *     responses:
 *       201:
 *         description: Usuario creado con exito
 */

/**
 * @swagger
 * /get-token:
 *   post:
 *     summary: Obtener un toquen de autenticacion
 *     parameters:
 *       - in: body
 *         required: true
 *         name: token
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "bere@gmail.com"
 *             api_key:
 *               type: string
 *               example: "jX9MKCq60Rsex0C"
 *     responses:
 *       201:
 *         description: Usuario guardado con exito
 */
