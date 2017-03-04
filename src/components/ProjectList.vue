<template>
  <div class="project-list">
    <project class="project-list__project" v-for="(project, id) in projects" :key="id" :project-id="id"/>
  </div>
</template>

<script>
import Project from './Project'
export default {
  name: 'project-list',
  components: {
    Project
  },
  computed: {
    projects () {
      return this.$store.state.projects
    }
  },
  methods: {
    milestonesForProjectId (projectId) {
      const milestones = []
      Object.keys(this.$store.state.milestones).forEach((key) => {
        const milestone = this.$store.state.milestones[key]
        if (+milestone.project === +projectId) {
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
