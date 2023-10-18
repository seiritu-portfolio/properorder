import HelperService from "../utils/HelperService";

export function handleFilter(nTowns, searchStr, callback) {
  let newTowns = { ...nTowns };
  Object.keys(newTowns).forEach((t) => {
    newTowns[t] = newTowns[t].map((ts) => {
      if (searchStr === "") {
        return { ...ts, filtered: false };
      } else {
        return {
          ...ts,
          filtered:
            ts.code.toLowerCase().includes(searchStr) ||
            ts.region.toLowerCase().includes(searchStr) ||
            ts.town.toLowerCase().includes(searchStr),
        };
      }
    });
  });
  callback(newTowns);
}

export function savePrice(
  preItem,
  price,
  Towns,
  setTowns,
  regionPrices,
  setRegionPrices
) {
  if (preItem.town) {
    const town = preItem.town;
    const stKey = Object.keys(Towns).filter((t) =>
      Towns[t].some((v) => v.code === town.code)
    )[0];
    const sTownList = Towns[stKey];
    setTowns({
      ...Towns,
      [stKey]: sTownList.map((t) =>
        t.code === town.code ? { ...t, price } : t
      ),
    });
  } else {
    const regionKey = Object.keys(preItem)[0];
    const stList = Object.keys(Towns).filter((t) =>
      Towns[t].some((v) => v.region === regionKey)
    );
    let newTowns = { ...Towns };
    stList.forEach((stKey) => {
      const sTownList = Towns[stKey];
      newTowns = {
        ...newTowns,
        [stKey]: sTownList.map((t) => ({ ...t, price })),
      };
    });
    setTowns(newTowns);
  }
}

export function changeSel(
  town,
  code,
  b,
  Towns,
  setTowns,
  Sel,
  Of,
  MapData,
  setMapData
) {
  let isChecked = b;

  const stKeys = Object.keys(Towns).filter((t) =>
    Towns[t].some((v) => (town ? v.code === code : v.region === code))
  );

  let newTowns = { ...Towns };
  stKeys.forEach((stKey) => {
    const sTownList = Towns[stKey];

    newTowns = {
      ...newTowns,
      [stKey]: sTownList.map((t) => {
        if (!town) {
          return { ...t, sel: b };
        }
        if (t.code !== code) {
          return t;
        }
        isChecked = !t.sel;
        return { ...t, sel: !t.sel };
      }),
    };
  });

  setTowns(newTowns);

  const reg = town ? Towns[stKeys[0]][0].region : code;
  if (town) Sel[reg] += isChecked ? 1 : -1;
  else Sel[reg] = isChecked ? Of[reg] : 0;
  // const selectAll = HelperService.ge("cb_" + reg);
  // if (selectAll) {
  //   selectAll.checked = Sel[reg] === Of[reg];
  // }
  setMapData({ ...MapData, Sel });
}

export function handleToggleClick(
  Towns,
  isChecked,
  setTowns,
  Regions,
  Sel,
  Of,
  MapData,
  setMapData
) {
  let newTowns = { ...Towns };
  Object.keys(Towns).forEach((stKey) => {
    const sTownList = Towns[stKey];
    newTowns = {
      ...newTowns,
      [stKey]: sTownList.map((t) => ({ ...t, sel: isChecked })),
    };
  });
  setTowns(newTowns);
  for (let i = 0; i < Regions.length; i++) {
    const code = Regions[i];
    Sel[code] = isChecked ? Of[code] : 0;
    // const selectAll = HelperService.ge("cb_" + code);
    // if (selectAll) {
    //   selectAll.checked = Sel[code] === Of[code];
    // }
  }

  setMapData({ ...MapData, Sel });
}
