<template>
  <div id="kanban_container">
    <ejs-kanban
      id="kanban"
      :dataSource="data"
      keyField="Status"
      :cardSettings="cardSettings"
      @actionComplete="changer"
    >
      <e-columns>
        <e-column keyField="No Status" headerText="No Status"></e-column>
        <e-column keyField="To Do" headerText="To Do" :minCount="1" :maxCount="2"></e-column>
        <e-column keyField="In Progress" headerText="In Progress"></e-column>
        <e-column keyField="Done" headerText="Done"></e-column>
        <e-column keyField="Stuck" headerText="Stuck"></e-column>
      </e-columns>
      <template #cardTemplate="{ data }">
        <div class="e-card-content">
          <table class="card-template-wrap">
            <tbody>
              <th class="CardHeaderContainer">
                <td class="CardHeader">
                  {{data.Title}}<span> #</span>{{data.Id}}
                </td>
              </th>
              <tr>
                <td class = "priority">
                  <span class="bolded">Priority: </span>{{ data.Priority }}
                </td>
              </tr>
              <tr>
                <td class = "client">
                  <span class="bolded">Client: </span>{{ data.Client }}
                </td>
              </tr>
              <tr>
                <td ><span class="bolded">Date: </span>{{ data.Date }}</td>
              </tr>
