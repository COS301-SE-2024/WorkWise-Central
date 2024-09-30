<template>
  <div class="card flex justify-center">
    <!--    <Button type="button" icon="fa: fa-thin fa-square-plus" label="More options" @click="toggle" />-->
    <Popover
      ref="op"
      :style="{
        backgroundColor: 'var(--card-color)',
        maxWidth: '800px',
        maxHeight: '800px',
        overflowY: 'auto'
      }"
    >
      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab value="0">{{ options[0].name }}</Tab>
            <Tab value="1">{{ options[1].name }}</Tab>
            <Tab v-if="isAdmin === true" value="2">{{ options[2].name }}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <Card
                :style="{ width: '100%', overflow: 'hidden', backgroundColor: 'var(--card-color)' }"
              >
                <template #header>
                  <Image
                    :src="chat.image ? chat.image : tempImage"
                    alt="Group logo"
                    width="100%"
                    height="100%"
                  />
                </template>
                <template #title
                  ><h1 :style="{ color: 'var(--heading-text-color)' }">
                    {{ chat?.name }}
                  </h1></template
                >
                <template #content>
                  <Panel
                    header="Description"
                    toggleable
                    :style="{ color: 'var(--element-text-color)' }"
                  >
                    <p class="m-0">
                      {{ chat?.description ? chat?.description : 'None' }}
                    </p>
                  </Panel>
                </template>
                <template #footer>
                  <div class="flex gap-4 mt-1">
                    Created on
                    {{
                      new Date(chat?.createdAt).toLocaleDateString('en-UK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    }}
                  </div>
                </template>
              </Card>
            </TabPanel>

            <TabPanel value="1">
              <div class="card flex sm:justify-center">
                <ul
                  class="m-0 list-none border border-surface rounded p-4 flex flex-col gap-2 w-full sm:w-96"
                >
                  <li
                    v-for="participant in participants"
                    :key="participant._id"
                    :class="[
                      'p-2 hover:bg-emphasis rounded border border-transparent transition-all duration-200 flex items-center justify-content-between',
                      { 'border-primary': selectedUser?._id === participant._id }
                    ]"
                  >
                    <div class="flex flex-1 items-center gap-2" style="margin-left: 5%">
                      <Avatar
                        :alt="participant?.profile.displayName"
                        :image="
                          participant?.profile?.displayImage
                            ? participant?.profile?.displayImage
                            : 'https://img.icons8.com/?size=100&id=14599&format=png&color=000000'
                        "
                        class="w-10 h-10"
                        size="large"
                        shape="circle"
                        :style="{ backgroundColor: 'var(--kanban-icon-color)' }"
                      />
                      {{ participant?.profile.displayName }}

                      <div style="display: flex; flex-direction: row; justify-content: flex-end">
                        <Tag
                          :value="participant?._id === chat?.admin ? 'Admin' : 'Member'"
                          :severity="participant?._id === chat?.admin ? 'info' : null"
                          :style="{
                            backgroundColor:
                              participant?._id === chat?.admin
                                ? 'var(--primary-color)'
                                : 'var(--secondary-color)'
                          }"
                          style="font-size: large"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
                <ContextMenu ref="menu" :model="items" @hide="selectedUser = null" />
                <Toast />
              </div>
            </TabPanel>

            <TabPanel value="2">
              <div class="p-4">
                <h2 class="text-xl font-bold mb-4">Chat Settings</h2>

                <!-- Chat Name -->
                <v-row>
                  <v-col>
                    <label for="chatName" class="block text-sm font-medium text-gray-700 mb-1"
                      >Chat Name</label
                    >
                  </v-col>
                  <v-col>
                    <InputText id="chatName" v-model="editedChat.name" class="w-full" />
                  </v-col>
                </v-row>

                <!-- Chat Description -->
                <v-row>
                  <v-col>
                    <label
                      for="chatDescription"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Description</label
                    >
                  </v-col>
                  <v-col>
                    <Textarea
                      id="chatDescription"
                      v-model="editedChat.description"
                      rows="3"
                      class="w-full"
                    />
                  </v-col>
                </v-row>

                <!-- Chat Logo -->
                <v-row>
                  <v-col cols="12">
                    <label for="chatLogo" class="block text-sm font-medium text-gray-700 mb-1"
                      >Chat Logo</label
                    >
                  </v-col>
                  <v-col>
                    <FileUpload
                      mode="basic"
                      accept="image/*"
                      :maxFileSize="10000000"
                      @select="handleFileChange"
                      :auto="true"
                      :customUpload="true"
                    />
                  </v-col>
                </v-row>

                <!-- Chat Admin -->
                <v-row>
                  <v-col>
                    <label for="chatAdmin" class="block text-sm font-medium text-gray-700 mb-1"
                      >Chat Admin</label
                    >
                  </v-col>
                  <v-col cols="12">
                    <Listbox
                      v-model="editedChat.admin"
                      :options="participants"
                      optionLabel="profile.displayName"
                      optionValue="_id"
                      class="w-full"
                    >
                      <template #option="slotProps">
                        <div class="flex align-items-center">
                          <Avatar
                            :image="slotProps.option.profile.displayImage"
                            shape="circle"
                            class="mr-2"
                          />
                          <div>{{ slotProps.option.profile.displayName }}</div>
                        </div>
                      </template>
                    </Listbox>
                  </v-col>
                </v-row>

                <!-- Participants Management -->
                <!--                <v-row>-->
                <!--                  <v-col>-->
                <!--                    <label for="participants" class="block text-sm font-medium text-gray-700 mb-1">-->
                <!--                      Participants-->
                <!--                    </label>-->
                <!--                  </v-col>-->
                <!--                  <v-col cols="12">-->
                <!--                    <MultiSelect-->
                <!--                      v-model="selectedParticipants"-->
                <!--                      :options="chat.participants"-->
                <!--                      optionLabel="profile.displayName"-->
                <!--                      placeholder="Select participants"-->
                <!--                      :filter="true"-->
                <!--                      class="w-full mb-3"-->
                <!--                      style="max-width: 80%; overflow: scroll"-->
                <!--                    >-->
                <!--                      <template #option="slotProps">-->
                <!--                        <div class="flex align-items-center">-->
                <!--                          <Avatar-->
                <!--                            :image="slotProps.option.profile.displayImage"-->
                <!--                            shape="circle"-->
                <!--                            class="mr-2"-->
                <!--                          />-->
                <!--                          <div>{{ slotProps.option.profile.displayName }}</div>-->
                <!--                        </div>-->
                <!--                      </template>-->
                <!--                    </MultiSelect>-->

                <!--                    <DataTable :value="editedChat.participants" class="p-datatable-sm">-->
                <!--                      <Column field="profile.displayName" header="Name">-->
                <!--                        <template #body="slotProps">-->
                <!--                          <div class="flex align-items-center">-->
                <!--                            <Avatar-->
                <!--                              :image="slotProps.data.profile.displayImage"-->
                <!--                              shape="circle"-->
                <!--                              class="mr-2"-->
                <!--                            />-->
                <!--                            <span>{{ slotProps.data.profile.displayName }}</span>-->
                <!--                          </div>-->
                <!--                        </template>-->
                <!--                      </Column>-->
                <!--                      <Column header="Actions" style="width: 100px">-->
                <!--                        <template #body="slotProps">-->
                <!--                          <Button-->
                <!--                            icon="pi pi-trash"-->
                <!--                            class="p-button-rounded p-button-danger p-button-text"-->
                <!--                            @click="removeParticipant(slotProps.data)"-->
                <!--                          />-->
                <!--                        </template>-->
                <!--                      </Column>-->
                <!--                    </DataTable>-->
                <!--                  </v-col>-->
                <!--                </v-row>-->

                <!--                &lt;!&ndash; Participants Management &ndash;&gt;
                <v-row>
                  <v-col>
                    <h3 class="text-lg font-semibold mb-2">Manage Participants</h3>
                  </v-col>
                  <v-col cols="12">
                    <DataTable
                      :value="editedChat.participants"
                      :paginator="true"
                      :rows="5"
                      :rowsPerPageOptions="[5, 10, 20]"
                    :style="{ backgroundColor: 'var(--card-color)' }">
                      <Column field="profile.displayName" header="Name" :headerStyle="{ color: 'var(--heading-text-color)' }"></Column>
                      <Column header="Role" :body="roleBodyTemplate"></Column>
                      <Column header="Actions" :body="actionBodyTemplate"></Column>
                    </DataTable>
                  </v-col>
                </v-row>-->
                <v-row class="justify-center">
                  <Button
                    label="Delete Chat"
                    icon="fa fa-solid fa-warning"
                    @click="deleteChat"
                    style="background-color: #bd0707; margin-right: 10%; color: white"
                  />
                  <Button
                    label="Save Changes"
                    icon="pi pi-check"
                    @click="saveChanges"
                    class="p-button-primary"
                  />
                </v-row>
                <!-- Save Changes Button -->
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div></Popover
    >
  </div>
</template>

<script setup>
import { defineEmits, defineProps, h, onMounted, reactive, ref } from 'vue'
import Popover from 'primevue/popover'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Image from 'primevue/image'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import ContextMenu from 'primevue/contextmenu'
import { useToast } from 'primevue/usetoast'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Listbox from 'primevue/listbox'
import Button from 'primevue/button'
import { API_URL } from '@/main'
import axios from 'axios'
import MultiSelect from 'primevue/multiselect'
const toast = useToast()
const selectedUser = ref()
const menu = ref()

const props = defineProps(['chat', 'participants'])
//const defaultChatPic = 'https://img.icons8.com/?size=100&id=105326&format=png&color=000000'
const emit = defineEmits(['update-chat-popover', 'delete-chat-popover'])

let editedChat = reactive({
  _id: props.chat._id,
  name: props.chat.name,
  description: props.chat.description,
  admin: props.chat.admin,
  participants: [...props.chat.participants],
  image: props.chat.image
})

/*const formattedParticipants = computed(() =>
    editedChat.participants.map(p => ({
      _id: p._id,
      profile: {
        displayName: p.profile.displayName,
        avatar: p.profile.avatar || 'path/to/default/avatar.png'
      }
    }))
)*/

const handleFileChange = async (event) => {
  const files = event.files
  if (files && files.length > 0) {
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }

    const url = `${API_URL}chat/add/attachments`

    try {
      const response = await axios.put(url, formData, config)
      if (response.status === 200) {
        console.log(response)
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Files uploaded successfully',
          life: 3000
        })
        console.log(response)
        editedChat.image = response.data.data[0]

        //return response.data.data
      }
    } catch (error) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to upload File(s)',
        life: 3000
      })
      console.log(url)
    }
  }
}

