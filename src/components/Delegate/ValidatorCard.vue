<template>
  <div class="col-12 col-md-3 my-5">
    <div v-if="validator" class="card card-coin card-plain">
      <div class="card-header">
        <img :src="avatarUrl" class="img-center img-fluid rounded-circle" />
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 text-center">
            <h4 class="validator-title" v-text="validator.description.moniker"></h4>
            <hr class="line-success" />
          </div>
        </div>
        <div class="row">
          <ul class="list-group">
            <li class="list-group-item"><span v-text="commissionRate"></span>% commision</li>
            <li class="list-group-item"><span v-text="bondedTokens"></span> {{ DENOM }} delegated</li>
          </ul>
        </div>
      </div>
      <div class="card-footer text-center d-flex align-items-center justify-content-between">
        <router-link
          :to="{ name: 'delegate-to', params: { address: validator.operator_address } }"
          class="btn btn-primary"
          >Select</router-link
        >
        <router-link
          :to="{ name: 'validator', params: { address: validator.operator_address } }"
          class="btn btn-link"
        >
          <i class="fas fa-question-circle"></i> Info
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { formatNumber, DENOM, DIVISOR } from '@/utils/helpers';

export default {
  name: 'validator-card',
  data() {
    return {
      DENOM
    }
  },
  props: ['operator_address'],
  computed: {
    ...mapGetters(['getKeybaseById', 'getValidatorByAddress']),
    validator() {
      return this.getValidatorByAddress(this.operator_address);
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
        return formatNumber(parseInt(this.validator.tokens / DIVISOR, 10));
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
  }
};
</script>


<style lang="scss" scoped>
.card-coin {
  .validator-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
