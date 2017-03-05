<template>
  <div>
    <h1>{{milestone.name}}</h1>
    <h2>Open stories</h2>
    <story-board :stories="openStories" :task-statuses="taskStatuses" />
    <h2>Closed stories</h2>
    <story-board :stories="closedStories" :task-statuses="taskStatuses" />
  </div>
</template>

<script>
import StoryBoard from '@/components/StoryBoard'
export default {
  name: 'milestone',
  props: ['projectId', 'milestoneId'],
  components: {
    StoryBoard
  },
  computed: {
    milestone () {
      return this.$store.state.milestones[this.milestoneId]
    },
    openStories () {
      return this.milestone.user_stories.filter((story) => {
        return !story.is_closed
      })
    },
    closedStories () {
      return this.milestone.user_stories.filter((story) => {
        return story.is_closed
      })
    },
    taskStatuses () {
      const statuses = Object.keys(this.$store.state.taskStatuses).reduce((agg, statusId) => {
        const status = this.$store.state.taskStatuses[statusId]
        if (+status.project === +this.projectId) {
          agg[statusId] = status
        }
        return agg
      }, {})
      return statuses
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
