<template>
  <div class="loader-container" v-if="show">
    <div class="curved-div">
      <div class="colour-magic">
        <i class="fa fa-circle-o-notch rotate"></i>
      </div>
      <div class="loading">{{ loading }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { store } from "../components/store/store.js";

export default {
  data() {
    return {
      loading: "Loading..."
    };
  },
  computed: {
    // ...mapGetters({
    show: function() {
      return this.$store.getters.getLoadingStatus;
    }
    // })
  },
  mounted() {
    var abc = this.$store.getters.getLoadingStatus;
  }
};
</script>
<style scoped>
/* .loader-container {
  font-family: "Montserrat", sans-serif;
  position: relative;
  bottom: 50%;
} */

.curved-div {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.3rem;
  width: 20rem;
  padding: 1rem;
  background: transparent;
  box-shadow: 0 0 0.1rem #fefefe;
}

.curved-div > * {
  display: inline-block;
}

.rotate {
  border-radius: 50%;
  padding: 0.5rem;
  animation-name: rotate;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
  animation-delay: 0s;
}

.loading {
  text-align: center;
  width: 12rem;
  font-size: 1.8rem;
}

.show {
  visibility: visible;
  opacity: 1;
  z-index: 1;
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out,
    z-index 0.5s ease-out;
}

.hidden {
  opacity: 0;
  visibility: hidden;
  z-index: 0;
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out,
    z-index 0.5s ease-out;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

.colour-magic {
  animation-name: colorMagic;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-delay: 0s;
}

@keyframes colorMagic {
  0% {
    color: rgb(179, 10, 10);
  }
  10% {
    color: rgb(227, 132, 22);
  }
  20% {
    color: rgb(164, 153, 7);
  }
  30% {
    color: rgb(26, 171, 19);
  }
  40% {
    color: rgb(19, 144, 177);
  }
  50% {
    color: rgb(14, 16, 221);
  }
  60% {
    color: rgb(27, 9, 98);
  }
  70% {
    color: rgb(58, 11, 111);
  }
  80% {
    color: rgb(126, 14, 129);
  }
  90% {
    color: rgb(208, 19, 121);
  }
  100% {
    color: rgb(198, 18, 18);
  }
}
</style>