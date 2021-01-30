/**
 * Interfaz que se utiliza para los datos de citas
 */
export interface AppointmentInterface {
    /**
     * Código QR de la cita
     * @param {QRCode}
     * @type string
     */
    "QRCode": string,
    /**
     *  Fecha de creación del archivo
     * @param {created_at}
     * @type string
     */
    "created_at":string,
    /**
     * Fecha de la cita
     * @param {date}
     * @type string
     */
    "date":string,
    /**
     * Arreglo del doctor que atiede la cita
     * @param {doctor}
     * @type string
     */
    "doctor": string,
    /**
     * Identificador del doctor 
     * @param {doctorID}
     * @type number
     */
    "doctorId":number,
    /**
     * Identificado de la cita
     * @param {id}
     * @type number
     */
    "id":number,
    /**
     * Arreglo del paciente que hizo la cita
     * @param {pathiet}
     * @type string
     */
    "pathient":string,
    /**
     * Identificador del paciente 
     * @param {pathientId}
     * @type number
     */
    "pathientId":number,
    /**
     * Horario de la cita (Este es cada 30min)
     * @param {time}
     * @type string
     */
    "time":string,
    /**
     * Turno de la cita
     * @param {turn}
     * @type number
     */
    "turn": number,
    /**
     * Última actualización de la cita
     * @param {updated_at}
     * @type string
     */
    "updated_at":string
}


