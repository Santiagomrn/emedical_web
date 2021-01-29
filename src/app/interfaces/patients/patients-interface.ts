/**
 * Interfaz para obtener los datos de los pacientes
 */
export interface PatientsInterface {
    /**
     * Fecha de nacimiento del paciente
     * @param {birthdate}
     * @type string
     */
    "birthdate": string,
    /**
     * Fecha de creación del paciente
     * @param {created_at}
     * @type string
     */
    "created_at": string,
    /**
     * Email del paciente
     * @param {email}
     * @type string
     */
    "email": string,
    /**
     * Número de emergencia del paciente
     * @param {emergencyPhone}
     * @type string
     */
    "emergencyPhone": string,
    /**
     * Identificar del paciente
     * @param {id}
     * @type number
     */
    "id": number,
    /**
     * Apellido del paciente
     * @param {lastName}
     * @type string
     */
    "lastName": string,
    /**
     * Nombre del paciente
     * @param {name}
     * @type string
     */
    "name": string,
    /**
     * Contraseña del paciente
     * @param {password}
     * @type string
     */
    "password": string,
    /**
     * Teléfono principal del paciente
     * @param {phone}
     * @type string
     */
    "phone": string,
    /**
     * Última actualización del paciente
     * @param {updated_at}
     * @type string
     */
    "updated_at": string
}



