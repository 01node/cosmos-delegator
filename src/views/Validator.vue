<template>
  <div v-if="validator" class="profile-page page-validator">
    <div class="page-header">
      <img src="@/assets/dots.png" class="dots" />
      <img src="@/assets/path4.png" class="path" />
      <div class="container align-items-center">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <hr class="line-success" />
            <h1 class="title mb-0 text-left">
              <span v-text="validator.description.moniker"></span>
            </h1>
            <h3 class="subtitle text-white-50 mb-4" v-text="validator.operator_address"></h3>
            <p class="profile-description pt-4" v-text="validator.description.details"></p>
            <div class="btn-wrapper profile pt-3">
              <a
                target="_blank"
                :href="validator.description.website"
                class="btn btn-icon btn-twitter btn-round mr-2"
              >
                <i class="fas fa-link"></i>
              </a>
              <a target="_blank" href="#" class="btn btn-icon btn-default btn-round">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 ml-auto mr-auto">
            <div class="card card-coin card-plain">
              <div class="card-header">
                <img :src="avatarUrl" class="img-center img-fluid rounded-circle" />
                <h4 class="title">Informations</h4>

                <p>
                  Bonded Tokens: <span class="font-weight-bold" v-text="bondedTokens"></span> IRIS
                </p>
                <p>Commision: <span class="font-weight-bold" v-text="commissionRate"></span>%</p>
                <p>Self-Bonded:</p>
              </div>
              <div class="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-6 justify-content-between align-items-center">
            <div class="alert alert-info">Please connect your Ledger to see available options.</div>

            <!-- <div class="actions d-flex flex-column">
              <button class="btn btn-primary">
                Delegate
                <i class="fas fa-arrow-right"></i>
              </button>

              <button class="btn btn-neutral btn-simple">
                Re-Delegate
                <i class="fas fa-arrow-right"></i>
              </button>

              <button class="btn btn-neutral btn-simple">
                Claim Rewards
                <i class="fas fa-arrow-right"></i>
              </button>

              <button class="btn btn-neutral btn-simple">
                Un-Delegate
                <i class="fas fa-arrow-right"></i>
              </button>
            </div> -->
            <!-- <form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Your Name</label>
                        <input type="text" class="form-control" value="Mike">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Email address</label>
                        <input type="email" class="form-control" placeholder="mike@email.com">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Phone</label>
                        <input type="text" class="form-control" value="001-12321345">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Company</label>
                        <input type="text" class="form-control" value="CreativeTim">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Message</label>
                        <input type="text" class="form-control" placeholder="Hello there!">
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary btn-round float-right" rel="tooltip" data-original-title="Can't wait for your message" data-placement="right">Send text</button>
            </form>-->
          </div>
          <div class="col-md-5">
            <h1 class="profile-title text-left">Delegate with Ledger</h1>
            <h5 class="text-on-back">Delegate</h5>
            <p class="profile-description text-left">
              We are able to offer the ability to delegate, withdraw and even participate in
              governance proposals from our website, using your Ledger Nano S!
            </p>
            <div class="btn-wrapper pt-3">
              <router-link to="/how-to-delegate" class="btn btn-link btn-success">
                How to delegate
                <i class="fas fa-question"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatNumber } from '@/utils/helpers';

export default {
  name: 'validator',
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(['getKeybaseById', 'getValidatorByAddress']),
    validator() {
      return this.getValidatorByAddress(this.$route.params.address);
    },

    keybase() {
      if (this.validator.description.identity !== undefined) {
        return this.getKeybaseById(this.validator.description.identity);
      }

      return false;
    },

    commissionRate() {
      if (this.validator !== undefined) {
        return parseInt((this.validator.commission.rate * 100).toString());
      }

      return null;
    },

    bondedTokens() {
      if (this.validator !== undefined) {
        return formatNumber(parseInt(this.validator.tokens, 10));
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
.container {
  padding-top: 5%;
  margin-bottom: 4rem;
}
</style>
