<template>
  <div class="row justify-content-center">
    <section class="newsletter-subscribe ">
      <div class="container">
        <div class="row mb-2">
          <div class="col-md-8 col-xl-6 text-center mx-auto">
            <h2 class="display-6 fw-bold">
              Search Industries your are Interested in
            </h2>
            <p class="text-muted">
              GetMentored offers tons of news from different&nbsp;
              industries&nbsp; to help you better understand detail of
              occupation
            </p>
          </div>
        </div>
        <form class="d-flex justify-content-center flex-wrap" method="post">
          <div class="mb-3">
            <input class="form-control" type="text" v-model="searchKey" name="" placeholder="Keyword" />
          </div>
        </form>
      </div>
    </section>
    <div class="container py-4 py-xl-5 px-5">
      <div class="d-flex flex-wrap justify-content-around gy-4">
        <div class="mentor-card flex-shrink-0 mb-5" v-for="item in 7" :key="item">
          <MentorCard />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MentorCard from '@/components/mentor/MentorCard'
export default {
  name: 'Mentor',
  components: { MentorCard },
  data () {
    return {
      searchKey: '',
      mentors: [],
      page: 0,
      perPage: 20
    }
  },
  async created () {
    try {
      const response = await this.$http.get('/mentor')
      this.mentors = response.data
    } catch (error) {
      console.log(error.response)
    }
  },
  computed: {
    filteredList () {
      this.initiatePage()
      return this.mentors.filter(mentor => {
        return mentor.occupation_title.toLowerCase().includes(this.searchKey.toLowerCase())
      })
    },
    displayList () {
      return this.paginate(this.filteredList)
    },
    pageCount () {
      return Math.ceil(this.filteredList.length / this.perPage)
    }
  },
  methods: {
    initiatePage () {
      this.page = 0
    },
    paginate (careers) {
      const start = this.page * this.perPage
      const end = start + this.perPage
      return careers.slice(start, end)
    },
    setPages () {
      const pages = []
      if (this.page < 2) {
        for (let i = 1; i < 6; i++) {
          const page = 0 + i
          if (page <= this.pageCount) {
            pages.push(page)
          }
        }
      } else if (this.page > this.pageCount - 3) {
        for (let i = -1; i < 4; i++) {
          const page = this.pageCount - 3 + i
          if (page <= this.pageCount && page > 0) {
            pages.push(page)
          }
        }
      } else {
        for (let i = -1; i < 4; i++) {
          const page = this.page + i
          if (page <= this.pageCount) {
            pages.push(page)
          }
        }
      }
      return pages
    }
  }
}
</script>
<style scoped>
button.page-link {
  display: inline-block;
  color: #000;
}

.mentor-card {
  width: 340px;
}
</style>
