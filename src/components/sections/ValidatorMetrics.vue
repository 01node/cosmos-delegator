<template>
  <section class="section section-lg profile-page">
    <div class="container">

        <div class="row justify-content-between">
          <div class="col-md-6">
            <h1 class="profile-title font-weight-bold text-left">Validator Metrics</h1>
            <h5 class="text-on-back">Metrics</h5>
            <p class="profile-description text-left">
              We created Validator Metrics for each active validator on Kava Network to help users decide easily where to delegate their tokens. We are researching every validator details and the compose a report composing of infrastructure, economics, communication, and experience.
            </p>
            <div class="btn-wrapper pt-3">
                <router-link to="/validators" class="btn btn-success"
                >Check out Metrics on Validators page <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
          <div class="col-md-6 justify-content-between align-items-center">
            <img src="@/assets/metrics.jpg" class="img-fluid" />
          </div>
        </div>

     <!--  <div class="row">
        <div class="col-12 col-md-6">
          <h1 class="title">Validator Metrics</h1>
          <p>
            We created Validator Metrics for each active validator on Kava Network to help users decide easily where to delegate their tokens. We are researching every validator details and the compose a report composing of infrastructure, economics, communication, and experience.
          </p>
          <div class="row row-grid justify-content-center">
            <div class="col-12 text-center">
              <router-link to="/validators" class="btn btn-secondary"
                >Check out Validators page <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'buckets-section'
};
</script>


<style lang="scss" scoped>
.info {
  padding-top: 20%;
}
</style>
