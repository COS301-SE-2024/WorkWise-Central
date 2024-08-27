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
type Tag = {
  _id: string
  label: string
  colour: string
  companyId: string
  __v: number
}

type Status = {
  _id: string
  status: string
  colour: string
  companyId: string
  __v: number
}

type PriorityTag = {
  _id: string
  label: string
  priorityLevel: number
  colour: string
  companyId: string
  __v: number
}

export type JobCardDataFormat = {
  jobId: string
  heading: string
  jobDescription: string
  startDate: string
  endDate: string
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
  tags: Tag[]
  status: Status
  priorityTag: PriorityTag
}

export type Job = {
  _id: string
  companyId: string
  clientId: {
    _id: string
    details: {
      firstName: string
      lastName: string
      preferredLanguage: string
      contactInfo: {
        email: string
        phoneNumber: string
      }
      address: {
        street: string
        suburb: string
        city: string
        province: string
        postalCode: string
      }
      companyId: string
      idNumber: string
    }
    createdAt: string
    __v: number
  } | null
  assignedBy: {
    _id: string
    currentJobAssignments: any[]
    subordinates: any[]
    subordinateTeams: any[]
    userId: string
    companyId: string
    createdAt: string
    __v: number
    updatedAt: string
    role: {
      roleId: string
      permissionSuite: string[]
      roleName: string
    }
    userInfo: {
      displayName: string
    }
    superiorId: string
  }
  assignedEmployees: {
    employeeIds: {
      _id: string
      currentJobAssignments: any[]
      subordinates: any[]
      subordinateTeams: any[]
      userId: string
      companyId: string
      createdAt: string
      __v: number
      updatedAt: string
      role: {
        roleId: string
        permissionSuite: string[]
        roleName: string
      }
      userInfo: {
        displayName: string
      }
      superiorId: string
    }[]
  }
  status: {
    _id: string
    status: string
    colour: string
    companyId: string
    __v: number
  }
  tags: {
    _id: string
    label: string
    colour: string
    companyId: string
    __v: number
  }[]
  priorityTag: string | null
  attachments: string | null
  details: {
    heading: string
    description: string
    address: {
      province: string
      street: string
      suburb: string
      city: string
      postalCode: string
      complex: string
    }
    startDate: string
    endDate: string
  }
  recordedDetails: {
    imagesTaken: any[]
    inventoryUsed: any[]
  }
  taskList: any[]
  history: any[]
  comments: any[]
  createdAt: string
  __v: number
}
