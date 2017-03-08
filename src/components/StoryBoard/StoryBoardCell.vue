<template>
  <div class="story-board__cell" v-on:dragover.prevent v-on:drop="onDragDrop(statusId, $event)">
    <story-board-task v-for="(task, taskId) in tasks" :key="taskId" :task="task" />
  </div>
</template>

<script>
import StoryBoardTask from '@/components/StoryBoard/StoryBoardTask'
export default {
  name: 'story-board-cell',
  props: ['tasks', 'statusId'],
  components: {
    StoryBoardTask
  },
  methods: {
    onDragDrop (statusId, event) {
      const taskId = event.dataTransfer.getData('text/plain')
      const originalTask = this.$store.state.tasks[taskId]
      const newTask = {
        ...originalTask,
        status: statusId
      }
      this.$store.commit('setTasks', [newTask])
      this.$store.dispatch('editTask', newTask)
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
    display: flex;
    &:not(:last-child) {
      margin-bottom: 15px;
    }

    .story-board__task__assignee {
      align-self: center;
      text-align: center;
      background: white;
      padding: 10px;
      margin-right: 10px;
      border-radius: 50%;
    }

    .story-board__task__description {
      align-self: center;
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
