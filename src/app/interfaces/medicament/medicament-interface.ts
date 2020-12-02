export interface MedicamentInterface {
    "totalFilas": number,
    "pagina": number,
    "tamanioPagina": number,
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
