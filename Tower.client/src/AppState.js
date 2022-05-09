import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  towerEvents: [],
  activeTowerEvent: null,
  userTickets: [],
  activeTickets: null,
  comments: null,
  capacity: 0
})
