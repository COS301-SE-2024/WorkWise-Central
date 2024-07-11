export type Address = {
  street: string
  suburb: string
  city: string
  postalCode: string
  complex: string
  houseNumber: string
}

export type ContactInfo = {
  phoneNumber: string
  email: string
}

export type Person = {
  address: Address
  contactInfo: ContactInfo
  firstName: string
  surname: string
  preferredLanguage: string
  dateOfBirth: string // ISO 8601 date string
  gender: string
  id: string // Assuming this is a MongoDB ObjectId in string format
  roleId: string // Assuming this is a MongoDB ObjectId in string format
  roleName: string
}

export type SystemDetails = {
  email: string
  password: string
  username: string
  _id: string
}

export type Profile = {
  displayName: string
  displayImage: string
  _id: string
}

export type Roles = {
  role: string
  permissions: string[]
  _id: string
}

export type JoinedCompany = {
  // Define properties for joined companies if there are any; currently it's an empty object
  // e.g., companyName?: string
}

export type User = {
  data: {
    _id: string
    systemDetails: SystemDetails
    personalInfo: EmployeePersonalInfo
    profile: Profile
    roles: Roles
    joinedCompanies: JoinedCompany[]
    skills: string[]
    created_at: string // ISO 8601 date string
    __v: number
  }
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
  address: {
    street: string
    suburb: string
    city: string
    postalCode: string
    complex: string
    houseNumber: string
  }
  contactInfo: {
    phoneNumber: string
    email: string
  }
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
  employeeId: string
}

export type ClientInformation = {
  name: string
  id: string
}
