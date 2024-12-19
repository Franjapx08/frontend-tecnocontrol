import api from "./httpClient";

export default {
  units(params) {
    return api.get("units" + params);
  },
  exportUnits(params){
    return api.get("units" + params, {
      responseType: "blob",
    });
  }
};
