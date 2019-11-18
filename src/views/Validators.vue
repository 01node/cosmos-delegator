<template>
  <div class="page-validators">
    <div class="container">
      <div class="row">
        <div class="col-md-5 text-left">
          <hr class="line-success" />
          <h1>Kava Active Validators</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table table-hover">
            <thead>
              <tr>
                <td>
                  <input
                    type="text"
                    v-model="monikerSearch"
                    @keyup="filterValidators"
                    class="form-control"
                    placeholder="Search by moniker"
                  />
                </td>
                <td>Operator Address</td>
                <td @click="sortBy('commission')" class="clickable">
                  <i class="fas fa-sort-amount-down" v-if="!commissionSort"></i>
                  <i class="fas fa-sort-amount-up" v-else></i>
                  Comm.
                </td>
                <td @click="sortBy('tokens')" class="clickable">
                  <i class="fas fa-sort-amount-down" v-if="!tokensSort"></i>
                  <i class="fas fa-sort-amount-up" v-else></i>
                  Voting Power
                </td>
                <td>Uptime</td>
                <td>Self-Bonded</td>
                <td></td>
              </tr>
            </thead>
            <tbody v-if="monikerSearch === ''">
              <validator-row
                v-for="(validator, index) in validators"
                :data="validator"
                :key="index"
              />
            </tbody>
            <tbody v-else>
              <validator-row
                v-for="(validator, index) in filtered"
                :data="validator"
                :key="index"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ValidatorRow from '@/components/Validators/ValidatorRow.vue';

export default {
  name: 'validators',
  data() {
    return {
      tokensSort: false,
      commissionSort: false,
      monikerSearch: '',
      filtered: []
    };
  },
  components: {
    ValidatorRow
  },
  computed: {
    ...mapGetters(['validators'])
  },
  methods: {
    ...mapMutations(['sortByTokens', 'sortByCommission', 'sortByMoniker']),
    filterValidators() {
      this.filtered = [];

      if (this.monikerSearch !== '') {
        const regex = new RegExp(this.monikerSearch.toLowerCase(), 'g');

        this.filtered = this.validators.filter(validator =>
          regex.test(validator.description.moniker.toLowerCase())
        );
      }
    },
    sortBy(type) {
      switch (type) {
        case 'commission':
          this.commissionSort = !this.commissionSort;
          this.sortByCommission(this.commissionSort);
          break;

        default:
          this.tokensSort = !this.tokensSort;
          this.sortByTokens(this.tokensSort);
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 5%;
  margin-bottom: 4rem;
}

.clickable {
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #fff;
  }
}
</style>

