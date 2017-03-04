<template>
  <div>
    <h2>{{project.name}}</h2>
    <h3>{{project.description}}</h3>
    <h4>{{ milestones.length }} open sprints</h4>
    <ul>
      <li v-for="milestone in milestones">{{ milestone.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'project-list',
  props: ['project'],
  computed: {
    milestones () {
      const milestones = []
      Object.keys(this.$store.state.milestones).forEach((key) => {
        const milestone = this.$store.state.milestones[key]
        if (+milestone.project === +this.project.id) {
          milestones.push(milestone)
        }
      })
      return milestones
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .project-list__project {
    margin-bottom: 80px;
  }
</style>
