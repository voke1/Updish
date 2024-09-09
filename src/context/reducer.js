import {
  FETCH_VEHICLE_LOADING,
  FETCH_VEHICLE_SUCCESS,
  FETCH_VEHICLE_FAILED,
  SEARCH_VEHICLE_SUCCESS,
  SEARCH_VEHICLE_FAILED,
  SELECT_VEHICLE,
  IS_SEARCH_VEHICLE,
  IS_FETCH_MORE,
  VALIDATE_VEHICLE,
  CLEAR_VEHICLE,
  AUTO_FILL_VEHICLE,
  IS_AUTOFILLING,
} from "./action";

const VehicleReducer = (state, action) => {
  switch (action.type) {
    case FETCH_VEHICLE_LOADING:
      return {
        ...state,
        vehicleLoading: true,
        searchedVehicleErrMsg: "",
        isSearchVehicle: false,
        isAutoFilling: false,
      };
    case FETCH_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicleLoading: false,
        vehicles: action.payload.vehicles,
        fetchVehicleErrMsg: {},
        vehiclePagination: action.payload.pagination,
        searchedVehicles: [],
        searchedVehicleErrMsg: "",
        isFetchMore: false,
      };

    case FETCH_VEHICLE_FAILED:
      return {
        ...state,
        vehicleLoading: false,
        fetchVehicleErrMsg: { msg: action.payload, type: "bad" },
        isFetchMore: false,
      };

    case SELECT_VEHICLE:
      let searchedVehicles;
      let allvehicles;
      let transpoter;
      let KMReading;
      const { isSearch, number } = action.payload;
      if (isSearch) {
        // set all searched vehicles selected to false
        searchedVehicles = state.searchedVehicles.map((obj) => ({
          ...obj,
          selected: false,
        }));
        // fetch for vehicle number
        let vehicleNumber = searchedVehicles.find(
          (vehicle) => vehicle.truckNumber === number
        );
        // set vehicleNumber selected to true
        vehicleNumber.selected = !vehicleNumber.selected;

        // set transporter name
        transpoter = vehicleNumber.transporterName;

        //set last service KM
        KMReading = vehicleNumber.kilometerReading;
      } else {
        // set all vehicles selected to false
        allvehicles = state.vehicles.map((obj) => ({
          ...obj,
          selected: false,
        }));
        // fetch for vehicle number
        let vehicleNumber = allvehicles.find(
          (vehicle) => vehicle.truckNumber === number
        );
        // set vehicleNumber selected to true
        if (vehicleNumber) {
          vehicleNumber.selected = !vehicleNumber.selected;
        }

        // set transporter name
        transpoter = vehicleNumber.transporterName;

        //set last service KM
        KMReading = vehicleNumber.kilometerReading;
      }
      return {
        ...state,
        vehicles: isSearch ? state.vehicles : allvehicles,
        searchedVehicles: isSearch ? searchedVehicles : state.searchedVehicles,
        vehicle: { number, transpoter, KMReading },
        searchedVehicleErrMsg: "",
      };
    case AUTO_FILL_VEHICLE:
      return {
        ...state,
        vehicle: {
          number: action.payload.truckNumber,
          transpoter: action.payload.transporterName,
          KMReading: action.payload.kilometerReading,
        },
        isAutoFilling: false,
      };
    case IS_AUTOFILLING:
      return {
        ...state,
        vehicle: { number: "", transporter: "", KMReading: "" },
        isAutoFilling: action.payload,
      };
    case IS_SEARCH_VEHICLE:
      return {
        ...state,
        isSearchVehicle: action.payload,
        vehicleLoading: true,
      };
    case SEARCH_VEHICLE_SUCCESS:
      return {
        ...state,
        searchedVehicles: action.payload.vehicles,
        vehicleLoading: false,
        searchedVehicleErrMsg: "",
        searchedVehiclePagination: action.payload.pagination,
        searchedValue: action.payload.searchedValue,
        isFetchMore: false,
      };
    case SEARCH_VEHICLE_FAILED:
      return {
        ...state,
        searchedVehicleErrMsg: action.payload,
        vehicleLoading: false,
        searchedVehicles: [],
        searchedVehiclePagination: {},
        isFetchMore: false,
      };

    case IS_FETCH_MORE:
      return {
        ...state,
        isFetchMore: true,
      };

    case VALIDATE_VEHICLE:
      return {
        ...state,
        vehicleError: action.payload,
      };
    case CLEAR_VEHICLE:
      return {
        ...state,
        vehicle: { number: "", transporter: "", KMReading: "" },
      };
    default:
      return state;
  }
};

export default VehicleReducer;
