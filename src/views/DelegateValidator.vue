<template>
  <div class="page-validators">
    <div v-if="validator" class="container">
      <div class="row mb-5">
        <div class="col-12 text-left">
          <hr class="line-success" />
          <h1 class="mb-0">
            Delegate to
            <span class="font-weight-bold" v-text="validator.description.moniker"></span>
          </h1>
          <p class="subtitle">
            Select the way you want to delegate.
          </p>
        </div>
      </div>
      <div v-if="!delegationMethod" class="row d-flex justify-content-center">
        <ledger-selector v-on:method-select="selectDelegationMethod" />
        <cli-selector v-on:method-select="selectDelegationMethod" />
      </div>
      <div v-if="delegationMethod === 'ledger'" class="row">
        <ledger-delegator :operator_address="validator.operator_address" />
        <cli-selector v-on:method-select="selectDelegationMethod" />
      </div>
      <div v-if="delegationMethod === 'cli'" class="row">
        <cli-delegator :operator_address="validator.operator_address" />
        <ledger-selector v-on:method-select="selectDelegationMethod" />
      </div>
    </div>
    <div v-else class="container">
      <i class="fas fa-spin fa-spinner"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatNumber } from '@/utils/helpers';

import CliSelector from '@/components/Delegate/CliSelector.vue';
import LedgerSelector from '@/components/Delegate/LedgerSelector.vue';
import LedgerDelegator from '@/components/Delegate/LedgerDelegator.vue';
import CliDelegator from '@/components/Delegate/CliDelegator.vue';

export default {
  name: 'delegate-validator',
  data: () => {
    return {
      delegationMethod: null
    };
  },
  components: {
    LedgerDelegator,
    CliDelegator,
    CliSelector,
    LedgerSelector
  },
  computed: {
    ...mapGetters(['getKeybaseById', 'getValidatorByAddress']),
    validator() {
      return this.getValidatorByAddress(this.$route.params.address);
    },

    keybase() {
      if (this.validator.description.identity !== undefined) {
        return this.getKeybaseById(this.validator.description.identity);
      }
      return false;
    },

    commissionRate() {
      if (this.validator !== undefined) {
        return parseInt(this.validator.commission.rate * 100);
      }

      return null;
    },
    bondedTokens() {
      if (this.validator !== undefined) {
        return formatNumber(parseInt(this.validator.tokens, 10));
      }

      return null;
    },

    avatarUrl() {
      if (this.keybase !== undefined) {
        return this.keybase.avatarUrl;
      } else {
        return 'https://via.placeholder.com/128.png?text=?'; // TODO replace with local placeholder
      }
    }
  },
  methods: {
    selectDelegationMethod(type) {
      this.delegationMethod = type;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 5%;
  margin-bottom: 4rem;
}
</style>

