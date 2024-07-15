<template>
  <div id="kanban_container">
    <ejs-kanban
      ref="kanban"
      :dataSource="data3"
      keyField="status"
      :cardSettings="cardSettings"
      width="auto"
      :cardClick="jobClick"
    >
      <e-columns>
        <e-column keyField="Todo" headerText="Todo" ></e-column>
        <e-column keyField="In Progress" headerText="In Progress"></e-column>
        <e-column keyField="Awaiting review" headerText="Awaiting review"></e-column>
        <e-column keyField="Done" headerText="Done"></e-column>
      </e-columns>
      <template #cardTemplate="{ data }">
        <div class="e-card-content">
          <table class="card-template-wrap">
            <tbody>
              <th class="CardHeaderContainer">
                <td class="CardHeader">
                  {{ data.heading}}
                </td>
              </th>
              <tr>
                <td ><v-chip
                  class="ma-2"
                  color="indigo"
                  size="small"
                >
                  {{data.priority + " Priority"}}
                </v-chip></td>
              </tr>
              <tr>
                <td class="status_container">
                  <span class="bolded">Status: </span>{{ data.status }}
                </td>
              </tr>
              <tr>
                <td class="client_name_container">
                  <span class="bolded">Client: </span>{{ data.clientName }}
                </td>
              </tr>
              <tr>
                <td ><span class="bolded">Start-Date: </span>{{ formatDate(data.startDate) }}</td>
              </tr>
              <tr>
                <td ><span class="bolded">End-Date: </span>{{ formatDate(data.endDate) }}</td>
              </tr>

<!--              <tr>-->
<!--                <td class="card-tag-container" ><span class="bolded">Tags:</span><v-chip-->
<!--                  class="ma-2"-->
<!--                  color="indigo"-->
<!--                >-->
<!--&lt;!&ndash;                  {{data.tags.map((tag:string)=>{'<span class="tag">${tag}</span>'}).join('')}}&ndash;&gt;-->
<!--                </v-chip></td>-->
<!--              </tr>-->
            </tbody>
          </table>
        </div>
      </template>
    </ejs-kanban>
  </div>
  <v-dialog v-model="JobCardVisibility" max-width="1000px">
    <JBC @close="JobCardVisibility = false" :passedInJob="selectedJob" />
  </v-dialog>
</template>

<script lang="ts">
import { KanbanComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-vue-kanban'
import axios from 'axios'
import JBC from '@/components/home/jobs/management/ManagerJobCard.vue'

type KanbanJob = {
  Id: string;
  Status: string;
  Title:string;
  Client: string;
  Description: string;
  Notes: string;
  Date: string;
  Address: string;
  Assignee: string;
  Priority: string;
  Tags: string[];
};

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
  priority:string
  tags: string[]
}



