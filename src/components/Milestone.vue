<template>
  <div>
    {{milestone.name}}
  </div>
</template>

<script>
export default {
  name: 'milestone',
  props: ['projectId', 'milestoneId'],
  computed: {
    milestone () {
      return this.$store.state.milestones[this.milestoneId]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
