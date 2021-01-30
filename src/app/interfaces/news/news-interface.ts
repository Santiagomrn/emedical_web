/**
 * Exportación de la información dada por la API de noticias
 */
export interface NewsInterface {
  /**
   * Valor para obtener el total de las noticias
   * @type number
   */
  "total": number,
  /**
   * valor para obtener los datos de la noticias
   * @type array
   */
  "items": Array<
    {
      "nid": number,
      "title": string,
      "description": string
      "content":string
      "author":string,
      "url": string,
      "urlToImage": string,
      "publishedAt": string,
      "addedOn": string,
      "siteName": string,
      "language": string,
      "countryCode": string,
      "status": number
    }
    >
}
