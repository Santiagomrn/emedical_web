/**
 * 
 * Interface para obtener los datos del doctor desde una API externa [Primera entrega]
 */
export interface DoctorInterface {
  /**
   * Array de resultados
   * @type Array
   * @param results
   * 
   */
  "results": Array<{
    /**
     * Género del doctor
     * @type String
     * @param gender
     */
    "gender": string,
    /**
     * Objeto con los deatos del doctor
     * @type Object 
     * @param name
     */
    "name": {
      /**
       * Título del doctor
       * @param title
       * @type string
       */
      "title": string,
      /**
       * Nombre del doctor
       * @param first
       * @type string
       */
      "first": string,
      /**
       * Apellido del doctor
       * @param last
       * @type string
       */
      "last": string
    },
    /**
     * Correo del doctor
     * @param email
     * @type string
     */
    "email": string,
    /**
     * Objeto con información respecto a edad
     * @param dob
     * @type object
     */
    "dob": {
      /**
       * Cumpleaños de Dr
       * @param date
       * @type string
       */
      "date": string,
      /**
       * Edad del Dr
       * @param age
       * @type number
       */
      "age": number
    },
    /**
     * Información respecto a registro de cédula
     * @param registered
     * @type object
     */
    "registered": {
      /**
       * Fecha de titulación
       * @param date
       * @type string
       */
      "date": string,
      /**
       * Años de experiencia
       * @param age
       * @type number
       */
      "age": number
    },
    /**
     * teléfono del DR
     * @param phone
     * @type string
     */
    "phone": string,
    /**
     * celular del DR
     * @param cell
     * @type string
     */
    "cell": string,
    /**
     * Imagen del DR
     * @param picture
     * @type object
     */
    "picture": {
      /**
       * Imagen grande del DR
       * @param large
       * @type URL
       */
      "large": string,
      /**
       * Imagen pequeña del DR
       * @param medium
       * @type url
       */
      "medium": string,
    },
    /**
     * Thumbnail 
     * @param thumbnail
     * @type string
     */
    "thumbnail": string
    /**
     * Nat
     * @param nat
     * @type string
     */
    "nat": string
  }>
  /**
   * Información adicional del DR
   * @param info
   * @type object
   */
  "info": {
    /**
     * seed 
     * @param seed
     * @type string
     */
    "seed": string,
    /**
     * Número de Doctores [información API]
     * @param results
     * @type number
     */
    "results": number,
    /**
     * Página visualizada de Doctores [información API]
     * @param page
     * @type number
     */
    "page": number,
    /**
     * Versión 
     * @param version
     * @type string
     */
    "version": string
  }
}
