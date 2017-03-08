<template>
  <div class="story-board">
    <div class="story-board__header-row">
      <div class="story-board__header-cell" :style="{width: columnWidth}">Story name</div>
      <div class="story-board__header-cell" v-for="status in taskStatusesArray" :style="{width: columnWidth}">{{status.name}}</div>
    </div>

    <story-board-row v-for="story in stories" :key="story.id" :story="story" :task-statuses="taskStatusesArray" />
  </div>
</template>

<script>
import StoryBoardRow from '@/components/StoryBoard/StoryBoardRow'
export default {
  name: 'milestone',
  props: ['stories', 'taskStatuses'],
  components: {
    StoryBoardRow
  },
  computed: {
    taskStatusesArray () {
      return Object.keys(this.taskStatuses).map(k => this.taskStatuses[k]).sort((a, b) => a.order - b.order)
    },
    columnWidth () {
      return `${100 / (Object.keys(this.taskStatuses).length + 1)}%`
    }
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
    },
    daysWithoutUpdateForTaskId (taskId) {
      const task = this.$store.state.tasks[taskId]
      const lastModifiedDate = new Date(task.modified_date)
      const todayDate = new Date()
      const timeDiff = Math.abs(todayDate.getTime() - lastModifiedDate.getTime())
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1
      return diffDays
    },
    classNameForTaskId (taskId) {
      const daysWithoutUpdate = this.daysWithoutUpdateForTaskId(taskId)
      return {
        'story-board__task--no-update-warning': daysWithoutUpdate === 1,
        'story-board__task--no-update-error': daysWithoutUpdate > 1
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .story-board {
    margin-bottom: 20px;
  }

  .story-board__header-row, .story-board__row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .story-board__header-cell, .story-board__column-header-cell, .story-board__cell {
    flex: 0 1 auto;
    align-self: auto;
    box-sizing: border-box;
    border: 1px solid #EEEEEE;
    padding: 20px 10px;
  }
</style>
