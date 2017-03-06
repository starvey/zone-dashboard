<template>
  <div class="story-board__row">
    <div class="story-board__column-header-cell" :style="{width: columnWidth}">{{ story.subject }}</div>
    <story-board-cell v-for="(status, statusId) in taskStatuses" :key="statusId" :style="{width: columnWidth}" :tasks="tasksForStatus(story.id, statusId)" :status-id="statusId" />
  </div>
</template>

<script>
import StoryBoardCell from '@/components/StoryBoard/StoryBoardCell'
export default {
  name: 'milestone',
  props: ['story', 'taskStatuses'],
  components: {
    StoryBoardCell
  },
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
  .story-board__task {
    background: #EEEEEE;
    padding: 5px;
    border-radius: 5px;
    border-bottom: 1px solid #BBBBBB;
    border-right: 1px solid #BBBBBB;
    position: relative;
    &:not(:last-child) {
      margin-bottom: 15px;
    }

    &.story-board__task--no-update-warning, &.story-board__task--no-update-error {
      &::before {
        content: attr(data-days-without-update);
        display: block;
        position: absolute;
        height: 20px;
        min-width: 20px;
        line-height: 20px;
        border-radius: 10px;
        right: -10px;
        top: -10px;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        padding: 0 5px;
      }
    }
    &.story-board__task--no-update-warning::before {
      background: orange;
    }
    &.story-board__task--no-update-error::before {
      background: red;
      color: white;
    }
  }
</style>
