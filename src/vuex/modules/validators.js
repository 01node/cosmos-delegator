import axios from 'axios';

export default () => {
  const emptyState = {
    items: {}
  };
  const state = JSON.parse(JSON.stringify(emptyState));

  let validators = [];
  let goodReturns = [];

  axios
    .get("https://sentryl1.01node.com/staking/validators?page=1")
    .then(first => {
      validators.push(...first.data);

      axios
        .get("https://sentryl1.01node.com/staking/validators?page=2")
        .then(second => {
          validators.push(...second.data);

          axios
            .get("https://sentryl1.01node.com/validatorsets/latest")
            .then(latest => {
              const latestSet = latest.data.validators;

              validators.map(validator => {
                latestSet.filter(latest => {
                  if (validator.consensus_pubkey === latest.pub_key) {
                    goodReturns.push(validator);
                  }
                });
              });

              state.items = goodReturns.sort(
                (a, b) => parseInt(b.tokens) - parseInt(a.tokens)
              );
            });
        });
    });

  const mutations = {
    sortByTokens(state, asc = false) {
      if (asc) {
        return state.items.sort(
          (a, b) => parseInt(a.tokens) - parseInt(b.tokens)
        );
      }

      return state.items.sort(
        (a, b) => parseInt(b.tokens) - parseInt(a.tokens)
      );
    },

    sortByCommission(state, asc = false) {
      if (asc) {
        return state.items.sort(
          (a, b) =>
            parseFloat(a.commission.rate) - parseFloat(b.commission.rate)
        );
      }

      return state.items.sort(
        (a, b) => parseFloat(b.commission.rate) - parseFloat(a.commission.rate)
      );
    }
  };

  const actions = {};

  return {
    state,
    actions,
    mutations
  };
};
