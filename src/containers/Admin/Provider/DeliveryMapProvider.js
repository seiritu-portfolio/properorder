import React, { useEffect, useState } from "react";
import { fMapData, jTownLists } from "../../../assets/data";
import {
  fMapData as fNiMapData,
  jTownLists as jNiTownLists,
} from "../../../assets/dataNI";
import {
  changeSel,
  handleFilter,
  handleToggleClick,
  savePrice,
} from "../../../services/DeliveryMapService";
import HelperService from "../../../utils/HelperService";
import Constants from "../../../config/Constants";

const tabs = {
  true: [
    { key: "Dublin", name: "Dublin City", region: "dublin" },
    { key: "E", name: "East" },
    { key: "Cork", name: "Cork" },
    { key: "SW", name: "Southwest" },
    { key: "W", name: "West" },
    { key: "U", name: "North" },
  ],
  false: [
    { key: "N", name: "North" },
    { key: "W", name: "West" },
    { key: "Belfast", name: "Belfast" },
    { key: "E", name: "East" },
    { key: "S", name: "South" },
  ],
};

export const DeliveryMapContext = React.createContext({
  mapData: {},
  initMapData: () => {},
  setMapIndex: () => {},
  isROI: () => {},
  getTowns: () => {},
  getRegionPrices: () => {},
  onToggleClick: () => {},
  onSearch: () => {},
  onSavePrice: () => {},
  onSaveTown: () => {},
  onSaveRegion: () => {},
  onToggleSel: () => {},
  getPrices: () => {},
  getTabs: () => {},
  originalData: [],
  setOriginalData: () => {},
  currentTab: tabs.true[0].key,
  setCurrentTab: () => {},
});

