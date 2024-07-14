example of use of Qalendar library (event listeners, configuration etc...) this is in case i forget
how to use this library
https://github.com/tomosterlund/qalendar/blob/master/development/QalendarView.vue

<template>
  <Qalendar
    :events="events2"
    :config="config"
    :is-loading="are_events_loading"
    @event-was-clicked="clicked"
    @delete-event="deleteEvent"
  >
    <template #customCurrentTime>
      <div :style="{ height: '3px', backgroundColor: '#F38A3F', position: 'relative' }">
        <div
          :style="{
            position: 'absolute',
            left: '-7px',
            top: '-6px',
            height: '15px',
            width: '15px',
            backgroundColor: '#F38A3F',
            borderRadius: '50%'
          }"
        ></div>
      </div>
    </template>
  </Qalendar>
</template>

<script lang="ts">
// to add light mode use put this "is-light-mode" in the class attribute of the div that contains the Qalendar component
// @ts-ignore
import { Qalendar } from 'qalendar'
import axios from 'axios'
import type { Event } from '@/components/home/dashboard/types'

export default {
  name: 'CalendarComponent',
  components: {
    Qalendar
  },
  data() {
    return {
      isdarkmode: localStorage['theme'] === 'true',
      available_event_colors: ['blue', 'yellow', 'green', 'red', 'pink', 'purple', 'turquoise'],
      are_events_loading: true,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      request_config: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      },
      events: [
        // ...
        {
          title: 'Advanced algebra',
          with: 'Chandler Bing',
          time: { start: '2024-07-12 03:05', end: '2024-07-12 08:00' },
          color: 'yellow',
          isEditable: false,
          id: '753944708f0f',
          location: 'Room 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!'
        },
        {
          title: 'Ralph on holiday',
          with: 'Rachel Greene',
          time: { start: '2024-07-12 08:05', end: '2024-07-12 14:00' },
          color: 'pink',
          isEditable: true,
          id: '5602b6f589fc'
        }
        // ...
      ],
      jobs: [
        {
          id: '668ac2347010b9a158fcfbcd',
          companyId: '668ac08a70109a158fcfbae',
          client: {
            id: '66784ca7722dc76bc8aed8c7',
            clientUsername: 'john_doe',
            details: {
              name: 'John Doe',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'john.doe@example.com',
                phoneNumber: '0723456789'
              },
              address: {
                street: '123 Main Street',
                suburb: 'Central',
                city: 'Johannesburg',
                postalCode: '2000',
                complex: 'Main Complex',
                houseNumber: '12'
              }
            },
            createdAt: '2024-06-23T16:26:15.355Z',
            __v: 0,
            updatedAt: '2024-07-07T22:20:15.449Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbb6',
          status: 'Todo',
          details: {
            heading: 'Kitchen Renovation',
            description: 'Complete kitchen renovation for John Doe',
            priority: 'Low',
            address: {
              street: '123 Main Street',
              suburb: 'Central',
              city: 'Johannesburg',
              postalCode: '2000',
              complex: 'Main Complex',
              houseNumber: '12'
            },
            startDate: `2024-07-13T07:00:00.000Z`,
            endDate: `2024-07-13T16:00:00.000Z`
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Renovation', 'Kitchen', 'Construction'],
          createdAt: '2024-07-07T16:28:36.446Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbcf',
          companyId: '668ac08a7010b9a158fcfbaf',
          client: {
            id: '66784ca7722dc76bc8aed8c8',
            clientUsername: 'mary_jane',
            details: {
              name: 'Mary Jane',
              preferredLanguage: 'Afrikaans',
              contactInfo: {
                email: 'mary.jane@example.com',
                phoneNumber: '0734567890'
              },
              address: {
                street: '456 Oak Avenue',
                suburb: 'Northcliff',
                city: 'Cape Town',
                postalCode: '8001',
                complex: 'Oak Villas',
                houseNumber: '34'
              }
            },
            createdAt: '2024-06-24T12:15:00.000Z',
            __v: 0,
            updatedAt: '2024-07-08T09:30:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbb7',
          status: 'In Progress',
          details: {
            heading: 'Bathroom Plumbing',
            description: "Fixing plumbing issues in Mary Jane's bathroom",
            priority: 'High',
            address: {
              street: '456 Oak Avenue',
              suburb: 'Northcliff',
              city: 'Cape Town',
              postalCode: '8001',
              complex: 'Oak Villas',
              houseNumber: '34'
            },
            startDate: '2024-07-12T09:00:00.000Z',
            endDate: '2024-07-15T17:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Plumbing', 'Bathroom', 'Repair'],
          createdAt: '2024-07-08T10:00:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd0',
          companyId: '668ac08a7010b9a158fcfbaf',
          client: {
            id: '66784ca7722dc76bc8aed8c9',
            clientUsername: 'peter_parker',
            details: {
              name: 'Peter Parker',
              preferredLanguage: 'Zulu',
              contactInfo: {
                email: 'peter.parker@example.com',
                phoneNumber: '0745678901'
              },
              address: {
                street: '789 Pine Street',
                suburb: 'Green Point',
                city: 'Durban',
                postalCode: '4001',
                complex: 'Pine Estate',
                houseNumber: '56'
              }
            },
            createdAt: '2024-06-25T14:45:00.000Z',
            __v: 0,
            updatedAt: '2024-07-09T11:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbb8',
          status: 'Awaiting review',
          details: {
            heading: 'Garden Landscaping',
            description: 'Landscaping the garden for Peter Parker',
            priority: 'Low',
            address: {
              street: '789 Pine Street',
              suburb: 'Green Point',
              city: 'Durban',
              postalCode: '4001',
              complex: 'Pine Estate',
              houseNumber: '56'
            },
            startDate: '2024-07-13T07:30:00.000Z',
            endDate: '2024-07-18T16:30:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Landscaping', 'Garden', 'Outdoor'],
          createdAt: '2024-07-09T11:15:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd1',
          companyId: '668ac08a7010b9a158fcfbb0',
          client: {
            id: '66784ca7722dc76bc8aed8ca',
            clientUsername: 'bruce_wayne',
            details: {
              name: 'Bruce Wayne',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'bruce.wayne@example.com',
                phoneNumber: '0712345678'
              },
              address: {
                street: '100 Wayne Manor',
                suburb: 'Gotham',
                city: 'New York',
                postalCode: '10001',
                complex: 'Wayne Complex',
                houseNumber: '1'
              }
            },
            createdAt: '2024-06-26T10:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-10T14:30:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbb9',
          status: 'Done',
          details: {
            heading: 'Home Security Installation',
            description: "Installing security systems at Bruce Wayne's home",
            priority: 'Medium',
            address: {
              street: '100 Wayne Manor',
              suburb: 'Gotham',
              city: 'New York',
              postalCode: '10001',
              complex: 'Wayne Complex',
              houseNumber: '1'
            },
            startDate: '2024-07-11T08:00:00.000Z',
            endDate: '2024-07-13T18:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Security', 'Installation', 'Home'],
          createdAt: '2024-07-10T15:00:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd2',
          companyId: '668ac08a7010b9a158fcfbb1',
          client: {
            id: '66784ca7722dc76bc8aed8cb',
            clientUsername: 'clark_kent',
            details: {
              name: 'Clark Kent',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'clark.kent@example.com',
                phoneNumber: '0734567890'
              },
              address: {
                street: '200 Metropolis St',
                suburb: 'Downtown',
                city: 'Metropolis',
                postalCode: '10002',
                complex: 'Daily Planet Complex',
                houseNumber: '20'
              }
            },
            createdAt: '2024-06-27T12:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-11T10:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbbc',
          status: 'In Progress',
          details: {
            heading: 'Office Renovation',
            description: "Renovating Clark Kent's office",
            priority: 'High',
            address: {
              street: '200 Metropolis St',
              suburb: 'Downtown',
              city: 'Metropolis',
              postalCode: '10002',
              complex: 'Daily Planet Complex',
              houseNumber: '20'
            },
            startDate: '2024-07-12T09:00:00.000Z',
            endDate: '2024-07-19T18:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Renovation', 'Office', 'Construction'],
          createdAt: '2024-07-11T10:30:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd3',
          companyId: '668ac08a7010b9a158fcfbb2',
          client: {
            id: '66784ca7722dc76bc8aed8cc',
            clientUsername: 'diana_prince',
            details: {
              name: 'Diana Prince',
              preferredLanguage: 'Greek',
              contactInfo: {
                email: 'diana.prince@example.com',
                phoneNumber: '0745678901'
              },
              address: {
                street: '300 Amazon Way',
                suburb: 'Paradise Island',
                city: 'Themyscira',
                postalCode: '10003',
                complex: 'Amazon Complex',
                houseNumber: '30'
              }
            },
            createdAt: '2024-06-28T14:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-12T11:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbbd',
          status: 'Todo',
          details: {
            heading: 'Gym Equipment Installation',
            description: 'Installing gym equipment for Diana Prince',
            address: {
              street: '300 Amazon Way',
              suburb: 'Paradise Island',
              city: 'Themyscira',
              postalCode: '10003',
              complex: 'Amazon Complex',
              houseNumber: '30'
            },
            startDate: '2024-07-13T08:00:00.000Z',
            endDate: '2024-07-15T17:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Installation', 'Gym', 'Equipment'],
          createdAt: '2024-07-12T11:30:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd4',
          companyId: '668ac08a7010b9a158fcfbb3',
          client: {
            id: '66784ca7722dc76bc8aed8cd',
            clientUsername: 'barry_allen',
            details: {
              name: 'Barry Allen',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'barry.allen@example.com',
                phoneNumber: '0756789012'
              },
              address: {
                street: '400 Speedster Lane',
                suburb: 'Central City',
                city: 'Central City',
                postalCode: '10004',
                complex: 'Speed Complex',
                houseNumber: '40'
              }
            },
            createdAt: '2024-06-29T15:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-13T12:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbbe',
          status: 'In Progress',
          details: {
            heading: 'Electrical Rewiring',
            description: 'Rewiring the electrical system for Barry Allen',
            priority: 'Low',
            address: {
              street: '400 Speedster Lane',
              suburb: 'Central City',
              city: 'Central City',
              postalCode: '10004',
              complex: 'Speed Complex',
              houseNumber: '40'
            },
            startDate: '2024-07-13T08:00:00.000Z',
            endDate: '2024-07-18T17:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Electrical', 'Rewiring', 'Repair'],
          createdAt: '2024-07-13T12:30:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd5',
          companyId: '668ac08a7010b9a158fcfbb4',
          client: {
            id: '66784ca7722dc76bc8aed8ce',
            clientUsername: 'arthur_curry',
            details: {
              name: 'Arthur Curry',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'arthur.curry@example.com',
                phoneNumber: '0767890123'
              },
              address: {
                street: '500 Ocean Drive',
                suburb: 'Atlantis',
                city: 'Atlantis',
                postalCode: '10005',
                complex: 'Ocean Complex',
                houseNumber: '50'
              }
            },
            createdAt: '2024-06-30T16:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-13T13:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbbf',
          status: 'Awaiting review',
          details: {
            heading: 'Swimming Pool Maintenance',
            description: 'Maintaining the swimming pool for Arthur Curry',
            priority: 'Medium',
            address: {
              street: '500 Ocean Drive',
              suburb: 'Atlantis',
              city: 'Atlantis',
              postalCode: '10005',
              complex: 'Ocean Complex',
              houseNumber: '50'
            },
            startDate: '2024-07-15T09:00:00.000Z',
            endDate: '2024-07-17T17:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Maintenance', 'Swimming Pool', 'Outdoor'],
          createdAt: '2024-07-14T13:30:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd6',
          companyId: '668ac08a7010b9a158fcfbb5',
          client: {
            id: '66784ca7722dc76bc8aed8cf',
            clientUsername: 'victor_stone',
            details: {
              name: 'Victor Stone',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'victor.stone@example.com',
                phoneNumber: '0778901234'
              },
              address: {
                street: '600 Tech Avenue',
                suburb: 'Science City',
                city: 'Star City',
                postalCode: '10006',
                complex: 'Tech Complex',
                houseNumber: '60'
              }
            },
            createdAt: '2024-07-01T17:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-15T13:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbc0',
          status: 'Done',
          details: {
            heading: 'Home Automation Installation',
            description: 'Installing home automation system for Victor Stone',
            priority: 'High',
            address: {
              street: '600 Tech Avenue',
              suburb: 'Science City',
              city: 'Star City',
              postalCode: '10006',
              complex: 'Tech Complex',
              houseNumber: '60'
            },
            startDate: '2024-07-16T08:00:00.000Z',
            endDate: '2024-07-19T17:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Automation', 'Installation', 'Tech'],
          createdAt: '2024-07-15T13:30:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd7',
          companyId: '668ac08a7010b9a158fcfbb6',
          client: {
            id: '66784ca7722dc76bc8aed8d0',
            clientUsername: 'hal_jordan',
            details: {
              name: 'Hal Jordan',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'hal.jordan@example.com',
                phoneNumber: '0789012345'
              },
              address: {
                street: '700 Lantern Lane',
                suburb: 'Emerald City',
                city: 'Coast City',
                postalCode: '10007',
                complex: 'Lantern Complex',
                houseNumber: '70'
              }
            },
            createdAt: '2024-07-02T18:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-16T15:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbc1',
          status: 'In Progress',
          details: {
            heading: 'Roof Repair',
            description: 'Repairing the roof for Hal Jordan',
            priority: 'High',
            address: {
              street: '700 Lantern Lane',
              suburb: 'Emerald City',
              city: 'Coast City',
              postalCode: '10007',
              complex: 'Lantern Complex',
              houseNumber: '70'
            },
            startDate: '2024-07-17T08:00:00.000Z',
            endDate: '2024-07-20T17:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Repair', 'Roof', 'Construction'],
          createdAt: '2024-07-16T15:30:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd8',
          companyId: '668ac08a7010b9a158fcfbb7',
          client: {
            id: '66784ca7722dc76bc8aed8d1',
            clientUsername: 'oliver_queen',
            details: {
              name: 'Oliver Queen',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'oliver.queen@example.com',
                phoneNumber: '0790123456'
              },
              address: {
                street: '800 Arrow Street',
                suburb: 'Downtown',
                city: 'Star City',
                postalCode: '10008',
                complex: 'Arrow Complex',
                houseNumber: '80'
              }
            },
            createdAt: '2024-07-03T19:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-17T16:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbc2',
          status: 'Awaiting review',
          details: {
            heading: 'Fence Installation',
            description: 'Installing a fence for Oliver Queen',
            priority: 'High',
            address: {
              street: '800 Arrow Street',
              suburb: 'Downtown',
              city: 'Star City',
              postalCode: '10008',
              complex: 'Arrow Complex',
              houseNumber: '80'
            },
            startDate: '2024-07-18T09:00:00.000Z',
            endDate: '2024-07-22T17:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Installation', 'Fence', 'Outdoor'],
          createdAt: '2024-07-17T16:30:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbd9',
          companyId: '668ac08a7010b9a158fcfbb8',
          client: {
            id: '66784ca7722dc76bc8aed8d2',
            clientUsername: 'john_constantine',
            details: {
              name: 'John Constantine',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'john.constantine@example.com',
                phoneNumber: '0701234567'
              },
              address: {
                street: '900 Occult Avenue',
                suburb: 'Mystic',
                city: 'London',
                postalCode: '10009',
                complex: 'Occult Complex',
                houseNumber: '90'
              }
            },
            createdAt: '2024-07-04T20:00:00.000Z',
            __v: 0,
            updatedAt: '2024-07-18T17:00:00.000Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbc3',
          status: 'Done',
          details: {
            heading: 'Basement Waterproofing',
            description: 'Waterproofing the basement for John Constantine',
            priority: 'Low',
            address: {
              street: '900 Occult Avenue',
              suburb: 'Mystic',
              city: 'London',
              postalCode: '10009',
              complex: 'Occult Complex',
              houseNumber: '90'
            },
            startDate: '2024-07-19T08:00:00.000Z',
            endDate: '2024-07-22T17:00:00.000Z'
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Waterproofing', 'Basement', 'Construction'],
          createdAt: '2024-07-18T17:30:00.000Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbcd1',
          companyId: '668ac08a7010b9a158fcfbae',
          client: {
            id: '66784ca7722dc76bc8aed8c7',
            clientUsername: 'john_doe',
            details: {
              name: 'John Doe',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'john.doe@example.com',
                phoneNumber: '0723456789'
              },
              address: {
                street: '123 Main Street',
                suburb: 'Central',
                city: 'Johannesburg',
                postalCode: '2000',
                complex: 'Main Complex',
                houseNumber: '12'
              }
            },
            createdAt: '2024-06-23T16:26:15.355Z',
            __v: 0,
            updatedAt: '2024-07-07T22:20:15.449Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbb6',
          status: 'Todo',
          details: {
            heading: 'Kitchen Renovation',
            description: 'Complete kitchen renovation for John Doe',
            priority: 'Low',
            address: {
              street: '123 Main Street',
              suburb: 'Central',
              city: 'Johannesburg',
              postalCode: '2000',
              complex: 'Main Complex',
              houseNumber: '12'
            },
            startDate: `2024-07-13T07:00:00.000Z`,
            endDate: `2024-07-14T16:00:00.000Z`
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Renovation', 'Kitchen', 'Construction'],
          createdAt: '2024-07-07T16:28:36.446Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbcd2',
          companyId: '668ac08a7010b9a158fcfbae',
          client: {
            id: '66784ca7722dc76bc8aed8c8',
            clientUsername: 'jane_doe',
            details: {
              name: 'Jane Doe',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'jane.doe@example.com',
                phoneNumber: '0723456790'
              },
              address: {
                street: '456 Main Street',
                suburb: 'Westside',
                city: 'Cape Town',
                postalCode: '8000',
                complex: 'West Complex',
                houseNumber: '34'
              }
            },
            createdAt: '2024-06-23T16:26:15.355Z',
            __v: 0,
            updatedAt: '2024-07-07T22:20:15.449Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbb6',
          status: 'Todo',
          details: {
            heading: 'Bathroom Renovation',
            description: 'Complete bathroom renovation for Jane Doe',
            priority: 'Medium',
            address: {
              street: '456 Main Street',
              suburb: 'Westside',
              city: 'Cape Town',
              postalCode: '8000',
              complex: 'West Complex',
              houseNumber: '34'
            },
            startDate: `2024-07-13T09:00:00.000Z`,
            endDate: `2024-07-13T18:00:00.000Z`
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Renovation', 'Bathroom', 'Construction'],
          createdAt: '2024-07-07T16:28:36.446Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbcd3',
          companyId: '668ac08a7010b9a158fcfbae',
          client: {
            id: '66784ca7722dc76bc8aed8c9',
            clientUsername: 'alice_smith',
            details: {
              name: 'Alice Smith',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'alice.smith@example.com',
                phoneNumber: '0723456791'
              },
              address: {
                street: '789 Main Street',
                suburb: 'Eastside',
                city: 'Durban',
                postalCode: '4000',
                complex: 'East Complex',
                houseNumber: '56'
              }
            },
            createdAt: '2024-06-23T16:26:15.355Z',
            __v: 0,
            updatedAt: '2024-07-07T22:20:15.449Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbb6',
          status: 'Todo',
          details: {
            heading: 'Living Room Painting',
            description: 'Painting living room for Alice Smith',
            priority: 'High',
            address: {
              street: '789 Main Street',
              suburb: 'Eastside',
              city: 'Durban',
              postalCode: '4000',
              complex: 'East Complex',
              houseNumber: '56'
            },
            startDate: `2024-07-13T10:00:00.000Z`,
            endDate: `2024-07-13T19:00:00.000Z`
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Painting', 'Living Room', 'Construction'],
          createdAt: '2024-07-07T16:28:36.446Z',
          __v: 0
        },
        {
          id: '668ac2347010b9a158fcfbcd4',
          companyId: '668ac08a7010b9a158fcfbae',
          client: {
            id: '66784ca7722dc76bc8aed8d0',
            clientUsername: 'bob_brown',
            details: {
              name: 'Bob Brown',
              preferredLanguage: 'English',
              contactInfo: {
                email: 'bob.brown@example.com',
                phoneNumber: '0723456792'
              },
              address: {
                street: '321 Main Street',
                suburb: 'Northside',
                city: 'Pretoria',
                postalCode: '1000',
                complex: 'North Complex',
                houseNumber: '78'
              }
            },
            createdAt: '2024-06-23T16:26:15.355Z',
            __v: 0,
            updatedAt: '2024-07-07T22:20:15.449Z'
          },
          assignedBy: '668ac08b7010b9a158fcfbb6',
          status: 'Todo',
          details: {
            heading: 'Garden Landscaping',
            description: 'Landscaping garden for Bob Brown',
            priority: 'Low',
            address: {
              street: '321 Main Street',
              suburb: 'Northside',
              city: 'Pretoria',
              postalCode: '1000',
              complex: 'North Complex',
              houseNumber: '78'
            },
            startDate: `2024-07-13T07:00:00.000Z`,
            endDate: `2024-07-13T16:00:00.000Z`
          },
          recordedDetails: {
            imagesTaken: [],
            inventoryUsed: []
          },
          taskList: [],
          comments: [],
          tags: ['Landscaping', 'Garden', 'Construction'],
          createdAt: '2024-07-07T16:28:36.446Z',
          __v: 0
        }
      ],
      events2: [] as Event[],
      config: {
        week: {
          startsOn: 'monday',
          nDays: 7,
          scrollToHour: 8
        },
        style: {
          fontFamily: 'Nunito, sans-serif'
        },
        defaultMode: 'week',
        showCurrentTime: true
        // eventDialog: {
        //   isCustom: true
        // }
      }
    }
  },
  methods: {
    async deleteEvent(payload_event_id: string) {
      console.log(payload_event_id)
      console.log('event deleted')
      // uncomment this when youre ready to run an event delete
      // const apiURL = await this.getRequestUrl()
      // axios
      //   .delete(apiURL + `job/${payload_event_id}`, this.request_config)
      //   .then((res) => {
      //     console.log('event deleted')
      //   })
      //   .catch((res) => {})
    },
    clicked() {
      console.log('event clicked')
    },
    loadJobs() {},
    loadJobsMockData() {
      this.jobs.forEach((job) => {
        const event: Event = {
          title: job.details.heading,
          with: job.client.details.name,
          time: {
            start: this.formatDate(job.details.startDate),
            end: this.formatDate(job.details.endDate)
          },
          color: this.available_event_colors[this.randNum(0, this.available_event_colors.length)],
          location:
            job.details.address.suburb +
            ', ' +
            job.details.address.city +
            ', ' +
            job.details.address.street +
            ', ' +
            job.details.address.postalCode +
            ', ' +
            job.details.address.complex +
            ' ' +
            job.details.address.houseNumber,
          isEditable: true,
          id: job.id,
          description: job.details.description
        }
        this.events2.push(event)
      })
    },
    formatDate2(date: string) {
      const d = new Date(date)
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Johannesburg',
        hour12: false
      }
      const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(d)

      const [day, month, year] = formattedDate.split('/')[0].split('/')
      const time = formattedDate.split(', ')[1]
      const finalFormattedDate = `${year}-${month}-${day} ${time}`
    },
    toLocalISOString(date: Date) {
      const timezoneOffset = date.getTimezoneOffset() * 60000
      const localDate = new Date(date.getTime() - timezoneOffset)
      const localISO = localDate.toISOString().slice(0, -1)
      console.log(localISO)
      return localISO
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
    },
    randNum(min: number, max: number /*excluding*/) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }
  },
  mounted() {
    // this.formatDate(this.toLocalISOString(new Date('2024-07-10T23:00:00.000Z')))
    this.loadJobsMockData()
    this.are_events_loading = false
  }
}
</script>

<style>
@import 'qalendar/dist/style.css';
.calendar-container {
  background-color: transparent;
  color: black;
}
</style>
