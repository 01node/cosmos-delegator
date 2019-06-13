<template>
  <div class="home">
    <div class="page-header">
      <img src="@/assets/blob.png" class="path">
      <img src="@/assets/path2.png" class="path2">
      <img src="@/assets/triunghiuri.png" class="shapes triangle">
      <img src="@/assets/waves.png" class="shapes wave">
      <img src="@/assets/patrat.png" class="shapes squares">
      <img src="@/assets/cercuri.png" class="shapes circle">
      <div class="content-center">
        <div class="row row-grid justify-content-between align-items-center text-left">
          <div class="col-12 col-lg-7 col-md-7">
            <h1 class="text-white">
              Delegate with your Ledger
              <br>
              <span class="text-white">easy and secure</span>
            </h1>
            <p
              class="text-white mb-3"
            >The delegation of ATOMs to validators within the Cosmos Hub is a critical and vital part of the underlying security of the Hub that every ATOM holder is encouraged to partake in.</p>
            <div class="btn-wrapper mb-3">
              <router-link to="/delegate" class="btn btn-success">
                Delegate now
                <i class="fas fa-arrow-right"></i>
              </router-link>
              <!-- <router-link to="/how-to-delegate" class="btn btn-success btn-link btn-sm p-0">
                Read more about delegation
                <i class="fas fa-arrow-right"></i>
              </router-link>-->
            </div>
          </div>
          <div class="col-lg-4 col-md-5">
            <img src="@/assets/seo.svg">
          </div>
        </div>
      </div>
    </div>

    <BucketsSection/>
    <ValidatorMetrics/>
  </div>
</template>

<script>
/* import ExplorerInfo from "@/components/sections/ExplorerInfo.vue";
 import WhyDelegate from "@/components/sections/WhyDelegate.vue"; */
import BucketsSection from "@/components/sections/BucketsSection.vue";
import ValidatorMetrics from "@/components/sections/ValidatorMetrics.vue";

export default {
  name: "home",
  components: {
    /* ExplorerInfo,
    WhyDelegate, */
    BucketsSection,
    ValidatorMetrics
  }
};
</script>