export const DeliveryMapProvider = (props) => {
  const [mapIndex, setMapIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState(tabs.true[0].key);
  const [originalData, setOriginalData] = useState([]);

  const [Towns, setTowns] = useState(JSON.parse(jTownLists));
  const [MapData, setMapData] = useState(JSON.parse(fMapData));

  const [niMapData, setNiMapData] = useState(JSON.parse(fNiMapData));
  const [niTowns, setNiTowns] = useState(JSON.parse(jNiTownLists));

  const Regions = MapData.regions;
  const [regionPrices, setRegionPrices] = useState(
    Regions.reduce((a, v) => ({ ...a, [v]: { price: null } }), {})
  );

  const NiRegions = niMapData.regions;
  const [niRegionPrices, setNiRegionPrices] = useState(
    NiRegions.reduce((a, v) => ({ ...a, [v]: { price: null } }), {})
  );

  const isROI = () => mapIndex === 0;

  const mapData = isROI() ? MapData : niMapData;
  const getTowns = () => (isROI() ? Towns : niTowns);
  const setMapTowns = (ts) => {
    isROI() ? setTowns(ts) : setNiTowns(ts);
  };
  const changeMapData = (md) => {
    isROI() ? setMapData(md) : setNiMapData(md);
  };
  const getRegionPrices = () => (isROI() ? regionPrices : niRegionPrices);
  const setMapRegionPrices = (ps) => {
    isROI() ? setRegionPrices(ps) : setNiRegionPrices(ps);
  };

  const onToggleClick = (isChecked) =>
    handleToggleClick(
      getTowns(),
      isChecked,
      setMapTowns,
      isROI() ? Regions : NiRegions,
      mapData.sel,
      mapData.of,
      mapData,
      changeMapData
    );

  const onSearch = (searchStr) =>
    handleFilter(getTowns(), searchStr, setMapTowns);

  const onSavePrice = (preItem, price) =>
    savePrice(
      preItem,
      price,
      getTowns(),
      setMapTowns,
      getRegionPrices(),
      setMapRegionPrices
    );

  const townEqual = (originalTown, localTown) => {
    if (originalTown?.postcode_id !== localTown?.code) {
      return false;
    }
    if (
      (originalTown?.delivery_fee
        ? Number(originalTown?.delivery_fee / 100)
        : 0) !== (localTown?.delivery_fee ? Number(localTown?.delivery_fee) : 0)
    ) {
      return false;
    }
    if (
      (originalTown?.free_delivery
        ? Number(originalTown?.free_delivery / 100)
        : 0) !==
      (localTown?.free_delivery ? Number(localTown?.free_delivery) : 0)
    ) {
      return false;
    }
    if (
      (originalTown?.minimum_delivery
        ? Number(originalTown?.minimum_delivery / 100)
        : 0) !==
      (localTown?.minimum_delivery ? Number(localTown?.minimum_delivery) : 0)
    ) {
      return false;
    }
    if ((originalTown?.collection ?? 0) !== (localTown?.collection ?? 0)) {
      return false;
    }
    return (originalTown?.delivery ?? 0) === (localTown?.delivery ?? 0);
  };

  const changedTown = (localTown) => {
    return (
      (localTown?.delivery_fee ? Number(localTown?.delivery_fee) : 0) !== 0 ||
      (localTown?.free_delivery ? Number(localTown?.free_delivery) : 0) !== 0 ||
      (localTown?.minimum_delivery
        ? Number(localTown?.minimum_delivery)
        : 0) !== 0 ||
      (localTown?.collection ?? 0) === 1 ||
      (localTown?.delivery ?? 0) === 1
    );
  };

  const onSaveTown = (town) => {
    const towns = getTowns();
    const stKey = Object.keys(towns).filter((t) =>
      towns[t].some((v) => v.code === town.code)
    )[0];
    const sTownList = towns[stKey];
    const newMapTowns = {
      ...towns,
      [stKey]: sTownList.map((t) =>
        t.code === town.code ? { ...t, ...town } : t
      ),
    };
    setMapTowns(newMapTowns);
    updateMapStatus(newMapTowns);
  };

  const updateMapStatus = (newMapTowns) => {
    if (
      getData(isROI() ? [newMapTowns, niTowns] : [Towns, newMapTowns]).some(
        (t1) => {
          const t2 = originalData.find((t) => t.postcode_id === t1.code);
          if (t2 == null) {
            return !!changedTown(t1);
          }
          return !townEqual(t2, t1);
        }
      )
    ) {
      window.sessionStorage.setItem(Constants.SS_DELIVERY_MAP_UPDATED, "Yes");
    } else {
      window.sessionStorage.setItem(Constants.SS_DELIVERY_MAP_UPDATED, "No");
    }
  };

  const onSaveRegion = (changedValue) => {
    const towns = getTowns();
    const currentRegion = tabs[isROI()].find((t) => t.key === currentTab);
    if (currentRegion) {
      const regionKey = (
        currentRegion.region ?? currentRegion.name
      ).toLowerCase();
      const newMapTowns = {
        ...towns,
        [`${regionKey}1`]: towns[`${regionKey}1`].map((t) => ({
          ...t,
          ...changedValue,
        })),
        [`${regionKey}2`]: towns[`${regionKey}2`].map((t) => ({
          ...t,
          ...changedValue,
        })),
      };
      setMapTowns(newMapTowns);
      updateMapStatus(newMapTowns);
    }
  };

  const onToggleSel = (town, code, b) => {
    changeSel(
      town,
      code,
      b,
      getTowns(),
      setMapTowns,
      mapData.sel,
      mapData.of,
      mapData,
      changeMapData
    );
  };

  const initMapData = (roi, prices) => {
    let ts = roi ? Towns : niTowns;
    const Sel = roi ? MapData.sel : niMapData.sel;
    const Of = roi ? MapData.of : niMapData.of;
    const keys = Object.keys(ts);
    let newTowns = {};
    for (let i = 0; i < keys.length; i++) {
      const town = ts[keys[i]];
      let newTown = [];
      town.forEach((t) => {
        const price = prices.find((p) => p.postcode_id === t.code);
        if (price != null) {
          newTown.push({
            ...t,
            ...price,
            delivery_fee: Number(price.delivery_fee) / 100,
            free_delivery: Number(price.free_delivery) / 100,
            minimum_delivery: Number(price.minimum_delivery) / 100,
          });
          // if (price.delivery_fee === "0.00") {
          //   newTown.push({ ...t, sel: true });
          //   // const reg = t.region;
          //   // Sel[t.region] += 1;
          //   // const comp = HelperService.ge("cb_" + reg);
          //   // if (comp != null) {
          //   //   comp.checked = Sel[reg] === Of[reg];
          //   // }
          // } else {
          //   newTown.push({ ...t, price: Number(price.delivery_fee) / 100 });
          // }
        } else {
          newTown.push(t);
        }
      });
      newTowns = { ...newTowns, [keys[i]]: newTown };
    }
    if (roi) {
      setTowns(newTowns);
      setMapData({ ...MapData, Sel });
    } else {
      setNiTowns(newTowns);
      setNiMapData({ ...niMapData, Sel });
    }
  };

  const getPrices = () => {
    let r = {};
    let index = 0;

    [Towns, niTowns].forEach((ts) => {
      const keys = Object.keys(ts);
      for (let i = 0; i < keys.length; i++) {
        const town = ts[keys[i]];
        town.forEach((t) => {
          if ((t.collection ?? 0) !== 0 && (t.delivery ?? 0) !== 0) {
            r = {
              ...r,
              [`postcodes[${index}][id]`]: t.code,
              [`postcodes[${index}][delivery_fee]`]: (
                Number(t.delivery_fee ?? 0) * 100
              ).toFixed(0),
              [`postcodes[${index}][free_delivery]`]: (
                Number(t.free_delivery ?? 0) * 100
              ).toFixed(0),
              [`postcodes[${index}][minimum_delivery]`]: (
                Number(t.minimum_delivery ?? 0) * 100
              ).toFixed(0),
              [`postcodes[${index}][collection]`]: t.collection ?? 0,
              [`postcodes[${index}][delivery]`]: t.delivery ?? 0,
            };
          }

          index++;
        });
      }
    });
    return r;
  };

  const getData = (newMapTowns) => {
    let r = [];

    newMapTowns.forEach((ts) => {
      const keys = Object.keys(ts);
      for (let i = 0; i < keys.length; i++) {
        const town = ts[keys[i]];
        town.forEach((t) => {
          r.push(t);
        });
      }
    });
    return r;
  };

  // useEffect(() => {
  //   const Sel = mapData.sel;
  //   const Of = mapData.of;
  //   for (const reg of Object.keys(Sel)) {
  //     const selectAll = HelperService.ge("cb_" + reg);
  //     if (selectAll) {
  //       selectAll.checked = Sel[reg] === Of[reg];
  //     }
  //   }
  // }, [mapData]);

  useEffect(() => {
    setCurrentTab(tabs[isROI()][0].key);
  }, [mapIndex]);

  return (
    <DeliveryMapContext.Provider
      value={{
        mapData,
        setMapIndex,
        isROI,
        getTowns,
        getRegionPrices,
        onToggleClick,
        onSearch,
        onSavePrice,
        onSaveTown,
        onSaveRegion,
        onToggleSel,
        initMapData,
        getPrices,
        getTabs: () => tabs[isROI()],
        originalData,
        setOriginalData,
        currentTab,
        setCurrentTab,
      }}
    >
      {props.children}
    </DeliveryMapContext.Provider>
  );
};

export const useDeliveryMap = () => React.useContext(DeliveryMapContext);
