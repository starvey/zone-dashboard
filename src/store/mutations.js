const API_URL = 'https://api.taiga.io/api/v1'

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setProjects (state, projects) {
    state.projects = projects.reduce((agg, current) => {
      agg[current.id] = current
      return agg
    }, {...state.projects})
  },
  setMilestones (state, milestones) {
    state.milestones = milestones.reduce((agg, current) => {
      agg[current.id] = current
      return agg
    }, {...state.milestones})
  },
  setStoryStatuses (state, statuses) {
    state.storyStatuses = statuses.reduce((agg, status) => {
      agg[status.id] = status
      return agg
    }, {...state.storyStatuses})
  },
  setTaskStatuses (state, statuses) {
    state.taskStatuses = statuses.reduce((agg, status) => {
      agg[status.id] = status
      return agg
    }, {...state.taskStatuses})
  }
}

export const actions = {
  getData ({dispatch}) {
    return dispatch('getProjects')
        .then(() => {
          return dispatch('getOpenMilestones')
        })
        .then(() => {
          return dispatch('getStoryStatuses')
        })
        .then(() => {
          return dispatch('getTaskStatuses')
        })
  },

  getProjects ({commit, state}) {
    return fetch(`${API_URL}/projects?member=${state.user.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.user.auth_token}`
      }
    }).then((response) => {
      if (response.status >= 400) {
        return Promise.reject(response)
      }
      return response.json()
    }).then((json) => {
      commit('setProjects', json)
    })
  },

  getOpenMilestones ({commit, state}) {
    const promises = Object.keys(state.projects).map((projectId) => {
      return fetch(`${API_URL}/milestones?project=${projectId}&closed=false`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.user.auth_token}`
        }
      }).then((response) => {
        if (response.status >= 400) {
          return Promise.reject(response)
        }
        return response.json()
      }).then((json) => {
        commit('setMilestones', json)
      })
    })
    return Promise.all(promises)
  },

  getStoryStatuses ({commit, state}) {
    const promises = Object.keys(state.projects).map((projectId) => {
      return fetch(`${API_URL}/userstory-statuses?project=${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.user.auth_token}`
        }
      }).then((response) => {
        if (response.status >= 400) {
          return Promise.reject(response)
        }
        return response.json()
      }).then((json) => {
        commit('setStoryStatuses', json)
      })
    })
    return Promise.all(promises)
  },

  getTaskStatuses ({commit, state}) {
    const promises = Object.keys(state.projects).map((projectId) => {
      return fetch(`${API_URL}/task-statuses?project=${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.user.auth_token}`
        }
      }).then((response) => {
        if (response.status >= 400) {
          return Promise.reject(response)
        }
        return response.json()
      }).then((json) => {
        commit('setTaskStatuses', json)
      })
    })
    return Promise.all(promises)
  },

  login ({commit, dispatch}, {username, password}) {
    return fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        type: 'normal'
      })
    })
    .then((response) => {
      if (response.status >= 400) {
        return Promise.reject(response)
      }
      return response.json()
    })
    .then((json) => {
      commit('setUser', json)
    })
    .then(() => {
      return dispatch('getData')
    })
  }
}

export const state = {
  user: null,
  projects: {},
  milestones: {},
  storyStatuses: {},
  taskStatuses: {}
}
