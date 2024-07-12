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
  roleId: Role[]
  currentJobAssignments: any[]
  subordinates: any[]
  subordinateTeams: any[]
  userId: User[]
  companyId: string
  createdAt: string
  __v: number
}
