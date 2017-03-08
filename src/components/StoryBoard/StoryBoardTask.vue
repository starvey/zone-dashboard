<template>
  <div :data-days-without-update="daysWithoutUpdate" class="story-board__task" :class="className" draggable="true" v-on:dragstart="onDrag(task.id, $event)">
    <div class="story-board__task__assignee" :style="{backgroundColor: assignee.color}">{{ assignee.initials }}</div>
    <div class="story-board__task__description">
      {{task.subject}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'story-board-task',
  props: ['task'],
  computed: {
    assignee () {
      return this.$store.state.users[this.task.assigned_to] || {
        color: '#CCCCCC',
        initials: '?'
      }
    },
    daysWithoutUpdate () {
      const task = this.task
      const lastModifiedDate = new Date(task.modified_date)
      const todayDate = new Date()
      const timeDiff = Math.abs(todayDate.getTime() - lastModifiedDate.getTime())
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1
      return diffDays
    },
    className () {
      return {
        'story-board__task--no-update-warning': this.daysWithoutUpdate === 1,
        'story-board__task--no-update-error': this.daysWithoutUpdate > 1
      }
    }
  },
  methods: {
    onDrag (taskId, event) {
      event.dataTransfer.setData('text/plain', taskId)
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
      padding: 10px 0;
      margin-right: 10px;
      border-radius: 50%;
      min-width: 40px;
      box-sizing: border-box;
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
