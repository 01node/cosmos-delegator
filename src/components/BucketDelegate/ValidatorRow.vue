<template>
  <tr>
    <td>
      <img :src="avatarUrl" class="rounded-circle" height="24px" />
      <router-link
        target="_blank"
        :to="{ name: 'validator', params: { address: data.operator_address } }"
        class="btn btn-link btn-neutral"
        v-text="data.description.moniker"
      ></router-link>
    </td>
    <td class="operatorAddress" v-text="data.operator_address"></td>
    <td class="text-center"><span v-text="commissionRate"></span>%</td>
    <td><span v-text="bondedTokens"></span> {{ DENOM }}</td>
    <td>
      <button class="btn btn-primary" v-on:click="$emit('select-validator', data.operator_address)">
        Add to bucket
      </button>
    </td>
  </tr>
</template>

<script >
import { mapGetters } from 'vuex';
import { formatNumber, DENOM, DIVISOR } from '@/utils/helpers.js';

export default {
  name: 'validator-row',
  data() {
    return {
      DENOM
    }
  },
  props: ['data', 'ind'],
  computed: {
    ...mapGetters(['keybase']),
    validatorLink() {
      return '/validators/';
    },

    bondedTokens() {
      return formatNumber(parseInt(this.data.tokens / DIVISOR));
    },

    avatarUrl() {
      if (this.keybase[this.data.description.identity] !== undefined) {
        return this.keybase[this.data.description.identity].avatarUrl;
      } else {
        return 'https://via.placeholder.com/24.png?text=?'; // TODO replace with local placeholder
      }
    },

    votingPower() {
      return '10%';
    },

    commissionRate() {
      return parseInt(100 * this.data.commission.rate);
    }
  }
};
</script>


<style lang="scss" scoped>
.operatorAddress {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
