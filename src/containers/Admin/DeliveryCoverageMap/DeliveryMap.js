import React, { useEffect, useState } from "react";
import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDeliveryMap } from "../Provider/DeliveryMapProvider";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { Button, makeStyles } from "@material-ui/core";
import { classNames } from "../CreateProduct/classes";
import clsx from "clsx";
import { useParams, Prompt } from "react-router-dom";
import { useHeader } from "../Provider/HeaderProvider";
import APIManager from "../../../Network/APIManager";
import history from "../../../routes/history";
import Constants from "../../../config/Constants";
import * as adminActions from "../../../redux/AdminSaga/actions";
import { connect } from "react-redux";
import HelperService from "../../../utils/HelperService";
import PODecimalUtil from "../../../utils/PODecimalUtil";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";

const useStyle = makeStyles((theme) => ({
  previewBtn: {
    paddingLeft: "0.7rem",
    paddingRight: "0.7rem",
    height: "2rem",
    fontWeight: "500",
    fontSize: "0.8rem",
    borderRadius: "0.4rem",
    border: "1px solid #BFBFC6",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#FFFEFC",
    },
  },
  saveChangesBtn: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    height: "2.1rem",
    fontWeight: "700",
    fontSize: "1rem",
    borderRadius: "0.4rem",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  },
}));

