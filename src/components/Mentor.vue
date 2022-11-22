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
        <div class="d-flex justify-content-center flex-wrap mb-3">
<!--        This component has too many issues, Pay special attention to https://github.com/romainsimon/vue-simple-search-dropdown/issues/24  -->
            <Dropdown class="dropdownlist" :options="occupationTitles" @selected="onOccupationSelected" :maxItem="20"
                      :disabled="false" name="occupationTitleDropdown" placeholder="Select a Occupation Title">
            </Dropdown>
        </div>
      </div>
    </section>
    <div class="container py-4 py-xl-5 px-5">
      <div class="d-flex flex-wrap justify-content-center gy-4">
        <div class="mentor-card flex-shrink-0 mb-5" v-for="(item, index) in displayList" :key="index">
          <MentorCard :mentor="item"/>
        </div>
      </div>
    </div>
    <nav aria-label="page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <button type="button" class="page-link" v-if="page > 0" @click="page--">Previous</button>
        </li>
        <li class="page-item">
          <button type="button" class="page-link" v-for="pageNumber in setPages()" :key="pageNumber"
                  :class="{ active: pageNumber - 1 === page }" @click="page = pageNumber - 1">
            {{ pageNumber }}
          </button>
        </li>
        <li class="page-item">
          <button type="button" class="page-link" @click="page++" v-if="page < pageCount - 1">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import MentorCard from '@/components/mentor/MentorCard'
import Dropdown from 'vue-simple-search-dropdown'

export default {
  name: 'Mentor',
  components: {
    MentorCard,
    Dropdown
  },
  data () {
    return {
      mentors: [
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Software Enginn783',
          company_name: 'ByteDance Inc'
        },
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Soft Enner66',
          company_name: 'ByteDance Inc'
        },
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Software Ennnerdd',
          company_name: 'ByteDance Inc'
        },
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Software Enginner',
          company_name: 'ByteDance Inc'
        },
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Software Enginner',
          company_name: 'ByteDance Inc'
        },
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Software Enginner',
          company_name: 'ByteDance Inc'
        },
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Software Enginner',
          company_name: 'ByteDance Inc'
        },
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Software Enginner',
          company_name: 'ByteDance Inc'
        },
        {
          first_name: 'Jessica',
          last_name: 'Jams',
          email: '',
          occupation_title: 'Software Enginner',
          company_name: 'ByteDance Inc'
        }],
      page: 0,
      perPage: 8,
      occupationTitles: [{
        id: 'ALL',
        name: 'ALL'
      }],
      filteredMentors: []
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
  mounted () {
    const titles = this.mentors.map((item) => (item.occupation_title))
    const options = this.unique(titles).map((item, index) => ({
      id: index + 1, // The id cannot be 0, source code has bug here
      name: item
    }))
    this.occupationTitles.push(...options)
    this.initiatePage()
    this.filteredMentors = this.mentors
  },
  computed: {
    displayList () {
      return this.paginate(this.filteredMentors)
    },
    pageCount () {
      return Math.ceil(this.filteredMentors.length / this.perPage)
    }
  },
  methods: {
    unique (arr) {
      return Array.from(new Set(arr))
    },
    initiatePage () {
      this.page = 0
    },
    paginate (list) {
      const start = this.page * this.perPage
      const end = start + this.perPage
      return list.slice(start, end)
    },
    setPages () {
      const pages = []
      if (this.page < 2) {
        for (let i = 1; i < 6; i++) {
          const page = i
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
    },
    onOccupationSelected (e) {
      this.initiatePage()
      if (!e.id) {
        return
      }
      if (e.name === 'ALL') {
        this.filteredMentors = this.mentors
        return
      }
      this.filteredMentors = this.mentors.filter((item) => item.occupation_title === e.name)
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
  margin-right: 30px;
}

::v-deep .dropdownlist .dropdown-input {
  background: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
  font-size: 1rem;
  padding: 12px;
  min-width: 300px;
  width: 100%;
  height: 42px;
  outline: none;
  color: #5f5f5f;
}

::v-deep .dropdownlist .dropdown-content {
  min-width: 300px;
  width: 100%;
  max-height: auto;
  border: 1px solid #dbdbdb;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
  overflow: auto;
}

::v-deep .dropdownlist .dropdown-content .dropdown-item {
  font-size: 1em;
}
</style>
