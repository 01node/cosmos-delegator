<template>
  <table class="table">
    <thead>
      <th>
        <input
          type="text"
          v-model="monikerSearch"
          @keyup="filterValidators"
          class="form-control"
          placeholder="Search by moniker"
        />
      </th>
      <th>Address</th>
      <th>Commission</th>
      <th>Voting Power</th>
      <th></th>
    </thead>
    <tbody v-if="monikerSearch === ''">
      <ValidatorRow
        v-for="(validator, index) in validators"
        :key="index"
        :data="validator"
        :ind="index"
        v-on:select-validator="addToList"
      />
    </tbody>
    <tbody v-else>
      <ValidatorRow
        v-for="(validator, index) in filtered"
        :key="index"
        :data="validator"
        :ind="index"
        v-on:select-validator="addToList"
      />
    </tbody>
  </table>
</template>

<script>
import ValidatorRow from './ValidatorRow';

export default {
  data() {
    return {
      monikerSearch: '',
      filtered: []
    };
  },
  components: {
    ValidatorRow
  },
  props: ['validators'],
  methods: {
    filterValidators() {
      this.filtered = [];

      if (this.monikerSearch !== '') {
        const regex = new RegExp(this.monikerSearch.toLowerCase(), 'g');

        this.filtered = this.validators.filter(validator =>
          regex.test(validator.description.moniker.toLowerCase())
        );
      }
    },
    addToList(validator) {
      this.$emit('select-validator', validator);
    }
  }
};
</script>

