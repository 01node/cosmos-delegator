<template>
  <div class="page-validators">
    <div class="container">
      <div class="row mb-5 pb-5">
        <div class="col-md-5 text-left">
          <hr class="line-success" />
          <h1 class="mb-0">Delegate on IRISnet</h1>
          <p class="subtitle">
            Select the validator where you want to delegate.
          </p>
        </div>
      </div>
      <div class="row">
        <validator-card
                v-for="(validator, index) in validators"
                :operator_address="validator.operator_address"
                :key="index"
              />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ValidatorCard from "@/components/Delegate/ValidatorCard.vue";

export default {
  name: 'delegate',
  data() {
    return {
    }
  },
  components: {
    ValidatorCard
  },
  computed: {
    ...mapGetters([
      'validators'
    ]),
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 5%;
  margin-bottom: 4rem;
}
</style>

