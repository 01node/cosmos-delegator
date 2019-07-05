<template>
  <div v-if="validators" class="row mt-4">
    <div class="col-12 col-md-8">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h6 class="category-social">
            <i class="fas fa-fire"></i> Delegate with Ledger
          </h6>
          <a href="#" class="btn btn-round btn-link p-0 m-0">
            <i class="fas fa-lg fa-question-circle"></i>
          </a>
        </div>
        <div class="card-body" v-if="address.bech32 === undefined">
          <h4 class="title mt-0">Let's get started</h4>
          <ul>
            <li>
              <i class="fas fa-lg fa-spin fa-spinner" v-if="ledger && ledger.connected === false"></i>
              <i class="fas fa-lg fa-check-circle" v-else></i> Connect your Ledger Nano S to the
              computer and enter your PIN.
            </li>
            <li>
              <i
                class="fas fa-lg fa-spin fa-spinner"
                v-if="ledger && ledger.appDetails && ledger.appDetails.appName !== 'COSMOS'"
              ></i>
              <i class="fas fa-lg fa-check-circle" v-else></i> Open the Cosmos Ledger application.
            </li>
            <li>
              <i
                class="fas fa-lg fa-spin fa-spinner"
                v-if="ledger && ledger.appDetails && ledger.appDetails.appVersion !== '1.1.1'"
              ></i>
              <i class="fas fa-lg fa-check-circle" v-else></i> At least version v1.1.1 of Cosmos
              Ledger app installed.
            </li>
          </ul>
          <div class="alert alert-danger" v-if="errorMessage" v-text="errorMessage"></div>

          <button class="btn btn-primary" @click="connect">
            <i class="fas fa-refresh"></i> Refresh connection
          </button>
        </div>
        <div class="card-body" v-if="address.bech32 !== undefined">
          <ul>
            <li>
              <i class="fas fa-lg fa-check-circle text-success"></i> Successfully connected to
              Ledger Device
            </li>
            <li>
              Your address is
              <span
                v-text="address.bech32"
                @click="copyToClipboard()"
                class="font-weight-bold text-success address-"
              ></span>
            </li>
            <li>
              Your current balance is
              <span
                class="font-weight-bold"
                v-text="accountInfo.balanceIris"
              ></span>
              {{ DENOM }}s
            </li>
          </ul>

          <hr class="line-success">

          <div class="alert alert-info" v-if="delegateInfo && !errorMessage" v-text="delegateInfo"></div>
          <div v-if="confirmed === false">
            <div
              class="delegate-form"
              v-if="accountInfo.balanceIris !== undefined && accountInfo.balanceIris > 0"
            >
              <div class="row">
                <div class="col-12" v-if="!txMessage">
                  <h4>Delegation details</h4>
                  <div class="form-group">
                    <label
                      class="text-white font-weight-bold"
                    >Total delegation amount (in {{ DENOM }}s)</label>
                    <input
                      type="number"
                      v-model="delegateValue"
                      value="0"
                      placeholder="Enter amount"
                      class="form-control"
                    >
                  </div>
                  <div class="form-group text-white">
                    <input type="checkbox" v-model="splitEqually"> Split automatically across all
                    validators.
                  </div>
                  <div class="form-group">
                    <div class="mt-2 alert alert-info" v-if="splitEqually">
                      Each validator will receive
                      <span v-text="realsplit"></span>
                      {{ DENOM }}s
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary" @click="generateTx()">Generate transaction</button>
                  </div>
                </div>

                <div class="col-12" v-else>
                  <p>
                    <i class="fas fa-check-circle text-success"></i> Transaction successfully
                    generated:
                  </p>
                  <pre v-html="txMessage"></pre>
                </div>
              </div>
            </div>

            <div
              class="alert alert-warning"
              v-else
            >You cannot delegate because you have 0 {{ DENOM }} tokens on the address.</div>

            <div class="alert alert-danger" v-if="errorMessage" v-text="errorMessage"></div>
            <button class="btn btn-primary" v-if="errorMessage && !txMessage" @click="connect">
              <i class="fas fa-refresh"></i> Refresh connection
            </button>
          </div>
        </div>
        <div class="sslide card-body" v-if="waitConfirm">
          <div class="alert alert-warning">
            <i class="fas fa-spinner fa-spin"></i> Please wait while we broadcast your transaction.
          </div>
        </div>
        <div class="card-body" v-if="confirmed !== false">
          <div class="alert alert-success">
            <i class="fas fa-check-circle text-success"></i> Transaction successfully injected.
          </div>
          <div class="alert alert-info">
            <i class="fas fa-link"></i>
            <a class="btn btn-link btn-neutral" href="#" v-text="txHash"></a>
          </div>
          <pre v-html="confirmed"></pre>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4" v-if="!splitEqually">
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-column mt-4">
            <div
              v-for="(validator, index) in validators"
              :key="index"
              class="mb-4 d-flex justify-content-between align-items-center"
            >
              <h4 v-text="validator.description.moniker"></h4>
              <div class="d-flex justify-content-start align-items-center">
                <input
                  type="text"
                  class="ml-2 mr-2 form-control amount-element"
                  v-model="validator.delegateValue"
                >
                {{ DENOM }}s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
/* tslint:disable-next-line */
import TerraDelegateTool from "@/utils/terra-delegation-tool";
import { DIVISOR, REALDENOM, DENOM, LCD, CHAIN_ID } from "@/utils/helpers";
import { signatureImport } from "secp256k1";
import * as wallet from "@/utils/cosmos-wallet";

const DEFAULT_FEE = 0.3;
const HDPATH = [44, 118, 0, 0, 0];
const DEFAULT_GAS = 150000;
const DEFAULT_GAS_PRICE = 0.025;
const RPC_ADDRESS = LCD;

