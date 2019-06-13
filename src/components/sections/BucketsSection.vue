<template>
  <section class="section section-lg">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <h1 class="text-center title">Introducing Buckets</h1>
          <p class="text-center">
            Delegate to one of our 3 buckets of validators (3-5 validators) to minimise the risk,
            and suport the decentralization of the network.
          </p>
          <div class="row mt-5">
            <div class="col-12 col-md-4 text-center">
              <div class="card bg-transparent">
                <div class="card-header">
                  <i class="fab fa-5x fa-bitbucket text-primary"></i>
                </div>
                <div class="card-body text-center">
                  <h3>Random Bucket</h3>
                  <p class="description">
                    Randomly select 3-5 validators from the list of active validators, excluding the
                    validators with a commission greater than 20%.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 text-center">
              <div class="card bg-transparent">
                <div class="card-header">
                  <i class="fab fa-5x fa-bitbucket text-warning"></i>
                </div>
                <div class="card-body text-center">
                  <h3>Small Validators Bucket</h3>
                  <p class="description">
                    Randomly select 3 validators from the ones with the lowest stake values from the active
                    validators list (bottom 20 validators).
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 text-center">
              <div class="card bg-transparent">
                <div class="card-header">
                  <i class="fab fa-5x fa-bitbucket text-success"></i>
                </div>
                <div class="card-body text-center">
                  <h3>Custom Bucket</h3>
                  <p class="description">
                    Create your own custom bucket, by selecting validators from the entire active validators
                    list. There are no restrictions enabled.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 text-center">
              <router-link to="/bucket-delegate" class="btn btn-secondary">
                Find more about Buckets
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "buckets-section"
};
</script>


<style lang="scss" scoped>
.info {
  padding-top: 20%;
}
</style>
