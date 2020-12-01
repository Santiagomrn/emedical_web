export interface NewsInterface {
  "total": number,
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
