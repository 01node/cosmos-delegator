<template>
  <div class="card">
    <div class="card-header">My Delegations</div>
    <div class="card-body" v-if="loading">
      <i class="fa fa-spinner fa-spin"></i> Loading delegations...
    </div>
    <div class="card-body" v-else>
      <div class="alert alert-danger mb-4" v-if="error" v-text="error"></div>

      <v-data-table id="first" :headers="headers" :items="delegations" :dark="dark">
        <template v-slot:items="props">
          <tr :active="props.item.selected" :key="props.item.validator_address">
            <td>
              <validator-item :operator_address="props.item.validator_address"/>
            </td>
            <td class="text-xs-right" v-text="formatShares(props.item.shares)"></td>
            <td>
              <button
                class="btn btn-danger btn-link p-1 mr-2"
                @click="unbond(props.item.validator_address)"
              >
                <i class="fas fa-wallet"></i> UN
              </button>
              <button
                class="btn btn-success btn-link p-1"
                @click="redelegate(props.item.validator_address)"
              >
                <i class="fas fa-sync"></i> RE
              </button>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div class="card-footer d-none">
      <!-- With Selected:
      <button class="btn btn-primary">Undelegate</button>-->
    </div>

    <redelegate-modal
      :from="re.validator"
      :delegatorAddress="re.delegator"
      :dialog="re.dialog"
      :delegations="delegations"
      @close="reDialogClose"
      @generated-messages="handleGeneratedMessages"
    />

    <unbond-modal
      :from="un.validator"
      :delegatorAddress="un.delegator"
      :dialog="un.dialog"
      :delegations="delegations"
      @close="unDialogClose"
      @generated-messages="handleGeneratedMessages"
    />
  </div>
</template>

<script>
import { DENOM, DIVISOR, formatNumber } from "@/utils/helpers";
import axios from "axios";

import ValidatorItem from "@/components/MyAccount/ValidatorItem.vue";
import RedelegateModal from "@/components/Modals/Redelegate.vue";
import UnbondModal from "@/components/Modals/Unbond.vue";

export default {
  name: "my-delegations",
  components: { ValidatorItem, RedelegateModal, UnbondModal },
  data() {
    return {
      DENOM,
      dark: true,
      loading: true,
      delegations: [],
      error: false,
      selected: [],
      re: {
        dialog: false,
        validator: null,
        delegator: this.delegatorAddress
      },
      un: {
        dialog: false,
        validator: null,
        delegator: this.delegatorAddress
      },
      headers: [
        {
          text: "Validator",
          align: "left",
          sortable: false,
          value: "validator_address"
        },
        { text: "Shares", value: "shares" },
        {
          sortable: false,
          text: "Actions"
        }
      ]
    };
  },
  props: ["delegatorAddress"],
  async beforeMount() {
    try {
      const response = await axios.get(
        `https://kava-relay.01node.com/staking/delegators/${
          this.delegatorAddress
        }/delegations`
      );

      const deleg = await response.data;
      this.delegations = deleg.map(item => {
        return { ...item, selected: false };
      });
      this.loading = false;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    formatShares(number) {
      return formatNumber(number / DIVISOR) + " " + DENOM + "s";
    },
    redelegate(validatorAddress) {
      this.re.validator = validatorAddress;
      this.re.dialog = true;
    },
    reDialogClose() {
      this.re.dialog = false;
    },
    unbond(validatorAddress) {
      this.un.validator = validatorAddress;
      this.un.dialog = true;
    },
    unDialogClose() {
      this.un.dialog = false;
    },
    handleGeneratedMessages(payload) {
      this.$emit("generated-messages", payload);
    }
  }
};
</script>

<style lang="scss">
.theme--dark.v-table,
.theme--dark.v-datatable .v-datatable__actions {
  background-color: transparent !important;
}

.validator-address {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


