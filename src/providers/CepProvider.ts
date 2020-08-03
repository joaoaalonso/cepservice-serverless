export interface CepProvider {
  find: (postalCode: string) => Promise<PostalCode>
}
