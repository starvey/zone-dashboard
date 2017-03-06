<template>
  <div class="story-board__cell" v-on:dragover.prevent v-on:drop="onDragDrop">
    <div draggable="true" v-for="(task, taskId) in tasks" v-on:dragstart="onDrag(taskId, $event)" :data-days-without-update="daysWithoutUpdateForTaskId(taskId)" class="story-board__task" :class="classNameForTaskId(taskId)">
      {{task.subject}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'milestone',
  props: ['tasks', 'statusId'],
  methods: {
    onDragDrop (event) {
      const taskId = event.dataTransfer.getData('text/plain')
      const originalTask = this.$store.state.tasks[taskId]
      const newTask = {
        ...originalTask,
        status: this.statusId
      }
      this.$store.commit('setTasks', [newTask])
      this.$store.dispatch('editTask', newTask)
    },
    onDrag (taskId, event) {
      event.dataTransfer.setData('text/plain', taskId)
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
