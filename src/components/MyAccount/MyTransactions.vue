<template>
  <div class="card">
    <div class="card-header">My Transactions</div>
    <div class="card-body" v-if="loading">
      <i class="fa fa-spinner fa-spin"></i> Loading transactions...
    </div>
    <div class="card-body" v-else>
      <div class="alert alert-danger mb-4" v-if="error" v-text="error"></div>

      <v-data-table id="first" :headers="headers" :items="transactions" :dark="dark">
        <template v-slot:items="props">
          <tr :key="props.item.txhash">
            <td>{{ props.item.height }}</td>
            <td class="tx-hash">{{ props.item.txhash }}</td>
            <td>
              <span class="badge badge-success" v-if="props.item.logs[0].success">Success</span>
            </td>
            <td>{{ props.item.gas_used }} / {{ props.item.gas_wanted }}</td>
            <td>{{ props.item.timestamp.toDate }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div class="card-footer d-none">
      <!-- With Selected:
      <button class="btn btn-primary">Undelegate</button>-->
    </div>
  </div>
</template>

<script>
import { LCD, DENOM, DIVISOR, formatNumber } from "@/utils/helpers";
import axios from "axios";

import ValidatorItem from "@/components/MyAccount/ValidatorItem.vue";

export default {
  name: "my-delegations",
  components: { ValidatorItem },
  data() {
    return {
      DENOM,
      dark: true,
      loading: true,
      transactions: [],
      error: false,
      headers: [
        { text: "Height", value: "height" },
        { text: "txHash", value: "txhash" },
        { text: "Status", value: "logs.success" },
        { text: "Gas", value: "gas_used" },
        { text: "DateTime", value: "timestamp" }
      ]
    };
  },
  props: ["delegatorAddress"],
  async beforeMount() {
    try {
      const response = await axios.get(
        `${LCD}/stake/delegators/${
          this.delegatorAddress
        }/txs`
      );

      this.transactions = await response.data;
      this.loading = false;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    formatShares(number) {
      return formatNumber(number / DIVISOR) + " " + DENOM + "s";
    }
  }
};
</script>

<style lang="scss">
.theme--dark.v-table,
.theme--dark.v-datatable .v-datatable__actions {
  background-color: transparent !important;
}

.tx-hash {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


