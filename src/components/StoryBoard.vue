<template>
  <div>
    <table border="1">
      <tr>
        <th>Story name</th>
        <th v-for="(status, statusId) in taskStatuses">{{status.name}}</th>
      </tr>
      <tr v-for="story in stories">
        <td>{{ story.subject }}</td>
        <td v-for="(status, statusId) in taskStatuses">
          <div v-for="(task, taskId) in tasksForStatus(story.id, statusId)">{{task.subject}}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'milestone',
  props: ['stories', 'taskStatuses'],
  computed: {
  },
  methods: {
    tasksForStatus (storyId, statusId) {
      const tasks = Object.keys(this.$store.state.tasks).reduce((agg, taskId) => {
        const task = this.$store.state.tasks[taskId]
        if (+task.user_story === +storyId && +task.status === +statusId) {
          agg[task.id] = task
        }
        return agg
      }, {})
      return tasks
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
