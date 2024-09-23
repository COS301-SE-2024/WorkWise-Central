<template>
  <div class="card flex justify-center">
    <!--    <Button type="button" icon="fa: fa-thin fa-square-plus" label="More options" @click="toggle" />-->
    <Popover ref="op">
      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab value="0">{{ options[0].name }}</Tab>
            <Tab value="1">{{ options[1].name }}</Tab>
            <Tab value="2">{{ options[2].name }}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <Card style="width: 100%; overflow: hidden">
                <template #header>
                  <Image
                    :src="chat.image ? chat.image : tempImage"
                    alt="Group logo"
                    width="100%"
                    height="100%"
                  />
                </template>
                <template #title
                  ><h1>{{ chat?.name }}</h1></template
                >
                <template #subtitle>Created by {{}}</template>
                <template #content>
                  <Panel header="Description" toggleable>
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
                    @contextmenu="onRightClick($event, participant)"
                  >
                    <div class="flex flex-1 items-center gap-2">
                      <Avatar
                        :alt="participant?.profile.displayName"
                        :image="
                          participant?.profile?.displayImage
                            ? participant?.profile?.displayImage
                            : 'https://img.icons8.com/?size=100&id=105326&format=png&color=000000'
                        "
                        class="w-8 h-8"
                        size="medium"
                        shape="circle"
                      />
                      {{ participant?.profile.displayName }}
                      <Tag
                        :value="participant?._id === chat?.admin ? 'Admin' : 'Member'"
                        :severity="participant?._id === chat?.admin ? 'info' : null"
                      />
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
                <div class="mb-4">
                  <label for="chatName" class="block text-sm font-medium text-gray-700 mb-1">Chat Name</label>
                  <InputText id="chatName" v-model="editedChat.name" class="w-full" />
                </div>

                <!-- Chat Description -->
                <div class="mb-4">
                  <label for="chatDescription" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea id="chatDescription" v-model="editedChat.description" rows="3" class="w-full" />
                </div>

                <!-- Chat Logo -->
                <div class="mb-4">
                  <label for="chatLogo" class="block text-sm font-medium text-gray-700 mb-1">Chat Logo</label>
                  <FileUpload
                      mode="basic"
                      name="chatLogo[]"
                      url="/api/upload"
                      accept="image/*"
                      :maxFileSize="1000000"
                      @upload="onLogoUpload"
                      :auto="true"
                  />
                </div>

                <!-- Chat Admin -->
                <div class="mb-4">
                  <label for="chatAdmin" class="block text-sm font-medium text-gray-700 mb-1">Chat Admin</label>
                  <Listbox
                      v-model="editedChat.adminId"
                      :options="participants"
                      optionLabel="profile.displayName"
                      optionValue="_id"
                      class="w-full"
                  >
                    <template #option="slotProps">
                      <div class="flex align-items-center">
                        <Avatar :image="slotProps.option.profile.avatar" shape="circle" class="mr-2" />
                        <div>{{ slotProps.option.profile.displayName }}</div>
                      </div>
                    </template>
                  </Listbox>
                </div>

                <!-- Participants Management -->
                <div class="mb-4">
                  <h3 class="text-lg font-semibold mb-2">Manage Participants</h3>
                  <DataTable :value="editedChat.participants" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 20]">
                    <Column field="profile.displayName" header="Name"></Column>
                    <Column header="Role" :body="roleBodyTemplate"></Column>
                    <Column header="Actions" :body="actionBodyTemplate"></Column>
                  </DataTable>
                </div>

                <!-- Save Changes Button -->
                <Button label="Save Changes" icon="pi pi-check" @click="saveChanges" class="p-button-primary" />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div></Popover
    >
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, computed, reactive } from 'vue'
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
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

const toast = useToast()
const selectedUser = ref()
const menu = ref()

const users = ref([
  { id: 0, name: 'Amy Elsner', image: 'amyelsner.png', role: 'Admin' },
  { id: 1, name: 'Anna Fali', image: 'annafali.png', role: 'Member' },
  { id: 2, name: 'Asiya Javayant', image: 'asiyajavayant.png', role: 'Member' },
  { id: 3, name: 'Bernardo Dominic', image: 'bernardodominic.png', role: 'Guest' },
  { id: 4, name: 'Elwin Sharvill', image: 'elwinsharvill.png', role: 'Member' }
])

const props = defineProps(['chat', 'participants'])
//const defaultChatPic = 'https://img.icons8.com/?size=100&id=105326&format=png&color=000000'
const emit = defineEmits(['edit-chat', 'delete-chat'])

const editedChat = reactive({
  name: props.chat.name,
  description: props.chat.description,
  adminId: props.chat.adminId,
  participants: [...props.chat.participants],
})

const formattedParticipants = computed(() =>
    editedChat.participants.map(p => ({
      _id: p._id,
      profile: {
        displayName: p.profile.displayName,
        avatar: p.profile.avatar || 'path/to/default/avatar.png'
      }
    }))
)

const onLogoUpload = (event) => {
  // Handle logo upload
}

const roleBodyTemplate = (rowData) => {
  return rowData._id === editedChat.adminId ? 'Admin' : 'Member'
}

const actionBodyTemplate = (rowData) => {
  return h('div', [
    h(Button, {
      label: rowData._id === editedChat.adminId ? 'Remove Admin' : 'Make Admin',
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
  editedChat.adminId = participant._id === editedChat.adminId ? null : participant._id
}

const removeParticipant = (participant) => {
  const index = editedChat.participants.findIndex(p => p._id === participant._id)
  if (index > -1) {
    editedChat.participants.splice(index, 1)
    if (participant._id === editedChat.adminId) {
      editedChat.adminId = null
    }
  }
}

const saveChanges = () => {
  // Emit updated chat data to parent component
  emit('update-chat', editedChat)
}

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

const op = ref()
const toggle = (event) => {
  op.value.toggle(event)
}

const tempImage = 'http://www.gravatar.com/avatar/?d=mp'
const selectedOption = ref()
const options = ref([
  { name: 'Overview', code: 'NY' },
  { name: 'Members', code: 'RM' },
  { name: 'Settings', code: 'NL' }
])

const deleteChat = () => {
  emit('delete-chat', props.chat)
}

const editChatDetails = () => {
  emit('edot-chat', props.chat)
}

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
