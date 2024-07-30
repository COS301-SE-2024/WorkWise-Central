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
  roleId: Role
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

type Job = {
  id: string
  companyId: string
  client: Client
  assignedBy: string
  status: 'Todo' | 'In Progress' | 'Done'
  details: JobDetails
  recordedDetails: RecordedDetails
  taskList: string[]
  comments: string[]
  tags: string[]
  createdAt: string
  __v: number
}

export type Card = {
  id: number
  title: string
  status: string
}

export type Column = {
  id: number
  status: string
  cards: JobCardDataFormat[]
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
  //tell hamza to add these new one here
  priority: string
  tags: string[]
}
