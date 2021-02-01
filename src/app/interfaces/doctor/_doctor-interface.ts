/**
 * Interface para obtener los datos del doctor 
 */
export interface _DoctorInterface {
    /**
     * Identificador del doctor
     * @param {id}
     * @type number
     */
    "id": number,
    /**
     *  Nombre del doctor    
     * @type string
     * @param {name}
     */
    "name": string,
    /**
     *  Apellido del doctor
     * @type String
     * @param {lastName}
     * 
     */
    "lastName": string,
    /**
     *  Teléfono del doctor
     * @type string
     * @param {phone}
     */
    "phone": string,
    /**
     *  Correo del doctor
     * @param {email}
     * @type string
     */
    "email": string,
    /**
     *  Teléfono de emergencia del doctor
     * @param {emergencyPhone}
     * @type string
     */
    "emergencyPhone": string,
    /**
     *  Contraseña del doctor
     * @param {password}
     * @type string
     */
    "password": string,
    /**
     *  Cumpleaños del doctor
     * @param {birthdate}
     * @type number
     */
    "birthdate": number,
    /**
     *  Área médica del doctor
     * @param {medicalArea}
     * @type string
     */
    "medicalArea": string,
    /**
     *  Descripción del doctor
     * @param {description}
     * @type string
     */
    "description": string,
    /**
     *  Título  del doctor
     * @param {jobTitle}
     * @type string
     */
    "jobTitle": string,
    /**
     *  Cédula profesional del doctor
     * @param {professionalLicense}
     * @type string
     */
    "professionalLicense": string,
    /**
     *  Nacionalidad del doctor
     * @param {nationality}
     * @type string
     */
    "nationality": string,
    /**
     *  Estado social del doctor
     * @param {maritalStatus}
     * @type string
     */
    "maritalStatus": string,
    /**
     *  Creado en ...
     * @param {created_at}
     * @type string
     */
    "created_at": string,
    /**
     *  actualizado en ...
     * @param {update_at}
     * @type string
     */
    "updated_at": string
}