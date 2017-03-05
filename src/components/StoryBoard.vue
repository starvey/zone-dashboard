<template>
  <div class="story-board">
    <div class="story-board__header-row">
      <div class="story-board__header-cell" :style="{width: columnWidth}">Story name</div>
      <div class="story-board__header-cell" v-for="(status, statusId) in taskStatuses" :style="{width: columnWidth}">{{status.name}}</div>
    </div>

    <div class="story-board__row" v-for="story in stories">
      <div class="story-board__column-header-cell" :style="{width: columnWidth}">{{ story.subject }}</div>
      <div class="story-board__cell" v-for="(status, statusId) in taskStatuses" :style="{width: columnWidth}">
        <div v-for="(task, taskId) in tasksForStatus(story.id, statusId)" class="story-board__task">{{task.subject}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'milestone',
  props: ['stories', 'taskStatuses'],
  computed: {
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
  
  .story-board__task {
    background: #EEEEEE;
    padding: 5px;
    border-radius: 5px;
    border-bottom: 1px solid #BBBBBB;
    border-right: 1px solid #BBBBBB;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
</style>
