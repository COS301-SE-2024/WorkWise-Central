export type EmployeeInformation = {
  name: string
  employeeId: string
}

export type ClientInformation = {
  name: string
  id: string
}

type Role = {
  _id: string
  roleName: string
  permissionSuite: string[]
  companyId: string
  createdAt: string
  __v: number
}

type Address = {
  street: string
  suburb: string
  city: string
  postalCode: string
  complex: string
  houseNumber: string
}

type ContactInfo = {
  phoneNumber: string
  email: string
}

type PersonalInfo = {
  address: Address
  contactInfo: ContactInfo
  firstName: string
  surname: string
  preferredLanguage: string
  dateOfBirth: string
  gender: string
}

type Profile = {
  displayName: string
  displayImage: string
}

type JoinedCompany = {
  employeeId: string
  companyId: string
  companyName: string
}

type User = {
  _id: string
  systemDetails: {
    username: string
    password: string
  }
  personalInfo: PersonalInfo
  profile: Profile
  joinedCompanies: JoinedCompany[]
  skills: string[]
  employeeIds: string[]
  isValidated: boolean
  createdAt: string
  __v: number
  updatedAt: string
  currentEmployee: string
}

export type EmployeeJoined = {
  _id: string
  role: Role
  currentJobAssignments: any[]
  subordinates: any[]
  subordinateTeams: any[]
  userId: User
  companyId: string
  createdAt: string
  __v: number
}

type ClientDetails = {
  name: string
  preferredLanguage: string
  contactInfo: ContactInfo
  address: Address
}

type Client = {
  id: string
  clientUsername: string
  details: ClientDetails
  createdAt: string
  __v: number
  updatedAt: string
}

type JobDetails = {
  heading: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  address: Address
  startDate: string
  endDate: string
}

type RecordedDetails = {
  imagesTaken: string[]
  inventoryUsed: string[]
}

// type Job = {
//   id: string
//   companyId: string
//   client: Client
//   assignedBy: string
//   status: 'Todo' | 'In Progress' | 'Done'
//   details: JobDetails
//   recordedDetails: RecordedDetails
//   taskList: string[]
//   comments: string[]
//   tags: string[]
//   createdAt: string
//   __v: number
// }

export type Card = {
  id: number
  title: string
  status: string
}

export type JobTag = {
  _id: string
  label: string
  colour: string
  companyId: string
  __v: number
}

export type JobPriorityTag = {
  _id: string
  label: string
  priorityLevel: number
  colour: string
  companyId: string
  __v: number
}
export type JobStatuses = {
  _id: string
  status: string
  colour: string
  companyId: string
  __v: number
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
  taskList: string[]
  comments: string[]
  tags: Tag[]
  status: Status
  priorityTag: PriorityTag
  coverImage: string
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
    registrationNumber?: string
    details: {
      firstName: string
      lastName: string
      preferredLanguage?: string
      contactInfo: {
        phoneNumber: string
        email: string
      }
      address?: {
        street: string
        province: string
        suburb: string
        city: string
        postalCode: string
        complex?: string
        houseNumber?: string
      }
      vatNumber?: string
      companyId: string
      idNumber?: string
      type?: string
    }
    createdAt: string
    updatedAt: string
    deletedAt: string
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
  status: {
    _id: string
    status: string
    colour: string
    companyId: string
    __v: number
  }
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

export type Column = {
  _id: string
  __v: 0
  status: string
  colour: string
  companyId: string
  cards: JobCardDataFormat[]
}

// export type Column = {
//   id: number
//   status: string
//   color: string
//   cards: JobCardDataFormat[]
// }
