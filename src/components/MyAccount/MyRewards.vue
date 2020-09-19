<template>
  <div class="card">
    <div class="card-header">My Rewards</div>
    <div class="card-body text-center" v-if="loading">
      <i class="fas fa-spinner fa-spin fa-3x text-white"></i>
    </div>
    <div class="card-body pt-4 text-center" v-else>
      <h2 class="mb-0">{{ rewards }}</h2>
      <h4 class="mb-0">{{ DENOM }}</h4>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary btn-link" @click="generateWithdraw()">
        <i class="fas fa-wallet"></i> WITHDRAW
      </button>
      <button class="btn btn-success btn-link" @click="generateReinvest()">
        <i class="fas fa-sync"></i> REINVEST
      </button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { DENOM, DIVISOR, REALDENOM, formatNumber, LCD } from "@/utils/helpers";

export default {
  data() {
    return {
      DENOM,
      rewards: 0,
      loading: true,
    };
  },
  props: ["delegatorAddress"],
  methods: {
    async generateReinvest() {
      /* let response = await axios.get(
        `https://sentryl1.01node.com/staking/delegators/${this.delegatorAddress}/delegations`
      );
      let delegations = await response.data;
      let txMessage;

      txMessage = delegations.map(item => {
        return {
          type: 'cosmos-sdk/MsgWithdrawDelegatorRewards',
          value: {
            delegator_address: item.delegator_address,
            validator_address: item.validator_address
          }
        };
      }); */
    },
    async generateWithdraw() {
      let response = await axios.get(
        `${LCD}/stake/delegators/${this.delegatorAddress}/delegations`
      );
      let delegations = await response.data;

      let txMessage;

      txMessage = delegations.slice(0, 5).map((item) => {
        return {
          type: "cosmos-sdk/MsgWithdrawDelegationReward",
          value: {
            delegator_addr: item.delegator_addr,
            validator_addr: item.validator_addr,
          },
        };
      });

      this.$emit("generated-messages", txMessage);
    },
  },
  async beforeMount() {
    try {
      const response = await axios.get(
        `${LCD}/distribution/${this.delegatorAddress}/rewards`
      );

      const rewarded = await response.data.total;

      if (rewarded.length > 0) {
        this.rewards = parseFloat(rewarded[0].amount / DIVISOR).toFixed(
          5
        );
      }

      this.loading = false;
    } catch (error) {
      this.error = error;
    }
  },
};
</script>
