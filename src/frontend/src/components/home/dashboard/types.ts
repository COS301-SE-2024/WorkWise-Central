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

export type Job = {
  _id: string
  company: {
    registrationNumber: string
    vatNumber: string
    name: string
    type?: string
    jobStatuses?: string[]
    logo?: string
    contactDetails: {
      phoneNumber: string
      email: string
    }
    address: {
      street: string
      province: string
      suburb: string
      city: string
      postalCode: string
      complex?: string
      houseNumber?: string
    }
    private: boolean
  }
  clientId: {
    createdAt: string
    details: {
      address: {
        city: string
        postalCode: string
        province: string
        street: string
        suburb: string
      }
      companyId: string
      contactInfo: {
        email: string
        phoneNumber: string
      }
      firstName: string
      idNumber: string
      lastName: string
      preferredLanguage: string
    }
  }

  assignedBy: {
    roleId: string
    superiorId?: string
    subordinates?: string[]
    subordinateTeams?: string[]
    userId: string
    userInfo: {
      username: string
      firstName: string
      surname: string
      displayName: string
      displayImage?: string
    }
    companyId: string
  }
  assignedEmployees?: {
    employeeIds?: string[]
    teamIds?: string[]
  }
  status: string
  tags?: string[]
  priorityTag?: string
  attachments: string[]
  details: {
    heading: string
    description: string
    address: {
      street: string
      province: string
      suburb: string
      city: string
      postalCode: string
      complex?: string
      houseNumber?: string
    }
    startDate: string
    endDate?: string
  }
  recordedDetails?: {
    imagesTaken?: string[]
    inventoryUsed?: {
      inventoryItemId: string
      inventoryItemName: string
      quantityUsed: number
    }[]
  }
  clientFeedback?: {
    rating?: number
    comment?: string
  }
  taskList: {
    name: string
    status: string
    assignedEmployees?: {
      roleId: string
      superiorId?: string
      subordinates?: string[]
      subordinateTeams?: string[]
      userId: string
      userInfo: {
        username: string
        firstName: string
        surname: string
        displayName: string
        displayImage?: string
      }
      companyId: string
    }[]
  }[]
  comments: string[]
  history?: {
    event: string
    timestamp: string
  }[]
  createdAt: string
  updatedAt: string
}
