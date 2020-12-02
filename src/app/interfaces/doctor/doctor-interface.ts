export interface DoctorInterface {
  "results": Array<{
    "gender": string,
    "name": {
      "title": string,
      "first": string,
      "last": string
    },
    "email": string,
    "dob": {
      "date": string,
      "age": number
    },
    "registered": {
      "date": string,
      "age": number
    },
    "phone": string,
    "cell": string,
    "picture": {
      "large": string,
      "medium": string,
      "thumbnail": string
    },
    "nat": string
  }>
  "info": {
    "seed": string,
    "results": number,
    "page": number,
    "version": string
  }
}
