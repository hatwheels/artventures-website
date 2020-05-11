<template>
  <Layout>


  </Layout>
</template>

<script>
import { mapGetters } from "vuex"
import { directive } from 'vue-awesome-swiper'
import ContactUs from '~/components/ContactUs.vue'

export default {
  components: {
    ContactUs,
  },
  directives: {
    swiper: directive
  },
  mounted () {
    this.$nextTick(() => {
      // Enable side navigation with a 200ms delay to avoid
      // load waypoint triggers and set active hash because
      // no waypoint triggered
      setTimeout(() => {
        this.isSideNav = true;
        switch (this.$route.hash) {
          case '':
          case '#about':
            this.sideNav[0].active = true;
            break;
          case '#explore':
            this.sideNav[1].active = true;
            break;
          case '#artists':
            this.sideNav[2].active = true;
            break;
          case '#benefits':
            this.sideNav[3].active = true;
            break;
          case '#media':
            this.sideNav[4].active = true;
            break;
          case '#contact-us':
            this.sideNav[5].active = true;
            break;
        }
      }, 200);
    })
  },
  updated () {
    this.$nextTick(() => {
      if (this.$route.hash) {
        const el = document.querySelector(this.$route.hash);
        el && el.scrollIntoView();
      }
    })
  },
  data () {
    return {
      isSideNav: false,
      intersectOptions: {
        rootMargin: '0px 0px -50% 0px',
        threshold: [0.3],
        root: null
      },
      /* Side Navigation */
      sideNav: [
        {
          gr: 'Εμεις',
          en: 'About',
          tag: '#about',
          active: false,
        },
        {
          gr: 'Ανακαλυψε',
          en: 'Explore',
          tag: '#explore',
          active: false,
        },
        {
          gr: 'Καλλιτεχνες',
          en: 'Artists',
          tag: '#artists',
          active: false,
        },
        {
          gr: 'Πλεονεκτηματα',
          en: 'Benefits',
          tag: '#benefits',
          active: false,
        },
        {
          gr: 'ΜΜΕ',
          en: 'Media',
          tag: '#media',
          active: false,
        },
        {
          gr: 'Επικοινωνια',
          en: 'Contact',
          tag: '#contact-us',
          active: false,
        },
      ],
      /* Sections */
      // About
      about: {
        isActive: false,
        img: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1582236536/artventures/img21.png",
        lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582236536/artventures/img21.png",
      },
      // Explore
      explore: {
        isActive: false,
        images: [
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320134/artventures/img22.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320134/artventures/img22.jpg',
            route: '/individuals',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320139/artventures/img23.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320139/artventures/img23.jpg',
            route: '/businesses',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320144/artventures/img24.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320139/artventures/img24.jpg',
            route: '/hotels',
          },
        ],
      },
      // Artists
      artists: {
        isActive: false,
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1582416241/artventures/img17.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img17.jpg',
      },
      // Benefits
      benefits: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img25.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img25.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img26.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img26.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img27.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img27.jpg',
        },
      ],
      // Media
      media: {
        logos: [
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-om.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-om.jpg',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-popaganda.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-popaganda.jpg'
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-fortunegreece.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-fortunegreece.jpg',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-kathimerini.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-kathimerini.jpg',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-liberal.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-liberal.jpg',
          },
        ]
      },
      /* Carousel */
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0,
        setWrapperSize: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
      swiperSmallOption: {
        slidesPerView: 3,
        spaceBetween: 0,
        setWrapperSize: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    onAbout ({ el, going, direction, _entry }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[0].active = true;
        this.sideNav[1].active =
        this.sideNav[2].active =
        this.sideNav[3].active =
        this.sideNav[4].active =
        this.sideNav[5].active = false;
      }
    },
    onExplore ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[1].active = true;
        this.sideNav[0].active =
        this.sideNav[2].active =
        this.sideNav[3].active =
        this.sideNav[4].active =
        this.sideNav[5].active = false;
      }
    },
    onArtists ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[2].active = true;
        this.sideNav[0].active =
        this.sideNav[1].active =
        this.sideNav[3].active =
        this.sideNav[4].active =
        this.sideNav[5].active = false;
      }
    },
    onBenefits ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[3].active = true;
        this.sideNav[0].active =
        this.sideNav[1].active =
        this.sideNav[2].active =
        this.sideNav[4].active =
        this.sideNav[5].active = false;
      }
    },
    onMedia ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[4].active = true;
        this.sideNav[0].active =
        this.sideNav[1].active =
        this.sideNav[2].active =
        this.sideNav[3].active =
        this.sideNav[5].active = false;
      }
    },
    onContact ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[5].active = true;
        this.sideNav[0].active =
        this.sideNav[1].active =
        this.sideNav[2].active =
        this.sideNav[3].active =
        this.sideNav[4].active = false;
      }
    },
  },
  metaInfo () {
    return {
      titleTemplate: 'Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
query {
  about: allHome(filter: { path: { eq: "/content/home/about/" }}) {
    edges {
      node {
        title {
          en
          gr
        }
        body {
          en
          gr
        }
      }
    }
  }
  explore: allHome(filter: { path: { eq: "/content/home/explore/" }}) {
    edges {
      node {
        title {
          en
          gr
        }
        images {
          en
          gr
        }
        button {
          en
          gr
        }
      }
    }
  }
  artists: allHome(filter: { path: { eq: "/content/home/artists/" }}) {
    edges {
      node {
        title {
          en
          gr
        }
        body {
          en
          gr
        }
        testimonials {
          quote{
            en
            gr
          }
          author {
            en
            gr
          }
        }
        button {
          en
          gr
        }
      }
    }
  }
  benefits: allHome(filter: { path: { eq: "/content/home/benefits/" }}) {
    edges {
      node {
        benefits {
          title {
            en
            gr
          }
          body {
            en
            gr
          }
        }
      }
    }
  }
  media: allHome(filter: { path: { eq: "/content/home/media/" }}) {
    edges {
      node {
        title {
          en
          gr
        }
      }
    }
  }
}
</page-query>

<style>
  #nav-0.v-btn:hover:before,
  #nav-0.v-btn:focus:before,
  #nav-1.v-btn:hover:before,
  #nav-1.v-btn:focus:before,
  #nav-2.v-btn:hover:before,
  #nav-2.v-btn:focus:before,
  #nav-3.v-btn:hover:before,
  #nav-3.v-btn:focus:before,
  #nav-4.v-btn:hover:before,
  #nav-4.v-btn:focus:before,
  #nav-5.v-btn:hover:before,
  #nav-5.v-btn:focus:before {
    display: none;
  }
  #nav-0.v-btn--active:before,
  #nav-1.v-btn--active:before,
  #nav-2.v-btn--active:before,
  #nav-3.v-btn--active:before,
  #nav-4.v-btn--active:before,
  #nav-5.v-btn--active:before {
    opacity: 0;
  }

