<template>
  <div class="card">
    <div class="card-body">
      <i class="fas fa-trash-alt remove-button" @click="$emit('remove-selected',ind)"></i>
      <div class="row">
        <div class="col-12 col-md-3">
          <img :src="avatarUrl" class="img-center img-fluid rounded-circle" />
        </div>
        <div class="col-12 col-md-9">
          <h4 class="validator-title" v-text="validator.description.moniker"></h4>
          <hr class="line-success" />
          <ul>
            <li><span v-text="commissionRate"></span>% commision</li>
            <li><span v-text="bondedTokens"></span> {{ DENOM }} delegated</li>
          </ul>
        </div>
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
  props: ['validator', 'ind'],
  computed: {
    ...mapGetters(['getKeybaseById', 'getValidatorByAddress']),

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

.remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: all .2s ease;
  z-index:999;

  &:hover {
    color: #fd5d93;
  }
}
</style>
