
// Aux functions for left and right padding strings

function lpad (s,n,c) {var i; var a = s.split(''); for (i = 0; i < n - s.length; i++) {a.unshift (c)}; return a.join('')}
function rpad (s,n,c) {var i; var a = s.split(''); for (i = 0; i < n - s.length; i++) {a.push (c)}; return a.join('')}

var regions = {
  "0": "Test networks",
  "2": "Europe",
  "3": "North America and the Caribbean",
  "4": "Asia and the Middle East",
  "5": "Oceania",
  "6": "Africa",
  "7": "South and Central America",
  "9": "Worldwide"
};

// PLMN encoding decoding
// Converts MCC MNC pair to a nibbled PLMN according to 3GPP TS 24.008 standard and vice versa (see section 10.5.1.13)
// http://www.etsi.org/deliver/etsi_ts/124000_124099/124008/08.06.00_60/ts_124008v080600p.pdf

function encMcc(mcc) {
  var mcc = rpad(mcc.toString(), 4, 'F').split('');
  return mcc[1] + mcc[0] + mcc[3] + mcc[2];
}

function encPlmn (mcc, mnc) {
  mcc = rpad(mcc.toString(), 3, 'F').split('');

  if (mnc.toString().length == 1) { mnc = '0' + mnc.toString() }
  mnc = rpad(mnc.toString(), 3, 'F').split('');
  
  return mcc[1] + mcc[0] + mnc[2] + mcc[2] + mnc[1] + mnc[0];
}

function decPlmn (plmn) {
  if (plmn.length < 6) {
    return "Error: plmn size lower than 6";
  } else {
    mcc = plmn[1] + plmn[0] + plmn[3];
    mnc = plmn[5] + plmn[4] + plmn[2];

    mcc = mcc.toUpperCase().replace('F','');
    mnc = mnc.toUpperCase().replace('F','');

    mccmnc = new Array();
    mccmnc[0] = mcc;
    mccmnc[1] = mnc;
    return [mccmnc];
  }
}

function getRegion(mcc) {
  return mcc ? regions[mcc[0]]: null
}

module.exports = {
  regions,
  encMcc,  
  encPlmn,
  decPlmn,
  getRegion
}