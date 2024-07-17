export type EventTime = {
  start: string
  end: string
}

export type Event = {
  title: string
  with: string
  time: EventTime
  color: string
  isEditable: boolean
  location: string
  id: string
  description: string
}

export type JobCardDataFormat = {
  jobId: string
  heading: string
  jobDescription: string
  startDate: string
  endDate: string
  status: string
  clientName: string
  street: string
  suburb: string
  city: string
  postalCode: string
  complex?: string
  houseNumber?: string
  imagesTaken: string[]
  inventoryUsed: string[]
  taskList: string[]
  comments: string[]
}
