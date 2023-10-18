import React, { useEffect, useState } from "react";
import "./styles.scss";
import RegionList from "./RegionList";
import clsx from "clsx";
import POModal from "../../../components/POModal";
import ChoosePrice from "./ChoosePrice";
import { useHeader } from "../Provider/HeaderProvider";
import { useDeliveryMap } from "../Provider/DeliveryMapProvider";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import Constants from "../../../config/Constants";
import { useParams } from "react-router-dom";
import * as adminActions from "../../../redux/AdminSaga/actions";
import history from "../../../routes/history";

function DeliveryMainMap(props) {
  const { orgId, sellerIndex } = useParams();
  const { searchString } = useHeader();
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
    onToggleSel,
    getPrices,
  } = useDeliveryMap();

  const Sel = mapData.sel;
  const Of = mapData.of;
  const Total = mapData.total;

  const [preItem, setPreItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const [alertInfo, setAlertInfo] = useState({ open: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sellerIndex !== -1) {
      APIManager.fetchPrices(sellerIndex).then((res) => {
        initMapData(true, res.data);
        initMapData(false, res.data);
      });
    }
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(`/admin/${orgId}/site/${props.sellerIndex.id}/dashboard`);
    }
  }, [props.sellerIndex]);

  useEffect(() => {
    onSearch(searchString.toLowerCase().trim());
  }, [searchString, mapData]);

  const handleSavePrice = (price) => {
    setModalVisible(false);
    onSavePrice(preItem, price);
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
    onToggleSel(false, a[1], cb.checked);
  };

  const cbTotalToggleClick = (e) => {
    const isChecked = e.target.checked;
    onToggleClick(isChecked);
  };

  const exportSelected = () => {
    setIsLoading(true);
    const prices = getPrices();
    console.log(prices);
    APIManager.updatePrices(sellerIndex, prices)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setAlertInfo({
          open: true,
          message: "Updated successfully!",
        });
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

  const northKey = isROI() ? "U" : "N";
  const westKey = "W";

  const total = isROI()
    ? Sel.U + Sel.W + Sel.SW + Sel.Cork + Sel.Dublin + Sel.E
    : Sel.N + Sel.S + Sel.E + Sel.W + Sel.Belfast;

  return (
    <div className="delivery-main-map">
      {/*Left*/}
      <div className="region-container">
        <div className="flex flex-col flex-1">
          <div className="regionHeader ml-2">
            <div className="flex flex-1 text-sm font-bold">
              <span className="ml-2">
                North {Sel[northKey] + "/" + Of[northKey]}
              </span>
              <span className="px-1" id={`regionTitle_${northKey}`} />
              <label className="flex items-center justify-center">
                <input
                  onClick={cbRegionToggleClick}
                  className="ml-1 cursor-pointer form-checkbox"
                  type="checkbox"
                  id={`cb_${northKey}`}
                />
              </label>
            </div>
            <button
              onClick={() =>
                onClickRPrice({ [northKey]: getRegionPrices()[northKey] })
              }
              className="delivery-map-select-price"
            >
              {/*{Number(getRegionPrices()[northKey].price ?? 0).toFixed(2)}*/}
              Set price
            </button>
          </div>
          <div className="towns-container ml-2">
            <RegionList
              defaultPrice={getRegionPrices()[northKey].price ?? 0}
              townList={getTowns().north1}
              onClickPrice={onClickPrice}
            />
            <RegionList
              defaultPrice={getRegionPrices()[northKey].price ?? 0}
              townList={getTowns().north2}
              onClickPrice={onClickPrice}
            />
          </div>
          <div className="regionHeader ml-2">
            <div className="flex flex-1 text-sm font-bold">
              <span className="ml-2">West {Sel.W + "/" + Of.W}</span>
              <span className="px-1" id={`regionTitle_${westKey}`} />
              <label className="flex items-center justify-center">
                <input
                  onClick={cbRegionToggleClick}
                  className="ml-1 cursor-pointer form-checkbox"
                  type="checkbox"
                  id={`cb_${westKey}`}
                />
              </label>
            </div>
            <button
              onClick={() => onClickRPrice({ W: getRegionPrices().W })}
              className="delivery-map-select-price"
            >
              {/*{Number(getRegionPrices().W.price ?? 0).toFixed(2)}*/}
              Set price
            </button>
          </div>
          <div className="towns-container ml-2">
            <RegionList
              defaultPrice={getRegionPrices().W.price ?? 0}
              townList={getTowns().west1}
              onClickPrice={onClickPrice}
            />
            <RegionList
              defaultPrice={getRegionPrices().W.price ?? 0}
              townList={getTowns().west2}
              onClickPrice={onClickPrice}
            />
          </div>

          {isROI() && (
            <>
              <div className="regionHeader ml-2">
                <div className="flex flex-1 text-sm font-bold">
                  <span className="ml-2">Southwest {Sel.SW + "/" + Of.SW}</span>
                  <span className="px-1" id="regionTitle_SW" />
                  <label className="flex items-center justify-center">
                    <input
                      onClick={cbRegionToggleClick}
                      className="ml-1 cursor-pointer form-checkbox"
                      type="checkbox"
                      id="cb_SW"
                    />
                  </label>
                </div>
                <button
                  onClick={() => onClickRPrice({ SW: getRegionPrices().SW })}
                  className="delivery-map-select-price"
                >
                  {/*{Number(getRegionPrices().SW.price ?? 0).toFixed(2)}*/}
                  Set price
                </button>
              </div>
              <div className="towns-container ml-2">
                <RegionList
                  defaultPrice={getRegionPrices().SW.price ?? 0}
                  townList={getTowns().southwest1}
                  onClickPrice={onClickPrice}
                />
                <RegionList
                  defaultPrice={getRegionPrices().SW.price ?? 0}
                  townList={getTowns().southwest2}
                  onClickPrice={onClickPrice}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/*Center*/}
      <div className="flex flex-1 mx-4 min-w-min">
        <div className="flex flex-col flex-1">
          <div className="flex h-20 justify-center pt-1 pb-2">
            <div className="flex flex-col text-sm pl-2 mt-1">
              <span className="text-left text-xs ml-1 pt-1">
                Click on map or lists
              </span>
              <span className="text-left text-xs ml-1">
                to choose delivery areas
              </span>
              <div className="mt-2 ml-1">
                <button
                  onClick={exportSelected}
                  className="bg-po-blue text-white font-bold px-1 rounded w-24 h-6 text-xs transform duration-300 ease-out hover:scale-105"
                >
                  Save Changes
                </button>
                {/*<span className="text-xs text-po-graydark mt-1 pl-1">*/}
                {/*  Unsaved changes*/}
                {/*</span>*/}
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center">
              <label className="flex items-center justify-center text-sm font-bold w-40 my-2">
                <span className="ml-2">Total {total + "/" + Total}</span>
                <span className="px-1" id="regionTitle_Total" />
                <input
                  onClick={cbTotalToggleClick}
                  className="ml-1 cursor-pointer form-checkbox"
                  type="checkbox"
                  id="cb_Total"
                  checked={total === Total}
                />
              </label>
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
            </div>

            <div className="text-left flex flex-col pr-1 mt-1">
              <span className="text-xs pt-1">
                {isROI() ? (
                  <>
                    Based on first 3 chars of <b>Eircode</b>.
                  </>
                ) : (
                  "Based on BT postcodes e.g. 7 = BT7"
                )}
              </span>
              <span className="text-xs pt-2">
                Use checkboxes to select / deselect
              </span>
              <span className="text-xs pt-1">multiple areas at once</span>
            </div>
          </div>

          <div className="flex justify-center items-start mb-6 mt-4">
            <svg width="600" height="557" id="svgOther">
              {Object.keys(mapData.r).map((map, index) => (
                <g key={`${index}`}>
                  {mapData.r[map].map((item, i) => {
                    const defaultPrice =
                      getRegionPrices()[item.region].price ?? 0;
                    return (
                      <polygon
                        key={i}
                        onClick={() =>
                          item.skip ? {} : onToggleSel(true, item.k, true)
                        }
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
                              (t) => t.code === item.k && t.sel
                            )
                          ) && "sel",
                          Object.keys(getTowns()).some((tk) =>
                            getTowns()[tk].some(
                              (t) => t.code === item.k && t.filtered
                            )
                          ) && "filtered",
                          getRegionPrices()[item.region].price && "region-price"
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

          {isROI() && (
            <div className="flex">
              <div className="flex w-1/4 items-start" />
              <div className="flex flex-col flex-1">
                <div className="flex h-10 justify-between mx-2 items-center mt-1 border-2 bg-po-graymedium mt-1">
                  <div className="flex flex-1 text-sm font-bold bg-po-graymedium justify-center items-center pr-8">
                    <span className="ml-2">
                      Cork {Sel.Cork + "/" + Of.Cork}
                    </span>
                    <span className="px-1" id="regionTitle_Cork" />
                    <label className="flex items-center justify-center">
                      <input
                        onClick={cbRegionToggleClick}
                        className="ml-1 cursor-pointer form-checkbox"
                        type="checkbox"
                        id="cb_Cork"
                      />
                    </label>
                  </div>
                  <button
                    onClick={() =>
                      onClickRPrice({ Cork: getRegionPrices().Cork })
                    }
                    className="delivery-map-select-price"
                  >
                    {/*{Number(getRegionPrices().Cork.price ?? 0).toFixed(2)}*/}
                    Set price
                  </button>
                </div>
                <div className="flex flex-1 border-2 mx-2 h-22">
                  <RegionList
                    defaultPrice={getRegionPrices().Cork.price ?? 0}
                    townList={getTowns().cork1}
                    onClickPrice={onClickPrice}
                  />
                  <RegionList
                    defaultPrice={getRegionPrices().Cork.price ?? 0}
                    townList={getTowns().cork2}
                    onClickPrice={onClickPrice}
                  />
                </div>
              </div>
              <div className="flex w-1/4" />
            </div>
          )}
        </div>
      </div>

      {/*Right*/}
      <div className="region-container">
        <div className="flex flex-col flex-1">
          {isROI() ? (
            <>
              <div className="regionHeader mr-2">
                <div className="flex flex-1 text-sm font-bold">
                  <span className="ml-2">
                    Dublin {Sel.Dublin + "/" + Of.Dublin}
                  </span>
                  <span className="px-1" id="regionTitle_Dublin" />
                  <label className="flex items-center justify-center">
                    <input
                      onClick={cbRegionToggleClick}
                      className="ml-1 cursor-pointer form-checkbox"
                      type="checkbox"
                      id="cb_Dublin"
                    />
                  </label>
                </div>
                <button
                  onClick={() =>
                    onClickRPrice({ Dublin: getRegionPrices().Dublin })
                  }
                  className="delivery-map-select-price"
                >
                  {/*{Number(getRegionPrices().Dublin.price ?? 0).toFixed(2)}*/}
                  Set price
                </button>
              </div>
              <div className="towns-container mr-2">
                <RegionList
                  defaultPrice={getRegionPrices().Dublin.price ?? 0}
                  townList={getTowns().dublin1}
                  onClickPrice={onClickPrice}
                />
                <RegionList
                  defaultPrice={getRegionPrices().Dublin.price ?? 0}
                  townList={getTowns().dublin2}
                  onClickPrice={onClickPrice}
                />
              </div>
              <div className="regionHeader  mr-2">
                <div className="flex flex-1 text-sm font-bold">
                  <span className="ml-2">East {Sel.E + "/" + Of.E}</span>
                  <span className="px-1" id="regionTitle_E" />
                  <label className="flex items-center justify-center">
                    <input
                      onClick={cbRegionToggleClick}
                      className="ml-1 cursor-pointer form-checkbox"
                      type="checkbox"
                      id="cb_E"
                    />
                  </label>
                </div>
                <button
                  onClick={() => onClickRPrice({ E: getRegionPrices().E })}
                  className="delivery-map-select-price"
                >
                  {/*{Number(getRegionPrices().E.price ?? 0).toFixed(2)}*/}
                  Set price
                </button>
              </div>
              <div className="towns-container mr-2">
                <RegionList
                  defaultPrice={getRegionPrices().E.price ?? 0}
                  townList={getTowns().east1}
                  onClickPrice={onClickPrice}
                />
                <RegionList
                  defaultPrice={getRegionPrices().E.price ?? 0}
                  townList={getTowns().east2}
                  onClickPrice={onClickPrice}
                />
              </div>
            </>
          ) : (
            <>
              <div className="regionHeader ml-2">
                <div className="flex flex-1 text-sm font-bold">
                  <span className="ml-2">
                    Belfast {Sel.Belfast + "/" + Of.Belfast}
                  </span>
                  <span className="px-1" id="regionTitle_Belfast" />
                  <label className="flex items-center justify-center">
                    <input
                      onClick={cbRegionToggleClick}
                      className="ml-1 cursor-pointer form-checkbox"
                      type="checkbox"
                      id="cb_Belfast"
                    />
                  </label>
                </div>
                <button
                  onClick={() =>
                    onClickRPrice({ Belfast: getRegionPrices().Belfast })
                  }
                  className="delivery-map-select-price"
                >
                  {/*{Number(getRegionPrices().Belfast.price ?? 0).toFixed(2)}*/}
                  Set price
                </button>
              </div>
              <div className="towns-container mr-2">
                <RegionList
                  defaultPrice={getRegionPrices().Belfast.price ?? 0}
                  townList={getTowns().belfast1}
                  onClickPrice={onClickPrice}
                />
                <RegionList
                  defaultPrice={getRegionPrices().Belfast.price ?? 0}
                  townList={getTowns().belfast2}
                  onClickPrice={onClickPrice}
                />
              </div>

              <div className="regionHeader ml-2">
                <div className="flex flex-1 text-sm font-bold">
                  <span className="ml-2">East {Sel.E + "/" + Of.E}</span>
                  <span className="px-1" id="regionTitle_E" />
                  <label className="flex items-center justify-center">
                    <input
                      onClick={cbRegionToggleClick}
                      className="ml-1 cursor-pointer form-checkbox"
                      type="checkbox"
                      id="cb_E"
                    />
                  </label>
                </div>
                <button
                  onClick={() => onClickRPrice({ E: getRegionPrices().E })}
                  className="delivery-map-select-price"
                >
                  {/*{Number(getRegionPrices().E.price ?? 0).toFixed(2)}*/}
                  Set price
                </button>
              </div>
              <div className="towns-container mr-2">
                <RegionList
                  defaultPrice={getRegionPrices().E.price ?? 0}
                  townList={getTowns().east1}
                  onClickPrice={onClickPrice}
                />
                <RegionList
                  defaultPrice={getRegionPrices().E.price ?? 0}
                  townList={getTowns().east2}
                  onClickPrice={onClickPrice}
                />
              </div>

              <div className="regionHeader ml-2">
                <div className="flex flex-1 text-sm font-bold">
                  <span className="ml-2">South {Sel.S + "/" + Of.S}</span>
                  <span className="px-1" id="regionTitle_S" />
                  <label className="flex items-center justify-center">
                    <input
                      onClick={cbRegionToggleClick}
                      className="ml-1 cursor-pointer form-checkbox"
                      type="checkbox"
                      id="cb_S"
                    />
                  </label>
                </div>
                <button
                  onClick={() => onClickRPrice({ S: getRegionPrices().S })}
                  className="delivery-map-select-price"
                >
                  {/*{Number(getRegionPrices().S.price ?? 0).toFixed(2)}*/}
                  Set price
                </button>
              </div>
              <div className="towns-container mr-2">
                <RegionList
                  defaultPrice={getRegionPrices().S.price ?? 0}
                  townList={getTowns().south1}
                  onClickPrice={onClickPrice}
                />
                <RegionList
                  defaultPrice={getRegionPrices().S.price ?? 0}
                  townList={getTowns().south2}
                  onClickPrice={onClickPrice}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/*Custom Price Modal*/}
      <POModal
        modalVisible={modalVisible}
        handleCloseModal={() => setModalVisible(false)}
        renderContent={() => (
          <ChoosePrice
            initialPrice={preItem.town ? preItem.town.price : null}
            isTown={preItem.town != null}
            handleCloseModal={() => setModalVisible(false)}
            handleSavePrice={handleSavePrice}
          />
        )}
      />
      <POAlert
        alertInfo={alertInfo}
        className={"mt-16"}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryMainMap);
