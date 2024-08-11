export type Person = {
  address: Address
  contactInfo: ContactInfo
  firstName: string
  surname: string
  preferredLanguage: string
  dateOfBirth: string // ISO 8601 date string
  gender: string
  //id: string // Assuming this is a MongoDB ObjectId in string format
  roleId: string // Assuming this is a MongoDB ObjectId in string format
  roleName: string
}

export type JobAssignment = {
  // Define properties for job assignments if there are any
}

export type Subordinate = {
  // Define properties for subordinates if there are any
}

export type SubordinateTeam = {
  // Define properties for subordinate teams if there are any
}

export type Employee = {
  _id: string
  currentJobAssignments: JobAssignment[]
  subordinates: Subordinate[]
  subordinateTeams: SubordinateTeam[]
  userId: string
  companyId: string
  createdAt: string
  __v: number
  roleId: string
  updatedAt: string
  superiorId: string
}

export type EmployeePersonalInfo = {
  address: Address
  contactInfo: ContactInfo
  firstName: string
  surname: string
  preferredLanguage: string
  dateOfBirth: string
  gender: string
  roleId: string
  roleName: string
  employeeId: string
  userId: string
}

export type EmployeeInformation = {
  name: string
  id: string
  role: string
}

export type ClientInformation = {
  name: string
  id: string
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
  roleId: Role[]
  currentJobAssignments: any[]
  subordinates: any[]
  subordinateTeams: any[]
  userId: User[]
  companyId: string
  createdAt: string
  __v: number
}

type Address = {
  street: string
  suburb: string
  province: string
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
  firstName: string
  surname: string
  preferredLanguage: string
  dateOfBirth: string
  gender: string
  address: Address
  contactInfo: ContactInfo
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

type SystemDetails = {
  username: string
  password: string
}

type UserId = {
  _id: string
  systemDetails: SystemDetails
  personalInfo: PersonalInfo
  profile: Profile
  joinedCompanies: JoinedCompany[]
  skills: string[]
  isValidated: boolean
  createdAt: string
  __v: number
  updatedAt: string
  currentEmployee: string
}

export type EmployeeJoinResponse2 = {
  _id: string
  role: Role
  currentJobAssignments: any[]
  subordinates: any[]
  subordinateTeams: any[]
  userId: UserId
  companyId: string
  createdAt: string
  __v: number
}

export type EmployeeInformation2 = {
  name: string
  employeeId: string
}

export type RoleItem = {
  roleName: string
  roleId: string
}

export type Role = {
  roleId: string
  roleName: string
  permissionSuite: string[]
}