/* Carousel */
.carousel-upper {
  width: 900px;
}
.carousel-mid {
  width: 616px;
}
.carousel-lower {
  padding-bottom: 40px;
}
.carousel-upper-small {
  width: 300px;
}
.carousel-mid-small {
  width: 210px;
}
.carousel-lower-small {
  padding-bottom: 40px;
}
.swiper-button-next,
.swiper-button-prev {
  background-color: rgba(0, 0, 0, 0.12);
  padding: 40px;
  /* Remove Chrome focurs border */
  outline-style: none;
  box-shadow: none;
  border-color: transparent;
}
.img-slide {
  background-position: 50%;
  background-size: cover;
}

/* Custom column width */
.col.col-artists-width {
  width: 45%;
  max-width: 45%;
  flex-basis: 45%;
}
.col.col-testimonials-width {
  width: 31%;
  max-width: 31%;
  flex-basis: 31%;
}

/* Text fonts */
/* For Greek */
.noto-10-700 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 10px !important;
  font-weight: 700 !important;
}
.noto-10p5-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 10.5px !important;
  font-weight: 600 !important;
}
.noto-11p5-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
}
/* Montserrat */
.montserrat-10-700 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 10px !important;
  font-weight: 700 !important;
}
.montserrat-10p5-600 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 10.5px !important;
  font-weight: 600 !important;
}
.montserrat-11p5-600 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
}
</style>