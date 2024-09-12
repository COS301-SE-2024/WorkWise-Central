// export type InvoiceCardDataFormat = {
//   id: string // For ObjectId type in the API class
//   invoiceNumber: number
//   invoiceDate: string // Using ISO string format for Date
//   paymentDate: string // ISO string format
//   subTotal: number
//   total: number
//   tax: number
//   paid: boolean
//   clientId: string // For ObjectId type
//   jobId: string // For ObjectId type
//   companyId: string // For ObjectId type

//   createdAt: string // ISO string format
//   updatedAt?: string // Optional ISO string
//   deletedAt?: string // Optional ISO string
// }

export type InvoiceCardDataFormat = {
  id: string // For ObjectId type in the API class
  invoiceNumber: number
  invoiceDate: string // Using ISO string format for Date
  paymentDate: string // ISO string format
  subTotal: number
  total: number
  paid: boolean
  clientId: string // For ObjectId type
  clientName: string
  inventoryItems: Item[]
  laborItems: Item[]
}

type Item = {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export type Column = {
  _id: string
  __v: 0
  status: string
  colour: string
  companyId: string
  cards: InvoiceCardDataFormat[]
}
