import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_ROOM = 'SELECT_ROOM'
export const INIT_ROOM_STATS = 'INIT_ROOM_STATS'
export const INIT_ROOMS = 'INIT_ROOMS'
export const SELECT_GRANULARITY = 'SELECT_GRANULARITY'
export const GRANULARITIES = [
  {
    id: 'today',
    name: 'Today',
    granularity: '1hour',
    count: 24
  },
  {
    id: 'last7days',
    name: 'Last 7 Days',
    granularity: '1day',
    count: 7
  },
  {
    id: 'last30days',
    name: 'Last 30 Days',
    granularity: '1day',
    count: 30
  }
]

// ------------------------------------
// Actions
// ------------------------------------
export const selectRoom = createAction(SELECT_ROOM, (name) => {
  return {
    name
  }
})
export const selectGranularity = createAction(SELECT_GRANULARITY, (id) => {
  return {
    id
  }
})
export const selectGranularityAndFetch = (id) => {
  return (dispatch, getState) => {
    const {stats} = getState()
    dispatch(selectGranularity(id))
    dispatch(fetchRoomStats(stats.selectedRoom))
  }
}
export const selectRoomAndFetch = (room) => {
  return (dispatch) => {
    dispatch(selectRoom(room))
    dispatch(fetchRoomStats(room))
  }
}
export const initRoomStats = createAction(INIT_ROOM_STATS, (room, stats) => {
  return {
    room,
    stats
  }
})
export const initRooms = createAction(INIT_ROOMS, (rooms) => {
  return {
    rooms
  }
})

export const fetchRooms = () => {
  return (dispatch) => {
    fetch(`http://churchybot.herokuapp.com/hubot/stats/room`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(initRooms(json))
        // load stats for each room
        json.forEach((room) => {
          dispatch(fetchRoomStats(room))
        })
      })
  }
}

export const fetchRoomStats = (room) => {
  return (dispatch, getState) => {
    const {selectedGranularity} = getState().stats
    const {granularity, count} = _.find(GRANULARITIES, {id: selectedGranularity})
    const url = `http://churchybot.herokuapp.com/hubot/stats/room/${room}` +
                `?granularity=${granularity}&count=${count}`
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(initRoomStats(room, json))
      })
  }
}

export const actions = {
  selectRoom,
  selectRoomAndFetch,
  selectGranularity,
  selectGranularityAndFetch,
  initRooms,
  fetchRooms,
  initRoomStats,
  fetchRoomStats
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SELECT_ROOM]: (state, {payload}) => {
    return Object.assign(
      {},
      state,
      {selectedRoom: payload.name}
    )
  },
  [SELECT_GRANULARITY]: (state, {payload}) => {
    return Object.assign(
      {},
      state,
      {selectedGranularity: payload.id}
    )
  },
  [INIT_ROOMS]: (state, { payload }) => {
    const {rooms} = payload
    return Object.assign(
      {},
      state,
      {roomList: rooms}
    )
  },
  [INIT_ROOM_STATS]: (state, { payload }) => {
    const {room, stats} = payload
    const newRoomState = Object.assign(state.rooms)
    newRoomState[room] = stats
    return Object.assign(
      {},
      state,
      {
        rooms: newRoomState
      }
    )
  }},
  {
    selectedGranularity: 'today',
    selectedRoom: 'general',
    roomList: [],
    rooms: {}
  }
)
