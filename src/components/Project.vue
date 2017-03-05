<template>
  <div class="project well">
    <router-link :to="{name: 'Project', params: {projectId: projectId}}">
      <h2 class="project__header">{{project.name}}</h2>
    </router-link>
    <h3>{{project.description}}</h3>
    <h4>{{ milestones.length }} open sprints</h4>
    <ul>
      <li v-for="milestone in milestones">
        <router-link :to="{name: 'Milestone', params: {projectId: projectId, milestoneId: milestone.id}}"> 
          {{ milestone.name }}<span class="project__points-badge badge">{{milestone.closed_points || 0}} / {{milestone.total_points || 0}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'project',
  props: ['projectId', 'expanded'],
  computed: {
    project () {
      return this.$store.state.projects[this.projectId]
    },
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
<style lang="stylus">
  .project {
    margin-bottom: 40px;
    &:first-child {
      margin-top: 40px;10px
    }
  }

  .project__points-badge {
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
  }

  .project__header {
    margin-top: 0;
  }
</style>