const roleBodyTemplate = (rowData) => {
  return rowData._id === editedChat.admin ? 'Admin' : 'Member'
}

const actionBodyTemplate = (rowData) => {
  return h('div', [
    h(Button, {
      label: rowData._id === editedChat.admin ? 'Remove Admin' : 'Make Admin',
      class: 'p-button-text',
      onClick: () => toggleAdmin(rowData)
    }),
    h(Button, {
      label: 'Remove',
      class: 'p-button-text p-button-danger',
      onClick: () => removeParticipant(rowData)
    })
  ])
}

const toggleAdmin = (participant) => {
  editedChat.admin = participant._id === editedChat.admin ? null : participant._id
}

const removeParticipant = (participant) => {
  const index = editedChat.participants.findIndex((p) => p._id === participant._id)
  if (index > -1) {
    editedChat.participants.splice(index, 1)
    if (participant._id === editedChat.admin) {
      editedChat.admin = null
    }
  }
}

const saveChanges = () => {
  // Emit updated chat data to parent component
  emit('update-chat-popover', editedChat)
  console.log('delete-chat-popover', editedChat)
}

const deleteChat = () => {
  emit('delete-chat-popover', editedChat)
  console.log('Delete-chat', editedChat)
}

const selectedParticipants = ref([])
const availableParticipants = ref([])

