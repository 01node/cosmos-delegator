<template>
  <router-link
    :to="{ name: 'validator', params: { address: address } }"
    class="ml-2"
    v-if="link"
  >{{ moniker }}</router-link>
  <span class="font-weight-bold" v-else>{{ moniker }}</span>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  props: ["type", "address", "link"],
  computed: {
    ...mapGetters(["getValidatorByAddress"]),
    moniker() {
      if (this.type === "validator") {
        try {
          const details = this.getValidatorByAddress(this.address);

          if (details.description.moniker !== undefined) {
            return details.description.moniker;
          }
        } catch (error) {
          return this.address;
        }
      }

      return this.address;
    }
  }
};
</script>
