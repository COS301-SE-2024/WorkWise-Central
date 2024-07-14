export type EventTime = {
  start: string
  end: string
}

export type Event = {
  title: string
  with: string
  time: EventTime
  color: string
  isEditable: boolean
  location: string
  id: string
  description: string
}
