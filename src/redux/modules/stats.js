import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_ROOM = 'SELECT_ROOM'
export const INIT_ROOM_STATS = 'INIT_ROOM_STATS'
export const INIT_ROOMS = 'INIT_ROOMS'

export const SELECT_USER = 'SELECT_USER'
export const INIT_USER_STATS = 'INIT_USER_STATS'
export const INIT_USERS = 'INIT_USERS'

export const INIT_URLS = 'INIT_URLS'

export const INIT_IMAGES = 'INIT_IMAGES'

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
    dispatch(fetchUsers())
  }
}
export const selectRoomAndFetch = (room) => {
  return (dispatch) => {
    dispatch(selectRoom(room))
    dispatch(fetchRoomStats(room))
    dispatch(fetchUsers())
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

export const initUrls = createAction(INIT_URLS, (urls) => {
  return {
    urls
  }
})

export const initImages = createAction(INIT_IMAGES, (images) => {
  return {
    images
  }
})

export const selectUser = createAction(SELECT_USER, (name) => {
  return {
    name
  }
})
export const initUserStats = createAction(INIT_USER_STATS, (user, stats) => {
  return {
    user,
    stats
  }
})
export const initUsers = createAction(INIT_USERS, (users) => {
  return {
    users
  }
})
export const selectUserAndFetch = (user) => {
  return (dispatch) => {
    dispatch(selectUser(user))
    dispatch(fetchUserStats(user))
  }
}

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
export const fetchUsers = () => {
  return (dispatch) => {
    fetch(`http://churchybot.herokuapp.com/hubot/stats/user`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(initUsers(json))
        // load stats for each room
        json.forEach((user) => {
          dispatch(fetchUserStats(user))
        })
      })
  }
}
export const fetchUrls = () => {
  return (dispatch) => {
    fetch(`http://churchybot.herokuapp.com/hubot/stats/url`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(initUrls(json))
      })
  }
}
export const fetchImages = () => {
  return (dispatch) => {
    fetch(`http://churchybot.herokuapp.com/hubot/stats/image`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(initImages(json))
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

export const fetchUserStats = (user) => {
  return (dispatch, getState) => {
    const {selectedGranularity, selectedRoom} = getState().stats
    const {granularity, count} = _.find(GRANULARITIES, {id: selectedGranularity})
    const url = `http://churchybot.herokuapp.com/hubot/stats/user/${user}/room/${selectedRoom}` +
                `?granularity=${granularity}&count=${count}`
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(initUserStats(user, json))
      })
  }
}

export const actions = {
  selectGranularity,
  selectGranularityAndFetch,

  selectRoom,
  selectRoomAndFetch,
  initRooms,
  fetchRooms,
  initRoomStats,
  fetchRoomStats,

  selectUser,
  selectUserAndFetch,
  initUsers,
  fetchUsers,
  initUserStats,
  fetchUserStats,

  initUrls,
  fetchUrls,

  initImages,
  fetchImages
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
  },
  [SELECT_USER]: (state, {payload}) => {
    return Object.assign(
      {},
      state,
      {selectedUser: payload.name}
    )
  },
  [INIT_USERS]: (state, { payload }) => {
    const {users} = payload
    return Object.assign(
      {},
      state,
      {userList: users}
    )
  },
  [INIT_USER_STATS]: (state, { payload }) => {
    const {user, stats} = payload
    const newUserState = Object.assign(state.users)
    newUserState[user] = stats
    return Object.assign(
      {},
      state,
      {
        users: newUserState
      }
    )
  },

  [INIT_URLS]: (state, { payload }) => {
    const {urls} = payload
    return Object.assign(
      {},
      state,
      {urls: urls}
    )
  },

  [INIT_IMAGES]: (state, { payload }) => {
    const {images} = payload
    return Object.assign(
      {},
      state,
      {images: images}
    )
  }
}, {
  selectedGranularity: 'today',
  selectedRoom: 'general',
  roomList: [],
  rooms: {},
  userList: [],
  users: {},
  urls: [],
  images: []
})
