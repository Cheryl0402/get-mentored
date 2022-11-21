<template>
  <div class="card shadow">
    <img class="card-img-top w-100 d-block fit-cover" style="height: 200px" src="@/assets/img/th-03.jpg" />
    <div class="card-body p-4">
      <h4 class="card-title">{{name}}</h4>
      <p style="color: #212121; font-weight: bold">
        {{mentor.occupation_title}}
      </p>
      <p class="card-text">
        <span style="color: rgb(51, 51, 51)">16 years’ experience with domestic, foreign, and luxury cars
          and heavy equipment.</span><br />
      </p>
      <div class="d-flex">
        <img class="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50"
             src="@/assets/img/th-03.jpg" />
        <div>
          <p class="fw-bold mb-0">{{name}}</p>
          <p class="text-muted mb-0">{{mentor.company_name}}</p>
        </div>
        <button class="btn btn-outline-dark btn-sm ms-auto" type="button">
          <i class="fa fa-plus"></i>&nbsp;Connect
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentorCard',
  props: {
    mentor: {
      type: Object,
      default: () => ({
        first_name: 'Jessica',
        last_name: 'Jams',
        email: '',
        occupation_title: 'Software Enginner',
        company_name: 'ByteDance Inc'
      })
    }
  },
  computed: {
    name () {
      return `${this.mentor.first_name} ${this.mentor.last_name}`
    }
  }
}
</script>

<style scoped>

</style>
