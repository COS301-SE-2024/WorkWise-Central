export type CompanyListItem = {
  registrationNumber: string
  vatNumber: string
  name: string
  logo: string
  address: {
    province: string
    suburb: string
    city: string
    postalCode: string
  }
}