export default {
  name: "ledger-delegator",
  data: () => {
    return {
      DENOM,
      ledger: null,
      errorMessage: null,
      address: {},
      splitEqually: true,
      delegateValue: 0,
      accountInfo: {},
      txMessage: null,
      requestMetaData: null,
      delegateInfo: null,
      txData: null,
      error: null,
      confirmed: false,
      waitConfirm: false,
      txHash: null
    };
  },
  props: ["validators"],
  computed: {
    realsplit() {
      return parseFloat(this.delegateValue / this.validators.length).toFixed(5);
    }
  },
  methods: {
    async init() {
      this.ledger = new TerraDelegateTool();
      this.ledger.transportDebug = true;
      this.ledger.checkAppInfo = true;
      this.ledger.setNodeURL(RPC_ADDRESS);

      try {
        this.connect();
      } catch (error) {
        this.errorMessage = error;
      }
    },

    async connect() {
      this.errorMessage = null;
      try {
        await this.ledger.connect();
        this.ledger.appDetails = await this.ledger.app.appInfo();

        try {
          await this.checkAddress();
        } catch (error) {
          this.errorMessage = error;
        }

        try {
          await this.getAccountInfo();
        } catch (error) {
          this.errorMessage = error;
        }
      } catch (error) {
        this.errorMessage = error;
      }
    },

    copyToClipboard() {
      // TODO COPY TO CLIPBOARD FUNCTION
    },

    async checkAddress() {
      if (this.ledger.connected === true) {
        try {
          this.address = await this.ledger.retrieveAddress();
        } catch (error) {
          this.errorMessage = error;
        }
      } else {
        this.connect();
      }
    },

    async getAccountInfo() {
      if (this.ledger.connected === true) {
        try {
          this.accountInfo = await this.ledger.getAccountInfo(this.address);
        } catch (error) {
          this.errorMessage =
            "Ledger connection has been lost. Check your Ledger device.";
        }
      } else {
        this.errorMessage =
          "Ledger connection has been lost. Check your Ledger device.";
      }
    },

    async injectTransaction() {
      this.txMessage = null;
      this.addressOpen = false;
      this.injected = true;
      this.confirmed = false;
      this.waitConfirm = true;

      const response = await fetch(RPC_ADDRESS + "/txs", {
        method: "POST",
        body: this.txData
      });

      const data = await response.json();

      if (data.error) {
        this.errorMessage = data.error;
        this.waitConfirm = false;
        this.confirmed = false;
        /* this.setState({
          confirmed: false,
          waitConfirm: false,
          confirmedTx: null,
          errorMessage: data.error,
        }); */
      } else {
        this.confirmed = data;
        this.waitConfirm = false;
        this.txHash = data.txhash;
        /* this.setState({
          confirmed: true,
          waitConfirm: false,
          confirmedTx: data,
          txHash: data.hash
        }); */
      }
    },

    async signTransaction() {
      var signMessage = wallet.createSignMessage(
        this.txMessage,
        this.requestMetaData
      );

      try {
        const pubKeyBuffer = Buffer.from(this.address.pk, "hex");
        const ledgerSignature = await this.ledger.app.sign(HDPATH, signMessage);

        console.log("ledger signature code", ledgerSignature.return_code);
        if (ledgerSignature.return_code === 36864) {
          const signature = wallet.createSignature(
            signatureImport(ledgerSignature.signature),
            this.accountInfo.sequence,
            this.accountInfo.accountNumber,
            pubKeyBuffer
          );
          const signedTx = wallet.createSignedTx(this.txMessage, signature);
          const body = wallet.createBroadcastBody(signedTx);
          this.txData = body;
        } else {
          console.error(ledgerSignature.error_message);
          this.errorMessage = ledgerSignature.error_message;
          this.txData = null;
        }
      } catch ({ message, statusCode }) {
        console.error("Error signing transaction", message, statusCode);
      }
    },

    async generateTx() {
      const defaultTx = {
        fee: {
          amount: [{ denom: REALDENOM, amount: String(DEFAULT_GAS * DEFAULT_GAS_PRICE * 3) }],
          gas: String(DEFAULT_GAS * 3)
          /*1 500 000 000 000
          6 000 000 000 000 */
        },
        signature: null,
        memo: "Stake online using delegate.01node.com"
      };

      let txMessage = defaultTx;

      txMessage["msg"] = this.validators.map(item => {
        let delegateVal = this.realsplit;

        if (!this.splitEqually) {
          delegateVal = parseFloat(item.delegateValue).toFixed(5);
        }

        return {
          type: "staking/MsgDelegate",
          value: {
            delegator_address: this.address.bech32,
            validator_address: item.operator_address,
            amount: {
              denom: REALDENOM,
              amount: String(delegateVal * DIVISOR)
            }
          }
        };
      });

      const requestMetaData = {
        sequence: String(this.accountInfo.sequence),
        from: this.address.bech32,
        account_number: String(this.accountInfo.accountNumber),
        chain_id: CHAIN_ID,
        fees: String(DEFAULT_GAS * DEFAULT_GAS_PRICE),
        generate_only: false
      };

      // Save TX data to state

      this.txMessage = txMessage;
      this.requestMetaData = requestMetaData;
      this.txData = null;
      this.error = null;
      this.delegateInfo = "Please sign transaction on Legder";

      console.log("generated tx..");

      // Sign TX
      await this.signTransaction();
      this.delegateInfo = null;
      console.log("tx signed... now trying to inject");

      if (this.txData !== null) {
        await this.injectTransaction();
        console.log("successfully injected");
      }
    }
  },
  async mounted() {
    await this.init();
  }
};
</script>


<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 0.5rem;
  }
}
</style>
