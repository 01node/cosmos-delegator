export const keybase = state => state.keybase.identities;
export const validators = state => state.validators.items;

export const getKeybaseById = state => id => {
  return state.keybase.identities[id];
};

export const getValidatorByAddress = state => address => {
  return Object.values(state.validators.items).find(
    validator => validator.operator_address === address
  );
};
