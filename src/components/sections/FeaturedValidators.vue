<template>
  <section class="section section-lg section-coins">
    <img src="@/assets/path3.png" class="path">
    <div class="container">
      <div class="row">
        <div class="col-md-5 text-left">
          <hr class="line-success">
          <h1>
            Choose a validator
            <span class="text-success">that fits your needs</span>
          </h1>
        </div>
      </div>
      <div class="row">
        <ValidatorCard/>
        <ValidatorCard/>
        <ValidatorCard/>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <router-link to="/validators" class="btn btn-success btn-link">
            Browse Validators
            <i class="fa fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import ValidatorCard from "./FeaturedValidators/ValidatorCard.vue";

export default {
  name: 'featured-validators',
  components: {
    ValidatorCard
  }
}
</script>