export default {
  name: 'EmplyeeJobView-Component',
  components: {
    JBC,
    'ejs-kanban': KanbanComponent,
    'e-column': ColumnDirective,
    'e-columns': ColumnsDirective
  },
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      request_config: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      },
      data: [
        {
          Id: 123456,
          Status: 'Awaiting review',
          Client: 'Alice Johnson',
          Description: 'Install new kitchen appliances',
          Notes: 'Client prefers morning appointment',
          Date: '2024-06-15',
          Address: '5678 Oak St',
          Assignee: '',
          Priority: 'Normal',
          Tags: ['Installation', 'Appliances', 'Kitchen']
        },
        {
          Id: 234567,
          Status: 'Todo',
          Client: 'Bob Brown',
          Description: 'Done annual HVAC maintenance',
          Notes: 'Check filter and thermostat settings',
          Date: '2024-06-17',
          Address: '91011 Pine St',
          Assignee: 'Mike Johnson',
          Priority: 'High',
          Tags: ['HVAC', 'Maintenance', 'Annual']
        },
        {
          Id: 345678,
          Status: 'In Progress',
          Client: 'Cathy Green',
          Description: 'Repair leaking bathroom faucet',
          Notes: 'Client reported issue last week',
          Date: '2024-06-14',
          Address: '1213 Maple St',
          Assignee: 'Sam Williams',
          Priority: 'High',
          Tags: ['Repair', 'Plumbing', 'Bathroom']
        },
        {
          Id: 456789,
          Status: 'Done',
          Client: 'David Lee',
          Description: 'Paint exterior of house',
          Notes: 'Waiting for client to choose paint color',
          Date: '2024-06-20',
          Address: '1415 Birch St',
          Assignee: 'Emma Davis',
          Priority: 'Low',
          Tags: ['Painting', 'Exterior', 'House']
        },
        {
          Id: 567890,
          Status: 'Done',
          Client: 'Eva Martinez',
          Description: 'Install home security system',
          Notes: 'System installed, tested, and verified',
          Date: '2024-06-10',
          Address: '1617 Cedar St',
          Assignee: 'Chris Brown',
          Priority: 'High',
          Tags: ['Security', 'Installation', 'Home']
        },
        {
          Id: 678901,
          Status: 'In Progress',
          Client: 'Frank White',
          Description: 'Landscape front yard',
          Notes: "Awaiting client's approval of design",
          Date: '2024-06-12',
          Address: '1819 Spruce St',
          Assignee: 'Nancy Wilson',
          Priority: 'Normal',
          Tags: ['Landscaping', 'Design', 'Front Yard']
        },
        {
          Id: 789012,
          Status: 'Awaiting review',
          Client: 'Grace King',
          Description: 'Clean and organize garage',
          Notes: 'Client cancelled due to rescheduling',
          Date: '2024-06-11',
          Address: '2021 Elm St',
          Assignee: 'Jamie Carragaher',
          Priority: 'Low',
          Tags: ['Cleaning', 'Organization', 'Garage']
        },
        {
          Id: 890123,
          Status: 'Done',
          Client: 'Henry Hall',
          Description: 'Fix broken window',
          Notes: 'Unable to access the window area',
          Date: '2024-06-13',
          Address: '2223 Fir St',
          Assignee: 'Alice Brown',
          Priority: 'High',
          Tags: ['Repair', 'Window', 'Emergency']
        },
        {
          Id: 901234,
          Status: 'Todo',
          Client: 'Isla Moore',
          Description: 'Deep clean office building',
          Notes: 'Focus on high-traffic areas',
          Date: '2024-06-18',
          Address: '3456 Ash St',
          Assignee: 'David Johnson',
          Priority: 'Normal',
          Tags: ['Cleaning', 'Office', 'Deep Clean']
        },
        {
          Id: 123789,
          Status: 'Done',
          Client: 'Jack Taylor',
          Description: 'Install new garden lights',
          Notes: 'Waiting for delivery of lights',
          Date: '2024-06-21',
          Address: '4567 Willow St',
          Assignee: 'Sarah Brown',
          Priority: 'Low',
          Tags: ['Installation', 'Lighting', 'Garden']
        },
        {
          Id: 234890,
          Status: 'In Progress',
          Client: 'Karen Clark',
          Description: 'Fix garage door opener',
          Notes: 'Parts ordered, awaiting delivery',
          Date: '2024-06-19',
          Address: '6789 Elm St',
          Assignee: 'Paul Anderson',
          Priority: 'High',
          Tags: ['Repair', 'Garage', 'Door Opener']
        },
        {
          Id: 345901,
          Status: 'Todo',
          Client: 'Liam Davis',
          Description: 'Replace broken tiles in bathroom',
          Notes: 'Client chose new tile design',
          Date: '2024-06-22',
          Address: '7890 Maple St',
          Assignee: 'Steve Wilson',
          Priority: 'Normal',
          Tags: ['Repair', 'Tiles', 'Bathroom']
        },
        {
          Id: 456012,
          Status: 'Done',
          Client: 'Mia Garcia',
          Description: 'Install ceiling fans',
          Notes: 'Fans installed and tested',
          Date: '2024-06-09',
          Address: '8901 Oak St',
          Assignee: 'Rick Harris',
          Priority: 'High',
          Tags: ['Installation', 'Ceiling Fans', 'Electrical'],
        },
        {
          Id: 567123,
          Status: 'Awaiting review',
          Client: 'Noah Martinez',
          Description: 'Repair roof leak',
          Notes: 'Client reported issue after storm',
          Date: '2024-06-14',
          Address: '1234 Pine St',
          Assignee: '',
          Priority: 'High',
          Tags: ['Repair', 'Roof', 'Leak']
        },
        {
          Id: 678234,
          Status: 'In Progress',
          Client: 'Olivia Lee',
          Description: 'Service pool pump',
          Notes: 'Pump making unusual noise',
          Date: '2024-06-16',
          Address: '2345 Birch St',
          Assignee: 'Tom Collins',
          Priority: 'Normal',
          Tags: ['Maintenance', 'Pool', 'Pump']
        },
        {
          Id: 789345,
          Status: 'Todo',
          Client: 'Patrick Adams',
          Description: 'Install new fence',
          Notes: 'Client chose cedar wood',
          Date: '2024-06-23',
          Address: '3456 Cedar St',
          Assignee: 'Emma Thompson',
          Priority: 'Normal',
          Tags: ['Installation', 'Fence', 'Wood']
        }
      ],
      data2:[
        {
          id: "668ac2347010b9a158fcfbcd",
          companyId: "668ac08a7010b9a158fcfbae",
          client: {
            id: "66784ca7722dc76bc8aed8c7",
            clientUsername: "john_doe",
            details: {
              name: "John Doe",
              preferredLanguage: "English",
              contactInfo: {
                email: "john.doe@example.com",
                phoneNumber: "0723456789"
              },
              address: {
                street: "123 Main Street",
                suburb: "Central",
                city: "Johannesburg",
                postalCode: "2000",
                complex: "Main Complex",
                houseNumber: "12"
              }
            },
            createdAt: "2024-06-23T16:26:15.355Z",
            __v: 0,
            updatedAt: "2024-07-07T22:20:15.449Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbb6",
          status: "Todo",
          details: {
            heading: "Kitchen Renovation",
            description: "Complete kitchen renovation for John Doe",
            priority:"Low",
            address: {
              street: "123 Main Street",
              suburb: "Central",
              city: "Johannesburg",
              postalCode: "2000",
              complex: "Main Complex",
              houseNumber: "12"
            },
            startDate: "2024-07-10T08:00:00.000Z",
            endDate: "2024-07-20T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Renovation", "Kitchen", "Construction"],
          createdAt: "2024-07-07T16:28:36.446Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbcf",
          companyId: "668ac08a7010b9a158fcfbaf",
          client: {
            id: "66784ca7722dc76bc8aed8c8",
            clientUsername: "mary_jane",
            details: {
              name: "Mary Jane",
              preferredLanguage: "Afrikaans",
              contactInfo: {
                email: "mary.jane@example.com",
                phoneNumber: "0734567890"
              },
              address: {
                street: "456 Oak Avenue",
                suburb: "Northcliff",
                city: "Cape Town",
                postalCode: "8001",
                complex: "Oak Villas",
                houseNumber: "34"
              }
            },
            createdAt: "2024-06-24T12:15:00.000Z",
            __v: 0,
            updatedAt: "2024-07-08T09:30:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbb7",
          status: "In Progress",
          details: {
            heading: "Bathroom Plumbing",
            description: "Fixing plumbing issues in Mary Jane's bathroom",
            priority:"High",
            address: {
              street: "456 Oak Avenue",
              suburb: "Northcliff",
              city: "Cape Town",
              postalCode: "8001",
              complex: "Oak Villas",
              houseNumber: "34"
            },
            startDate: "2024-07-12T09:00:00.000Z",
            endDate: "2024-07-15T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Plumbing", "Bathroom", "Repair"],
          createdAt: "2024-07-08T10:00:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd0",
          companyId: "668ac08a7010b9a158fcfbaf",
          client: {
            id: "66784ca7722dc76bc8aed8c9",
            clientUsername: "peter_parker",
            details: {
              name: "Peter Parker",
              preferredLanguage: "Zulu",
              contactInfo: {
                email: "peter.parker@example.com",
                phoneNumber: "0745678901"
              },
              address: {
                street: "789 Pine Street",
                suburb: "Green Point",
                city: "Durban",
                postalCode: "4001",
                complex: "Pine Estate",
                houseNumber: "56"
              }
            },
            createdAt: "2024-06-25T14:45:00.000Z",
            __v: 0,
            updatedAt: "2024-07-09T11:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbb8",
          status: "Awaiting review",
          details: {
            heading: "Garden Landscaping",
            description: "Landscaping the garden for Peter Parker",
            priority:"Low",
            address: {
              street: "789 Pine Street",
              suburb: "Green Point",
              city: "Durban",
              postalCode: "4001",
              complex: "Pine Estate",
              houseNumber: "56"
            },
            startDate: "2024-07-13T07:30:00.000Z",
            endDate: "2024-07-18T16:30:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Landscaping", "Garden", "Outdoor"],
          createdAt: "2024-07-09T11:15:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd1",
          companyId: "668ac08a7010b9a158fcfbb0",
          client: {
            id: "66784ca7722dc76bc8aed8ca",
            clientUsername: "bruce_wayne",
            details: {
              name: "Bruce Wayne",
              preferredLanguage: "English",
              contactInfo: {
                email: "bruce.wayne@example.com",
                phoneNumber: "0712345678"
              },
              address: {
                street: "100 Wayne Manor",
                suburb: "Gotham",
                city: "New York",
                postalCode: "10001",
                complex: "Wayne Complex",
                houseNumber: "1"
              }
            },
            createdAt: "2024-06-26T10:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-10T14:30:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbb9",
          status: "Done",
          details: {
            heading: "Home Security Installation",
            description: "Installing security systems at Bruce Wayne's home",
            priority:"Medium",
            address: {
              street: "100 Wayne Manor",
              suburb: "Gotham",
              city: "New York",
              postalCode: "10001",
              complex: "Wayne Complex",
              houseNumber: "1"
            },
            startDate: "2024-07-11T08:00:00.000Z",
            endDate: "2024-07-14T18:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Security", "Installation", "Home"],
          createdAt: "2024-07-10T15:00:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd2",
          companyId: "668ac08a7010b9a158fcfbb1",
          client: {
            id: "66784ca7722dc76bc8aed8cb",
            clientUsername: "clark_kent",
            details: {
              name: "Clark Kent",
              preferredLanguage: "English",
              contactInfo: {
                email: "clark.kent@example.com",
                phoneNumber: "0734567890"
              },
              address: {
                street: "200 Metropolis St",
                suburb: "Downtown",
                city: "Metropolis",
                postalCode: "10002",
                complex: "Daily Planet Complex",
                houseNumber: "20"
              }
            },
            createdAt: "2024-06-27T12:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-11T10:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbbc",
          status: "In Progress",
          details: {
            heading: "Office Renovation",
            description: "Renovating Clark Kent's office",
            priority:"High",
            address: {
              street: "200 Metropolis St",
              suburb: "Downtown",
              city: "Metropolis",
              postalCode: "10002",
              complex: "Daily Planet Complex",
              houseNumber: "20"
            },
            startDate: "2024-07-12T09:00:00.000Z",
            endDate: "2024-07-19T18:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Renovation", "Office", "Construction"],
          createdAt: "2024-07-11T10:30:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd3",
          companyId: "668ac08a7010b9a158fcfbb2",
          client: {
            id: "66784ca7722dc76bc8aed8cc",
            clientUsername: "diana_prince",
            details: {
              name: "Diana Prince",
              preferredLanguage: "Greek",
              contactInfo: {
                email: "diana.prince@example.com",
                phoneNumber: "0745678901"
              },
              address: {
                street: "300 Amazon Way",
                suburb: "Paradise Island",
                city: "Themyscira",
                postalCode: "10003",
                complex: "Amazon Complex",
                houseNumber: "30"
              }
            },
            createdAt: "2024-06-28T14:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-12T11:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbbd",
          status: "Todo",
          details: {
            heading: "Gym Equipment Installation",
            description: "Installing gym equipment for Diana Prince",
            priority:"Low",
            address: {
              street: "300 Amazon Way",
              suburb: "Paradise Island",
              city: "Themyscira",
              postalCode: "10003",
              complex: "Amazon Complex",
              houseNumber: "30"
            },
            startDate: "2024-07-13T08:00:00.000Z",
            endDate: "2024-07-15T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Installation", "Gym", "Equipment"],
          createdAt: "2024-07-12T11:30:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd4",
          companyId: "668ac08a7010b9a158fcfbb3",
          client: {
            id: "66784ca7722dc76bc8aed8cd",
            clientUsername: "barry_allen",
            details: {
              name: "Barry Allen",
              preferredLanguage: "English",
              contactInfo: {
                email: "barry.allen@example.com",
                phoneNumber: "0756789012"
              },
              address: {
                street: "400 Speedster Lane",
                suburb: "Central City",
                city: "Central City",
                postalCode: "10004",
                complex: "Speed Complex",
                houseNumber: "40"
              }
            },
            createdAt: "2024-06-29T15:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-13T12:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbbe",
          status: "In Progress",
          details: {
            heading: "Electrical Rewiring",
            description: "Rewiring the electrical system for Barry Allen",
            priority:"Low",
            address: {
              street: "400 Speedster Lane",
              suburb: "Central City",
              city: "Central City",
              postalCode: "10004",
              complex: "Speed Complex",
              houseNumber: "40"
            },
            startDate: "2024-07-14T08:00:00.000Z",
            endDate: "2024-07-18T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Electrical", "Rewiring", "Repair"],
          createdAt: "2024-07-13T12:30:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd5",
          companyId: "668ac08a7010b9a158fcfbb4",
          client: {
            id: "66784ca7722dc76bc8aed8ce",
            clientUsername: "arthur_curry",
            details: {
              name: "Arthur Curry",
              preferredLanguage: "English",
              contactInfo: {
                email: "arthur.curry@example.com",
                phoneNumber: "0767890123"
              },
              address: {
                street: "500 Ocean Drive",
                suburb: "Atlantis",
                city: "Atlantis",
                postalCode: "10005",
                complex: "Ocean Complex",
                houseNumber: "50"
              }
            },
            createdAt: "2024-06-30T16:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-14T13:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbbf",
          status: "Awaiting review",
          details: {
            heading: "Swimming Pool Maintenance",
            description: "Maintaining the swimming pool for Arthur Curry",
            priority:"Medium",
            address: {
              street: "500 Ocean Drive",
              suburb: "Atlantis",
              city: "Atlantis",
              postalCode: "10005",
              complex: "Ocean Complex",
              houseNumber: "50"
            },
            startDate: "2024-07-15T09:00:00.000Z",
            endDate: "2024-07-17T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Maintenance", "Swimming Pool", "Outdoor"],
          createdAt: "2024-07-14T13:30:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd6",
          companyId: "668ac08a7010b9a158fcfbb5",
          client: {
            id: "66784ca7722dc76bc8aed8cf",
            clientUsername: "victor_stone",
            details: {
              name: "Victor Stone",
              preferredLanguage: "English",
              contactInfo: {
                email: "victor.stone@example.com",
                phoneNumber: "0778901234"
              },
              address: {
                street: "600 Tech Avenue",
                suburb: "Science City",
                city: "Star City",
                postalCode: "10006",
                complex: "Tech Complex",
                houseNumber: "60"
              }
            },
            createdAt: "2024-07-01T17:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-15T14:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbc0",
          status: "Done",
          details: {
            heading: "Home Automation Installation",
            description: "Installing home automation system for Victor Stone",
            priority:"High",
            address: {
              street: "600 Tech Avenue",
              suburb: "Science City",
              city: "Star City",
              postalCode: "10006",
              complex: "Tech Complex",
              houseNumber: "60"
            },
            startDate: "2024-07-16T08:00:00.000Z",
            endDate: "2024-07-19T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Automation", "Installation", "Tech"],
          createdAt: "2024-07-15T14:30:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd7",
          companyId: "668ac08a7010b9a158fcfbb6",
          client: {
            id: "66784ca7722dc76bc8aed8d0",
            clientUsername: "hal_jordan",
            details: {
              name: "Hal Jordan",
              preferredLanguage: "English",
              contactInfo: {
                email: "hal.jordan@example.com",
                phoneNumber: "0789012345"
              },
              address: {
                street: "700 Lantern Lane",
                suburb: "Emerald City",
                city: "Coast City",
                postalCode: "10007",
                complex: "Lantern Complex",
                houseNumber: "70"
              }
            },
            createdAt: "2024-07-02T18:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-16T15:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbc1",
          status: "In Progress",
          details: {
            heading: "Roof Repair",
            description: "Repairing the roof for Hal Jordan",
            priority:"High",
            address: {
              street: "700 Lantern Lane",
              suburb: "Emerald City",
              city: "Coast City",
              postalCode: "10007",
              complex: "Lantern Complex",
              houseNumber: "70"
            },
            startDate: "2024-07-17T08:00:00.000Z",
            endDate: "2024-07-20T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Repair", "Roof", "Construction"],
          createdAt: "2024-07-16T15:30:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd8",
          companyId: "668ac08a7010b9a158fcfbb7",
          client: {
            id: "66784ca7722dc76bc8aed8d1",
            clientUsername: "oliver_queen",
            details: {
              name: "Oliver Queen",
              preferredLanguage: "English",
              contactInfo: {
                email: "oliver.queen@example.com",
                phoneNumber: "0790123456"
              },
              address: {
                street: "800 Arrow Street",
                suburb: "Downtown",
                city: "Star City",
                postalCode: "10008",
                complex: "Arrow Complex",
                houseNumber: "80"
              }
            },
            createdAt: "2024-07-03T19:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-17T16:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbc2",
          status: "Awaiting review",
          details: {
            heading: "Fence Installation",
            description: "Installing a fence for Oliver Queen",
            priority:"High",
            address: {
              street: "800 Arrow Street",
              suburb: "Downtown",
              city: "Star City",
              postalCode: "10008",
              complex: "Arrow Complex",
              houseNumber: "80"
            },
            startDate: "2024-07-18T09:00:00.000Z",
            endDate: "2024-07-22T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Installation", "Fence", "Outdoor"],
          createdAt: "2024-07-17T16:30:00.000Z",
          __v: 0
        },
        {
          id: "668ac2347010b9a158fcfbd9",
          companyId: "668ac08a7010b9a158fcfbb8",
          client: {
            id: "66784ca7722dc76bc8aed8d2",
            clientUsername: "john_constantine",
            details: {
              name: "John Constantine",
              preferredLanguage: "English",
              contactInfo: {
                email: "john.constantine@example.com",
                phoneNumber: "0701234567"
              },
              address: {
                street: "900 Occult Avenue",
                suburb: "Mystic",
                city: "London",
                postalCode: "10009",
                complex: "Occult Complex",
                houseNumber: "90"
              }
            },
            createdAt: "2024-07-04T20:00:00.000Z",
            __v: 0,
            updatedAt: "2024-07-18T17:00:00.000Z"
          },
          assignedBy: "668ac08b7010b9a158fcfbc3",
          status: "Done",
          details: {
            heading: "Basement Waterproofing",
            description: "Waterproofing the basement for John Constantine",
            priority:"Low",
            address: {
              street: "900 Occult Avenue",
              suburb: "Mystic",
              city: "London",
              postalCode: "10009",
              complex: "Occult Complex",
              houseNumber: "90"
            },
            startDate: "2024-07-19T08:00:00.000Z",
            endDate: "2024-07-22T17:00:00.000Z"
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ["Waterproofing", "Basement", "Construction"],
          createdAt: "2024-07-18T17:30:00.000Z",
          __v: 0
        }],
      data3:[] as JobCardDataFormat[],
      selectedJob: {} as JobCardDataFormat,
      JobCardVisibility:false,
      cardSettings: {
        contentField: 'jobDescription',
        headerField: 'jobId',
        tagsField: 'Tags',
        template: 'cardTemplate'
      },
      // sortSettings: {
      //   sortBy: 'Custom',
      //   field: 'Priority',
      //   direction: 'Descending'
      // }
    }
  },
  created(){
    this.loadMockData()
  },
  methods: {
    // attachDoubleClickEvent() {
    //   const kanbanElement = this.$refs.kanban.$el;
    //   const cardElements = kanbanElement.querySelectorAll('.e-card');
    //
    //   cardElements.forEach((card:any) => {
    //     card.addEventListener('dblclick', this.onCardDoubleClick);
    //   });
    // },
    // onCardDoubleClick(event:any) {
    //   // Handle double click event here
    //   const cardData = event.target.closest('.e-card').ej2_instances[0].data;
    //   console.log('Card double-clicked:', cardData);
    // },
    async loadData()
    {
      // const apiURL = await this.getRequestUrl()
      // try {
      //   const jobs_data = await axios.get(apiURL + `job/all/employee/${sessionStorage.getItem('id')}`, this.request_config)
      // }catch(err)
      // {
      //   console.log("Error Fetching Data: ", err)
      // }
    },

    loadMockData(){
      this.data2.forEach((job)=>{
        const jobcard:JobCardDataFormat = {
          jobId: job.id,
          heading: job.details.heading,
          jobDescription: job.details.description,
          startDate: job.details.startDate,
          endDate: job.details.endDate,
          status: job.status,
          clientName: job.client.details.name,
          street: job.details.address.street,
          suburb: job.details.address.suburb,
          city: job.details.address.city,
          postalCode: job.details.address.postalCode,
          complex: job.details.address.complex,
          houseNumber: job.details.address.houseNumber,
          imagesTaken: job.recordedDetails.imagesTaken,
          inventoryUsed: job.recordedDetails.inventoryUsed,
          taskList: job.taskList,
          comments: job.comments,
          priority: job.details.priority,
          tags: job.tags
        }
        this.data3.push(jobcard)
      })
      console.log("hello there")
    },
    changer() {
      console.log('There was a change')
    },
    jobClick(ev:any){
      console.log("Job was clicked")
      console.log(ev.data)
      this.selectedJob = ev.data
      this.JobCardVisibility = true
    },
    formatDate(date: string) {
      const date_passed_in = new Date(date)
      const y = date_passed_in.getFullYear()
      const m = String(date_passed_in.getMonth() + 1).padStart(2, '0')
      const d = String(date_passed_in.getDate()).padStart(2, '0')
      const h = String(date_passed_in.getHours()).padStart(2, '0')
      const mn = String(date_passed_in.getMinutes()).padStart(2, '0')
      const f_date = `${y}-${m}-${d} ${h}:${mn}`
      // console.log(f_date)
      return f_date
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  },
  mounted(){
    // this.attachDoubleClickEvent()
  }
}
</script>

<style>
.CardHeaderContainer
{
  display: flex;
  justify-content: center;
  padding:0;
  margin:0;
}

.CardHeader{
  text-align: center;
  font-size: 20px;
  color: #227D9B;
}

.card-template-wrap:hover{
  cursor:grab;
}

.card-template-wrap{
  width: 100%;
  height: 100%;
  padding:0;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
}




.e-card-content {
  padding: 0 !important;
  background-color: white;
}

.e-card-content tr td{
  background-color: white;
}


.e-kanban .card-template-wrap td {
  background: none;
}
.bolded {
  font-weight: bold;
}

.client_name_container{
  font-size: 12pt;
  font-weight: bold;
}

.status_container{
  font-size: 12pt;
  font-weight: bold;
}


.e-kanban .e-kanban-table.e-header-table .e-header-row:not(.e-swimlane-row) th[data-key="Todo"],
.e-kanban .e-kanban-table.e-content-table .e-content-row:not(.e-swimlane-row) td[data-key="Todo"] {

  background-color: #F1F2F4;

}

.e-kanban .e-kanban-table.e-header-table .e-header-row:not(.e-swimlane-row) th[data-key="In Progress"],
.e-kanban .e-kanban-table.e-content-table .e-content-row:not(.e-swimlane-row) td[data-key="In Progress"] {

  background-color: #F1F2F4;

}

.e-kanban .e-kanban-table.e-header-table .e-header-row:not(.e-swimlane-row) th[data-key="Awaiting review"],
.e-kanban .e-kanban-table.e-content-table .e-content-row:not(.e-swimlane-row) td[data-key="Awaiting review"] {

  background-color: #F1F2F4;

}

.e-kanban .e-kanban-table.e-header-table .e-header-row:not(.e-swimlane-row) th[data-key="Done"],
.e-kanban .e-kanban-table.e-content-table .e-content-row:not(.e-swimlane-row) td[data-key="Done"] {

  background-color: #F1F2F4;

}

</style>
