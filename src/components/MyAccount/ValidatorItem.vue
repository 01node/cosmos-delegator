<template>
  <div class="text-left">
    <img :src="avatarUrl" class="rounded-circle" height="24px">
    <router-link
      :to="{ name: 'validator', params: { address: validator.operator_address } }"
      class="btn btn-link btn-neutral"
      v-text="validator.description.moniker"
      append
    ></router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["operator_address"],
  computed: {
    ...mapGetters(["keybase", "getValidatorByAddress"]),
    avatarUrl() {
      if (this.keybase[this.validator.description.identity] !== undefined) {
        return this.keybase[this.validator.description.identity].avatarUrl;
      } else {
        return "https://via.placeholder.com/24.png?text=?"; // TODO replace with local placeholder
      }
    },
    validator() {
      return this.getValidatorByAddress(this.operator_address);
    }
  }
};
</script>
