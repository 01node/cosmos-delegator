import bech32 from 'bech32';
import axios from 'axios';

const DIVISOR = 1000000;
const DENOM = 'ATOM';
const REALDENOM = 'uatom';
const LCD = 'https://sentryl1.01node.com';
const SETTINGS = {
  bech32PrefixAccAddr: 'cosmos',
  bech32PrefixAccPub: 'cosmospub',
  bech32PrefixValAddr: 'cosmosvaloper',
  bech32PrefixValPub: 'cosmosvaloperpub',
  bech32PrefixConsAddr: 'cosmosvalcons',
  bech32PrefixConsPub: 'cosmosvalconspub'
};

const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const pubkeyToBech32 = (pubkey, prefix) => {
  // '1624DE6420' is ed25519 pubkey prefix
  let pubkeyAminoPrefix = Buffer.from('1624DE6420', 'hex');
  let buffer = Buffer.alloc(37);
  pubkeyAminoPrefix.copy(buffer, 0);
  Buffer.from(pubkey.value, 'base64').copy(buffer, pubkeyAminoPrefix.length);
  return bech32.encode(prefix, bech32.toWords(buffer));
};

const bech32ToPubkey = pubkey => {
  // '1624DE6420' is ed25519 pubkey prefix
  let pubkeyAminoPrefix = Buffer.from('1624DE6420', 'hex');
  let buffer = Buffer.from(bech32.fromWords(bech32.decode(pubkey).words));
  return buffer.slice(pubkeyAminoPrefix.length).toString('base64');
};

const getDelegatorAddress = operatorAddr => {
  let address = bech32.decode(operatorAddr);
  return bech32.encode(SETTINGS.bech32PrefixAccAddr, address.words);
};

const getSelfBonded = async operatorAddr => {
  let delegatorAddr = getDelegatorAddress(operatorAddr);

  try {
    let response = await axios.get(
      `${LCD}/staking/delegators/${delegatorAddr}/delegations/${operatorAddr}`
    );
    return await parseInt(response.data.shares / DIVISOR);
  } catch (error) {
    return 0;
  }
};

export {
  formatNumber,
  pubkeyToBech32,
  bech32ToPubkey,
  getDelegatorAddress,
  DIVISOR,
  getSelfBonded,
  DENOM,
  REALDENOM
};
