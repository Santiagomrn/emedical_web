/**
 * Interfaz para obtener los medicamentos necesarios 
 */
export interface MedicamentInterface {
    /**
     * Cantidad de medicamentos diponibles
     * @param {totalFilas}
     * @type number
     */
    "totalFilas": number,
    /**
     * Página de medicamentos
     * @param {pagina}
     * @type number
     */
    "pagina": number,
    /**
     * Tamaño de la página de los medicamentos
     * @param {tamanioPagina}
     * @type number
     */
    "tamanioPagina": number,
    /**
     * Arreglo de datos de las medicinas disponibles
     * @param {resultados}
     * @type array
     */
    "resultados": Array<
        {
            "nregistro": string,
            "nombre": string,
            "pactivos": string,
            "labtitular": string,
            "cpresc": string,
            "estado": {
                "aut": number
            },
            "comerc": boolean,
            "receta": boolean,
            "generico": boolean,
            "conduc": boolean
            "triangulo": boolean,
            "huerfano": boolean,
            "biosimilar": boolean,
            "nosustituible": {
                "id": number,
                "nombre": string
            },
            "psum": boolean,
            "notas": boolean,
            "materialesInf": boolean,
            "ema": boolean,
            "docs": [
                {
                    "tipo": number,
                    "url": string,
                    "urlHtml": string,
                    "secc": boolean,
                    "fecha": number
                },
                {
                    "tipo": number,
                    "url": string,
                    "urlHtml": string,
                    "secc": boolean,
                    "fecha": number
                }
            ],
            "fotos": [
                {
                    "tipo":string,
                    "url": string,
                    "fecha": number
                },
                {
                    "tipo": string,
                    "url": string,
                    "fecha": number
                }
            ],
            "principiosActivos": [
                {
                    "id": number,
                    "codigo": string,
                    "nombre": string,
                    "cantidad": string,
                    "unidad": string,
                    "orden": number
                },
                {
                    "id": number,
                    "codigo": string,
                    "nombre": string,
                    "cantidad": string,
                    "unidad": string,
                    "orden": number
                }
            ],
            "excipientes": [
                {
                    "id": number,
                    "nombre": string,
                    "cantidad":string,
                    "unidad": string,
                    "orden": number
                },
                {
                    "id": number,
                    "nombre": string,
                    "cantidad": string,
                    "unidad": string,
                    "orden": number
                },
                {
                    "id": number,
                    "nombre": string,
                    "cantidad": string,
                    "unidad": string,
                    "orden": number
                }
            ],
            "viasAdministracion": [
                {
                    "id": number,
                    "nombre": string
                }
            ],
            "formaFarmaceutica": {
                "id": number,
                "nombre": string
            },
            "formaFarmaceuticaSimplificada": {
                "id": number,
                "nombre": string
            },
            "vtm": {
                "id": number,
                "nombre": string
            },
            "dosis": string
        }>
    
}