function className(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DeliveryMap(props) {
  const btnClass = useStyle();

  const { orgId, sellerIndex } = useParams();
  const { searchString } = useHeader();

  const [selectedTown, setSelectedTown] = useState();
  const [deliveryFee, setDeliveryFee] = useState("");
  const [freeDelivery, setFreeDelivery] = useState("");
  const [minimumDelivery, setMinimumDelivery] = useState("");

  const {
    mapData,
    initMapData,
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
    getPrices,
    getTabs,
    currentTab,
    setCurrentTab,
    setOriginalData,
  } = useDeliveryMap();

  const Sel = mapData.sel;
  const Of = mapData.of;
  const Total = mapData.total;

  const [preItem, setPreItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const [alertInfo, setAlertInfo] = useState({ open: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.sessionStorage.removeItem(Constants.SS_DELIVERY_MAP_UPDATED);
  }, []);

  useEffect(() => {
    if (sellerIndex !== -1) {
      reload();
    }
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  const reload = () => {
    APIManager.fetchPrices(sellerIndex).then((res) => {
      setOriginalData(res.data);
      initMapData(true, res.data);
      initMapData(false, res.data);
    });
  };

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(`/admin/${orgId}/site/${props.sellerIndex.id}/delivery-map`);
    }
  }, [props.sellerIndex]);

  useEffect(() => {
    onSearch(searchString.toLowerCase().trim());
  }, [searchString, mapData]);

  const handleSavePrice = (price) => {
    setModalVisible(false);
    onSavePrice(preItem, price);
  };

  const handleChangedTown = (town) => {
    onSaveTown(town);
  };

  const handleChangedRegion = (changedValue) => {
    onSaveRegion(changedValue);
  };

  const onClickPrice = (e, item, defaultPrice) => {
    e.stopPropagation();
    localStorage.setItem(
      Constants.AS_DEFAULT_REGION_PRICE,
      JSON.stringify(defaultPrice)
    );
    setPreItem({ town: item });
    setModalVisible(true);
  };

  const onClickRPrice = (item) => {
    setPreItem(item);
    setModalVisible(true);
  };

  const cbRegionToggleClick = (e) => {
    const cb = e.target;
    const a = cb.id.split("_");
    if (a.length === 0) {
      return;
    }
    onToggleSel(false, a[1], cb.checked);
  };

  const cbTotalToggleClick = (e) => {
    const isChecked = e.target.checked;
    onToggleClick(isChecked);
  };

  const exportSelected = () => {
    setIsLoading(true);
    APIManager.updatePrices(sellerIndex, getPrices())
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setAlertInfo({
          open: true,
          message: "Updated successfully!",
        });
        window.sessionStorage.removeItem(Constants.SS_DELIVERY_MAP_UPDATED);
        setSelectedTown(null);
        reload();
      })
      .catch((error) => {
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: error,
          severity: "warning",
        });
      });
  };

  const total = isROI()
    ? Sel.U + Sel.W + Sel.SW + Sel.Cork + Sel.Dublin + Sel.E
    : Sel.N + Sel.S + Sel.E + Sel.W + Sel.Belfast;

  const currentRegion = getTabs().find((t) => t.key === currentTab);
  let towns = [];
  if (currentRegion) {
    const regionKey = (
      currentRegion.region ?? currentRegion.name
    ).toLowerCase();
    towns = [...getTowns()[`${regionKey}1`], ...getTowns()[`${regionKey}2`]];
  }

  const handleSelectedTown = (selTown) => {
    setSelectedTown(selTown);
    const code = selTown.code;
    const stKeys = Object.keys(getTowns()).filter((t) =>
      getTowns()[t].some((v) => v.code === code)
    );
    if (stKeys.length === 1) {
      const stKey = stKeys[0];
      const tab = getTabs().find((t) =>
        stKey.includes((t.region ? t.region : t.name).toLowerCase())
      );
      if (tab) {
        setCurrentTab(tab.key);
        setTimeout(() => {
          const selEle = HelperService.ge(selTown.code);
          if (selEle) {
            selEle.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
    }
  };

  const getTownColor = (town) => {
    if (town == null) {
      return "";
    }
    if (town.collection === 1 && town.delivery === 1) {
      return "both";
    }
    if (town.collection === 1) {
      return "only-collection";
    }
    if (town.delivery === 1) {
      return "only-delivery";
    }
    return "";
  };

  return (
    <div
      className="flex-1 focus:outline-none bg-gray-100 mb-4"
      style={{ minWidth: 1400 }}
    >
      <main className="grid grid-cols-2 gap-6 mt-6">
        <div className="ml-4">
          <p className="text-po-black text-base font-medium">
            Set collection & delivery coverage by selecting postal areas in the
            table or map
          </p>
          <div className="mt-4 bg-white border-gray-300 rounded-lg shadow">
            <div>
              {/*<div className="sm:hidden">*/}
              {/*  /!* Use an "onChange" listener to redirect the user to the selected tab URL. *!/*/}
              {/*  <select*/}
              {/*    id="tabs"*/}
              {/*    name="tabs"*/}
              {/*    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"*/}
              {/*    defaultValue={currentTab}*/}
              {/*  >*/}
              {/*    {tabs.map((tab) => (*/}
              {/*      <option key={tab.key}>{tab.name}</option>*/}
              {/*    ))}*/}
              {/*  </select>*/}
              {/*</div>*/}
              <nav
                className="relative z-0 rounded-lg shadow-md flex divide-x divide-gray-200"
                aria-label="Tabs"
              >
                {getTabs().map((tab, tabIdx) => (
                  <a
                    key={tab.key}
                    href={"#"}
                    className={className(
                      tab.key === currentTab
                        ? "text-po-black font-bold"
                        : "text-gray-500 hover:text-gray-700",
                      tabIdx === 0 ? "rounded-l-lg" : "",
                      tabIdx === getTabs().length - 1 ? "rounded-r-lg" : "",
                      "group flex justify-center relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-1 text-sm font-medium text-center hover:bg-gray-100 focus:z-10"
                    )}
                    onClick={(event) => {
                      event.preventDefault();
                      setCurrentTab(tab.key);
                    }}
                    aria-current={tab.key === currentTab ? "page" : undefined}
                  >
                    <span className="self-center">{tab.name}</span>
                    <span
                      aria-hidden="true"
                      className={className(
                        tab.key === currentTab
                          ? "bg-po-yellowlight"
                          : "bg-transparent",
                        "absolute inset-x-0 bottom-0 h-1"
                      )}
                    />
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-col mx-3 divide-y mt-2">
              <div className={"flex flex-col"}>
                <div
                  className={"flex flex-row pt-2 items-center justify-between"}
                >
                  <span className={"font-bold text-lg"}>
                    Edit all {currentRegion ? currentRegion.name : ""}
                  </span>
                </div>
                <div
                  className={
                    "flex flex-row my-4 self-center divide-x rounded border"
                  }
                >
                  <div
                    className={"flex flex-col delivery-map-edit-all-collect"}
                  >
                    <span
                      className={"font-medium text-sm bg-gray-100 px-2 py-1"}
                    >
                      Collection
                    </span>
                    <Checkbox
                      color={"secondary"}
                      name={"Select"}
                      checked={towns.every((town) => town.collection === 1)}
                      onClick={(e) => {
                        const isAlreadyChecked = towns.every(
                          (town) => town.collection === 1
                        );
                        handleChangedRegion({
                          collection: isAlreadyChecked ? 0 : 1,
                        });
                      }}
                    />
                  </div>
                  <div
                    className={"flex flex-col delivery-map-edit-all-deliver"}
                  >
                    <span
                      className={"font-medium text-sm bg-gray-100 px-2 py-1"}
                    >
                      Delivery
                    </span>
                    <Checkbox
                      color={"secondary"}
                      name={"Select"}
                      checked={towns.every((town) => town.delivery === 1)}
                      onClick={(e) => {
                        const isAlreadyChecked = towns.every(
                          (town) => town.delivery === 1
                        );
                        handleChangedRegion({
                          delivery: isAlreadyChecked ? 0 : 1,
                        });
                      }}
                    />
                  </div>
                  <div
                    className={
                      "flex flex-col delivery-map-edit-all-delivery-fee"
                    }
                  >
                    <span
                      className={"font-medium text-sm bg-gray-100 px-2 py-1"}
                    >
                      Delivery Fee
                    </span>
                    <div className="flex flex-row p-2">
                      <p className={classNames.priceLabel}>€</p>
                      <input
                        type="number"
                        className={
                          "text-sm w-14 h-7 rounded border border-po-graymedium px-3 py-2"
                        }
                        value={deliveryFee}
                        onChange={(e) =>
                          setDeliveryFee(
                            PODecimalUtil.inputDecimalString(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={
                      "flex flex-col delivery-map-edit-all-free-delivery"
                    }
                  >
                    <span
                      className={"font-medium text-sm bg-gray-100 px-2 py-1"}
                    >
                      Free Delivery
                    </span>
                    <div className="flex flex-row p-2">
                      <p className={classNames.priceLabel}>€</p>
                      <input
                        type="number"
                        className={
                          "text-sm w-14 h-7 rounded border border-po-graymedium px-3 py-2"
                        }
                        value={freeDelivery}
                        onChange={(e) =>
                          setFreeDelivery(
                            PODecimalUtil.inputDecimalString(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={
                      "flex flex-col delivery-map-edit-all-minimum-delivery"
                    }
                  >
                    <span
                      className={"font-medium text-sm bg-gray-100 px-2 py-1"}
                    >
                      Minimum del.
                    </span>
                    <div className="flex flex-row p-2">
                      <p className={classNames.priceLabel}>€</p>
                      <input
                        type="number"
                        className={
                          "text-sm w-14 h-7 rounded border border-po-graymedium px-3 py-2"
                        }
                        value={minimumDelivery}
                        onChange={(e) =>
                          setMinimumDelivery(
                            PODecimalUtil.inputDecimalString(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={"flex flex-row mb-3 self-center"}>
                  <div
                    className={
                      "flex justify-center delivery-map-edit-all-collect"
                    }
                  >
                    {/*<Button*/}
                    {/*  variant="contained"*/}
                    {/*  color="secondary"*/}
                    {/*  className={btnClass.saveChangesBtn}*/}
                    {/*  //onClick=*/}
                    {/*>*/}
                    {/*  Save*/}
                    {/*</Button>*/}
                  </div>
                  <div
                    className={
                      "flex justify-center delivery-map-edit-all-deliver"
                    }
                  >
                    {/*<Button*/}
                    {/*  variant="contained"*/}
                    {/*  color="secondary"*/}
                    {/*  className={btnClass.saveChangesBtn}*/}
                    {/*  //onClick=*/}
                    {/*>*/}
                    {/*  Save*/}
                    {/*</Button>*/}
                  </div>
                  <div
                    className={
                      "flex justify-center delivery-map-edit-all-delivery-fee"
                    }
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      className={btnClass.saveChangesBtn}
                      onClick={() => {
                        handleChangedRegion({ delivery_fee: deliveryFee });
                        setDeliveryFee("");
                      }}
                      disabled={deliveryFee === ""}
                    >
                      Apply
                    </Button>
                  </div>
                  <div
                    className={
                      "flex justify-center delivery-map-edit-all-free-delivery"
                    }
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      className={btnClass.saveChangesBtn}
                      onClick={() => {
                        handleChangedRegion({ free_delivery: freeDelivery });
                        setFreeDelivery("");
                      }}
                      disabled={freeDelivery === ""}
                    >
                      Apply
                    </Button>
                  </div>
                  <div
                    className={
                      "flex justify-center delivery-map-edit-all-minimum-delivery"
                    }
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      className={btnClass.saveChangesBtn}
                      onClick={() => {
                        handleChangedRegion({
                          minimum_delivery: minimumDelivery,
                        });
                        setMinimumDelivery("");
                      }}
                      disabled={minimumDelivery === ""}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={
                  "flex flex-row pt-2 items-center justify-between mb-2"
                }
              >
                <span className={"font-bold text-lg"}>
                  Edit individual {currentRegion ? currentRegion.name : ""}
                </span>
                <Button
                  variant="contained"
                  color="secondary"
                  className={btnClass.saveChangesBtn}
                  onClick={() => exportSelected()}
                  disabled={
                    window.sessionStorage.getItem(
                      Constants.SS_DELIVERY_MAP_UPDATED
                    ) !== "Yes"
                  }
                >
                  Save changes
                </Button>
              </div>
              {/*<FormControlLabel*/}
              {/*  control={*/}
              {/*    <Checkbox*/}
              {/*      id={`cb_${currentRegion?.key ?? ""}`}*/}
              {/*      color={"secondary"}*/}
              {/*      name={"Select"}*/}
              {/*    />*/}
              {/*  }*/}
              {/*  checked={*/}
              {/*    currentRegion == null*/}
              {/*      ? false*/}
              {/*      : Sel[currentRegion.key] === Of[currentRegion.key]*/}
              {/*  }*/}
              {/*  label={`Select all (${towns.length})`}*/}
              {/*  onClick={cbRegionToggleClick}*/}
              {/*/>*/}
            </div>
            <div>
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-300 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th
                              scope="col"
                              className="db-order-th font-semibold"
                            >
                              Postal key
                            </th>
                            <th scope="col" className="db-order-th">
                              Town
                            </th>
                            <th scope="col" className="db-order-th">
                              Collection
                            </th>
                            <th scope="col" className="db-order-th">
                              Delivery
                            </th>
                            <th scope="col" className="db-order-th">
                              Del. fee
                            </th>
                            <th scope="col" className="db-order-th">
                              Free del.
                            </th>
                            <th scope="col" className="db-order-th">
                              Minimum del.
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-x divide-gray-200">
                          {towns.map((town, index) => {
                            return (
                              <tr
                                key={`${town.code}`}
                                id={`${town.code}`}
                                onClick={() => {
                                  // onToggleSel(true, town.code, true);
                                  setSelectedTown(town);
                                }}
                                className={clsx(
                                  town.code,
                                  town.region,
                                  "townCell",
                                  // regionPrices[town.region].price &&
                                  //   "region-price",
                                  town.price &&
                                    Number(town.price) !== 0 &&
                                    "price",
                                  town.filtered && "filtered",
                                  selectedTown?.code === town.code && "sel",
                                  getTownColor(town)
                                )}
                              >
                                <td
                                  className={
                                    "px-3 py-2 whitespace-nowrap text-sm text-po-black"
                                  }
                                >
                                  {town.code}
                                </td>
                                <td
                                  className={
                                    "px-3 py-2 whitespace-nowrap text-sm text-po-black"
                                  }
                                >
                                  {town.town}
                                </td>
                                <td
                                  className={
                                    "px-3 py-2 whitespace-nowrap text-sm text-po-black"
                                  }
                                >
                                  <div className="relative flex items-start justify-center">
                                    <div className="flex items-center justify-center h-5">
                                      <input
                                        id="collection"
                                        name="collection"
                                        type="checkbox"
                                        className="focus:ring-po-graymain h-4 w-4 text-po-graymain border-gray-300 rounded"
                                        checked={town.collection === 1}
                                        onClick={(event) =>
                                          event.stopPropagation()
                                        }
                                        onChange={(e) =>
                                          handleChangedTown({
                                            ...town,
                                            collection: e.target.checked
                                              ? 1
                                              : 0,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td
                                  className={
                                    "px-3 py-2 whitespace-nowrap text-sm text-po-black"
                                  }
                                >
                                  <div className="relative flex items-start justify-center">
                                    <div className="flex items-center justify-center h-5">
                                      <input
                                        id="delivery"
                                        name="delivery"
                                        type="checkbox"
                                        className="focus:ring-po-graymain h-4 w-4 text-po-graymain border-gray-300 rounded"
                                        checked={town.delivery === 1}
                                        onClick={(event) =>
                                          event.stopPropagation()
                                        }
                                        onChange={(e) =>
                                          handleChangedTown({
                                            ...town,
                                            delivery: e.target.checked ? 1 : 0,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td
                                  className={"px-3 py-2 text-sm text-po-black"}
                                >
                                  <div className="flex flex-row ">
                                    <p className={classNames.priceLabel}>€</p>
                                    <input
                                      id={`delivery_fee`}
                                      type="number"
                                      className={
                                        "text-sm w-14 h-7 rounded border border-po-graymedium px-3 py-2"
                                      }
                                      value={town.delivery_fee ?? 0}
                                      onClick={(event) =>
                                        event.stopPropagation()
                                      }
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        handleChangedTown({
                                          ...town,
                                          delivery_fee:
                                            PODecimalUtil.inputDecimalString(
                                              e.target.value
                                            ),
                                        });
                                      }}
                                    />
                                  </div>
                                </td>
                                <td
                                  className={"px-3 py-2 text-sm text-po-black"}
                                >
                                  <div className="flex flex-row">
                                    <p className={classNames.priceLabel}>€</p>
                                    <input
                                      id={`free_delivery`}
                                      type="number"
                                      className={
                                        "text-sm w-14 h-7 rounded border border-po-graymedium px-2 py-1"
                                      }
                                      value={town.free_delivery ?? 0}
                                      onClick={(event) =>
                                        event.stopPropagation()
                                      }
                                      onChange={(e) =>
                                        handleChangedTown({
                                          ...town,
                                          free_delivery:
                                            PODecimalUtil.inputDecimalString(
                                              e.target.value
                                            ),
                                        })
                                      }
                                    />
                                  </div>
                                </td>
                                <td
                                  className={"px-3 py-2 text-sm text-po-black"}
                                >
                                  <div className="flex flex-row">
                                    <p className={classNames.priceLabel}>€</p>
                                    <input
                                      id={`minimum_delivery`}
                                      type="number"
                                      className={
                                        "text-sm w-14 h-7 rounded border border-po-graymedium px-2 py-1"
                                      }
                                      value={town.minimum_delivery ?? 0}
                                      onClick={(event) =>
                                        event.stopPropagation()
                                      }
                                      onChange={(e) =>
                                        handleChangedTown({
                                          ...town,
                                          minimum_delivery:
                                            PODecimalUtil.inputDecimalString(
                                              e.target.value
                                            ),
                                        })
                                      }
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map section on the right*/}
        <div
          className="flex flex-col"
          onClick={() => {
            setSelectedTown(null);
          }}
        >
          <div className="flex flex-col items-center">
            <div className={"flex flex-row bg-po-graylight rounded border"}>
              <button
                className={clsx(
                  "px-8 py-1 rounded items-center justify-center",
                  isROI() && "bg-black"
                )}
                onClick={() => setMapIndex(0)}
              >
                <span
                  className={clsx(
                    "font-semibold",
                    isROI() ? "text-white" : "text-po-graydark"
                  )}
                >
                  Ireland (ROI)
                </span>
              </button>
              <button
                className={clsx(
                  "px-8 py-1 rounded items-center justify-center",
                  !isROI() && "bg-black"
                )}
                onClick={() => setMapIndex(1)}
              >
                <span
                  className={clsx(
                    "font-semibold",
                    !isROI() ? "text-white" : "text-po-graydark"
                  )}
                >
                  Northern Ireland
                </span>
              </button>
            </div>
            {/*<label className="flex items-center justify-center text-sm font-bold w-40 mt-8">*/}
            {/*  <span className="ml-2">*/}
            {/*    Selected ({currentRegion ? Sel[currentRegion.key] : 0}/*/}
            {/*    {currentRegion ? Of[currentRegion.key] : 0})*/}
            {/*  </span>*/}
            {/*</label>*/}
          </div>
          <div className="flex justify-center items-start mb-6 mt-16 sticky top-4">
            <svg width="600" height="557" id="svgOther">
              {Object.keys(mapData.r).map((map, index) => (
                <g key={`${index}`}>
                  {mapData.r[map].map((item, i) => {
                    const defaultPrice =
                      getRegionPrices()[item.region].price ?? 0;
                    let town;
                    for (const tk of Object.keys(getTowns())) {
                      const t = getTowns()[tk].find((t) => t.code === item.k);
                      if (t != null) {
                        town = t;
                      }
                    }
                    return (
                      <polygon
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!item.skip) {
                            handleSelectedTown({ code: item.k });
                          }
                        }}
                        points={item.c}
                        className={clsx(
                          item.k,
                          item.region,
                          { skip: item.skip },
                          "poly",
                          Object.keys(getTowns()).some((tk) =>
                            getTowns()[tk].some(
                              (t) =>
                                t.code === item.k &&
                                t.price &&
                                Number(t.price) !== Number(defaultPrice)
                            )
                          ) && "price",
                          Object.keys(getTowns()).some((tk) =>
                            getTowns()[tk].some(
                              (t) =>
                                t.code === item.k &&
                                t.code === selectedTown?.code
                            )
                          ) && "sel",
                          Object.keys(getTowns()).some((tk) =>
                            getTowns()[tk].some(
                              (t) => t.code === item.k && t.filtered
                            )
                          ) && "filtered",
                          getRegionPrices()[item.region].price &&
                            "region-price",
                          getTownColor(town)
                        )}
                      >
                        <title>
                          {item.k} {item.descr}
                        </title>
                      </polygon>
                    );
                  })}
                </g>
              ))}

              {isROI() ? (
                <>
                  <polygon
                    id="svg-roi"
                    points="445,85 585,85 585,280 470,305 395,260"
                    style={{ fill: "none", stroke: "grey", strokeWidth: 2 }}
                  />

                  <circle
                    cx="215"
                    cy="505"
                    r="48"
                    stroke="grey"
                    style={{ fill: "none", strokeWidth: 2 }}
                  />
                </>
              ) : (
                <polygon
                  id="svg-ni"
                  points="425,165 475,85 597,95 597,190 540,240 500,220 458,175 425,170 385,200"
                  style={{ fill: "none", stroke: "grey", strokeWidth: 2 }}
                />
              )}
            </svg>
          </div>
        </div>
      </main>
      <POAlert
        alertInfo={alertInfo}
        className={"mt-16"}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
      <Prompt
        when={
          window.sessionStorage.getItem(Constants.SS_DELIVERY_MAP_UPDATED) ===
          "Yes"
        }
        message="You have unsaved changes, are you sure you want to leave?"
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  sellerIndex: state.Admin.sellerIndex,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryMap);