<!--              <tr>-->
<!--                <td ><span class="bolded">Tags: </span>{{ data.Tags }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td ><span class="bolded">Address: </span>{{ data.Address }}</td>-->
<!--              </tr>-->
            </tbody>
          </table>
        </div>
      </template>
    </ejs-kanban>
  </div>
</template>
c
<script lang="ts">
import { KanbanComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-vue-kanban'

export default {
  name: 'EmplyeeJobView-Component',
  components: {
    'ejs-kanban': KanbanComponent,
    'e-column': ColumnDirective,
    'e-columns': ColumnsDirective
  },
  data() {
    return {
      data: [
        {
          "Id": 123456,
          "Title": "Kitchen Appliance Installation",
          "Status": "No Status",
          "Client": "Alice Johnson",
          "Description": "Install new kitchen appliances",
          "Notes": "Client prefers morning appointment",
          "Date": "2024-06-15",
          "Address": "5678 Oak St",
          "Assignee": "",
          "Priority": "Medium",
          "Tags": ["Installation", "Appliances", "Kitchen"]
        },
        {
          "Id": 234567,
          "Title": "Annual HVAC Maintenance",
          "Status": "To Do",
          "Client": "Bob Brown",
          "Description": "Done annual HVAC maintenance",
          "Notes": "Check filter and thermostat settings",
          "Date": "2024-06-17",
          "Address": "91011 Pine St",
          "Assignee": "Mike Johnson",
          "Priority": "High",
          "Tags": ["HVAC", "Maintenance", "Annual"]
        },
        {
          "Id": 345678,
          "Title": "Bathroom Faucet Repair",
          "Status": "In Progress",
          "Client": "Cathy Green",
          "Description": "Repair leaking bathroom faucet",
          "Notes": "Client reported issue last week",
          "Date": "2024-06-14",
          "Address": "1213 Maple St",
          "Assignee": "Sam Williams",
          "Priority": "High",
          "Tags": ["Repair", "Plumbing", "Bathroom"]
        },
        {
          "Id": 456789,
          "Title": "Exterior House Painting",
          "Status": "Stuck",
          "Client": "David Lee",
          "Description": "Paint exterior of house",
          "Notes": "Waiting for client to choose paint color",
          "Date": "2024-06-20",
          "Address": "1415 Birch St",
          "Assignee": "Emma Davis",
          "Priority": "Low",
          "Tags": ["Painting", "Exterior", "House"]
        },
        {
          "Id": 567890,
          "Title": "Home Security System Installation",
          "Status": "Done",
          "Client": "Eva Martinez",
          "Description": "Install home security system",
          "Notes": "System installed, tested, and verified",
          "Date": "2024-06-10",
          "Address": "1617 Cedar St",
          "Assignee": "Chris Brown",
          "Priority": "High",
          "Tags": ["Security", "Installation", "Home"]
        },
        {
          "Id": 678901,
          "Title": "Front Yard Landscaping",
          "Status": "In Progress",
          "Client": "Frank White",
          "Description": "Landscape front yard",
          "Notes": "Awaiting client's approval of design",
          "Date": "2024-06-12",
          "Address": "1819 Spruce St",
          "Assignee": "Nancy Wilson",
          "Priority": "Medium",
          "Tags": ["Landscaping", "Design", "Front Yard"]
        },
        {
          "Id": 789012,
          "Title": "Garage Cleaning and Organization",
          "Status": "No Status",
          "Client": "Grace King",
          "Description": "Clean and organize garage",
          "Notes": "Client cancelled due to rescheduling",
          "Date": "2024-06-11",
          "Address": "2021 Elm St",
          "Assignee": "Jamie Carragaher",
          "Priority": "Low",
          "Tags": ["Cleaning", "Organization", "Garage"]
        },
        {
          "Id": 890123,
          "Title": "Window Repair",
          "Status": "Done",
          "Client": "Henry Hall",
          "Description": "Fix broken window",
          "Notes": "Unable to access the window area",
          "Date": "2024-06-13",
          "Address": "2223 Fir St",
          "Assignee": "Alice Brown",
          "Priority": "High",
          "Tags": ["Repair", "Window", "Emergency"]
        },
        {
          "Id": 901234,
          "Title": "Office Building Deep Cleaning",
          "Status": "To Do",
          "Client": "Isla Moore",
          "Description": "Deep clean office building",
          "Notes": "Focus on high-traffic areas",
          "Date": "2024-06-18",
          "Address": "3456 Ash St",
          "Assignee": "David Johnson",
          "Priority": "Medium",
          "Tags": ["Cleaning", "Office", "Deep Clean"]
        },
        {
          "Id": 123789,
          "Title": "Garden Lights Installation",
          "Status": "Stuck",
          "Client": "Jack Taylor",
          "Description": "Install new garden lights",
          "Notes": "Waiting for delivery of lights",
          "Date": "2024-06-21",
          "Address": "4567 Willow St",
          "Assignee": "Sarah Brown",
          "Priority": "Low",
          "Tags": ["Installation", "Lighting", "Garden"]
        },
        {
          "Id": 234890,
          "Title": "Garage Door Opener Repair",
          "Status": "In Progress",
          "Client": "Karen Clark",
          "Description": "Fix garage door opener",
          "Notes": "Parts ordered, awaiting delivery",
          "Date": "2024-06-19",
          "Address": "6789 Elm St",
          "Assignee": "Paul Anderson",
          "Priority": "High",
          "Tags": ["Repair", "Garage", "Door Opener"]
        },
        {
          "Id": 345901,
          "Title": "Bathroom Tile Replacement",
          "Status": "To Do",
          "Client": "Liam Davis",
          "Description": "Replace broken tiles in bathroom",
          "Notes": "Client chose new tile design",
          "Date": "2024-06-22",
          "Address": "7890 Maple St",
          "Assignee": "Steve Wilson",
          "Priority": "Medium",
          "Tags": ["Repair", "Tiles", "Bathroom"]
        },
        {
          "Id": 456012,
          "Title": "Ceiling Fan Installation",
          "Status": "Done",
          "Client": "Mia Garcia",
          "Description": "Install ceiling fans",
          "Notes": "Fans installed and tested",
          "Date": "2024-06-09",
          "Address": "8901 Oak St",
          "Assignee": "Rick Harris",
          "Priority": "High",
          "Tags": ["Installation", "Ceiling Fans", "Electrical"]
        },
        {
          "Id": 567123,
          "Title": "Roof Leak Repair",
          "Status": "No Status",
          "Client": "Noah Martinez",
          "Description": "Repair roof leak",
          "Notes": "Client reported issue after storm",
          "Date": "2024-06-14",
          "Address": "1234 Pine St",
          "Assignee": "",
          "Priority": "High",
          "Tags": ["Repair", "Roof", "Leak"]
        },
        {
          "Id": 678234,
          "Title": "Pool Pump Service",
          "Status": "In Progress",
          "Client": "Olivia Lee",
          "Description": "Service pool pump",
          "Notes": "Pump making unusual noise",
          "Date": "2024-06-16",
          "Address": "2345 Birch St",
          "Assignee": "Tom Collins",
          "Priority": "Medium",
          "Tags": ["Maintenance", "Pool", "Pump"]
        },
        {
          "Id": 789345,
          "Title": "Fence Installation",
          "Status": "To Do",
          "Client": "Patrick Adams",
          "Description": "Install new fence",
          "Notes": "Client chose cedar wood",
          "Date": "2024-06-23",
          "Address": "3456 Cedar St",
          "Assignee": "Emma Thompson",
          "Priority": "Medium",
          "Tags": ["Installation", "Fence", "Wood"]
        }
      ],
      cardSettings: {
        contentField: 'Description',
        headerField: 'Id',
        tagsField: 'Tags',
        template: 'cardTemplate'
      },
      swimLaneSettings: {
        keyField: 'Assignee'
      }
    }
  },
  methods: {
    changer() {
      console.log('There was a change')
    }
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
  font-size: 13pt;
  color: grey;
}
.e-card-content
{

}
.card-template-wrap{
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: -10px 10px 10px 0 rgba(0,0,0,0.10);
}
.e-kanban .card-template-wrap td {
  background: none;
}
.bolded {
  font-weight: bold;
}
.priority
{
  font-weight: bold;
}



</style>
