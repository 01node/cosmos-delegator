<template>
  <div class="card">
    <div class="card-header">Governance proposals</div>
    <div class="card-body" v-if="loading">
      <i class="fa fa-spinner fa-spin"></i> Loading governance...
    </div>
    <div class="card-body" v-else>
      <div class="alert alert-danger mb-4" v-if="error" v-text="error"></div>

      <v-data-table id="first" :headers="headers" :items="proposals" :dark="dark">
        <template v-slot:items="props">
          <tr :key="props.item.id" @click="openProposal(props.item.id)">
              <td>{{ props.item.id }}</td>
            <td>{{ props.item.content.value.title }}</td>
            <td class="tx-hash">{{ props.item.proposal_status }}</td>
            <td>{{ props.item.submit_time }}</td>
            <td>{{ props.item.total_deposit[0].amount / 1000000 }} KAVA</td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { DENOM, DIVISOR, formatNumber } from "@/utils/helpers";
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
      proposals: [],
      error: false,
      headers: [
          { text: "ID", value: "id" },
        { text: "Title", value: "content.value.title" },
        { text: "Status", value: "proposal_status" },
        { text: "Submit time", value: "submit_time" },
        { text: "Total deposit", value: "total_deposit.amount" }
      ]
    };
  },
  props: ["delegatorAddress"],
  async beforeMount() {
    try {
      const response = await axios.get(
        `https://kava-relay.01node.com/gov/proposals`
      );

      this.proposals = await response.data.result;
      this.loading = false;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    formatShares(number) {
      return formatNumber(number / DIVISOR) + " " + DENOM + "s";
    },
    openProposal(id) {
        return this.$emit('open-proposal', id);
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


