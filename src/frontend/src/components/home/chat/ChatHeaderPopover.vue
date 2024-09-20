<template>
  <div class="card flex justify-center">
    <!--    <Button type="button" icon="fa: fa-thin fa-square-plus" label="More options" @click="toggle" />-->
    <Popover ref="op">
      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab value="0">{{ options[0].name }}</Tab>
            <Tab value="1">{{ options[1].name }}</Tab>
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

            <!--            <TabPanel value="2">-->
            <!--              <p class="m-0"></p>-->
            <!--            </TabPanel>-->
          </TabPanels>
        </Tabs>
      </div></Popover
    >
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'
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
const props = defineProps(['chat', 'participants'])
//const defaultChatPic = 'https://img.icons8.com/?size=100&id=105326&format=png&color=000000'
const emit = defineEmits(['edit-chat', 'delete-chat'])

const tempImage = 'https://picsum.photos/200/300'
const selectedOption = ref()
const options = ref([
  { name: 'Overview', code: 'NY' },
  { name: 'Members', code: 'RM' }
  // { name: 'London', code: 'LDN' }
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