onMounted(async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const currentCompanyId = localStorage.getItem('currentCompany')
  const temp = await axios.get(`${API_URL}users/all/company/${currentCompanyId}`, config)
  availableParticipants.value = props.participants.filter((p) => p._id !== editedChat.admin)
  //availableParticipants.value.push(temp.data.data)
})

const items = ref([
  {
    label: 'Roles',
    icon: 'pi pi-users',
    items: [
      {
        label: 'Admin',
        command: () => {
          selectedUser.value.role = 'Admin'
        }
      },
      {
        label: 'Member',
        command: () => {
          selectedUser.value.role = 'Member'
        }
      },
      {
        label: 'Guest',
        command: () => {
          selectedUser.value.role = 'Guest'
        }
      }
    ]
  },
  {
    label: 'Invite',
    icon: 'pi pi-user-plus',
    command: () => {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Invitation sent!', life: 3000 })
    }
  }
])

const onRightClick = (event, user) => {
  selectedUser.value = user
  menu.value.show(event)
}

const getBadge = (user) => {
  if (user.role === 'Member') return 'info'
  else if (user.role === 'Guest') return 'warn'
  else return null
}

let isAdmin = false
const op = ref()
const toggle = (event) => {
  isAdmin = localStorage.getItem('id') === props.chat.admin
  editedChat = props.chat
  op.value.toggle(event)
}

const tempImage = 'http://www.gravatar.com/avatar/?d=mp'
// const selectedOption = ref()
const options = ref([
  { name: 'Overview', code: 'NY' },
  { name: 'Members', code: 'RM' },
  { name: 'Settings', code: 'NL' }
])

defineExpose({
  toggle
})
</script>

<style>
.round {
  border-radius: 50%;
}
.same-size {
  height: 100px;
  width: 100px;
}
</style>
