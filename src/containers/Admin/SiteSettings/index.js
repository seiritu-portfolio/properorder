import React, { useEffect, useState } from "react";
import "./styles.scss";
import {
  Button,
  FormControlLabel,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { classNames } from "../CreateProduct/classes";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import SiteDetails from "./SiteDetails";
import SiteHeroImage from "./SiteHeroImage";
import SiteType from "./SiteType";
import SiteAddress from "./SiteAddress";
import SiteOpeningTimes from "./SiteOpeningTimes";
import POSwitch from "../../../components/POSwitch";
import { connect } from "react-redux";
import history from "../../../routes/history";
import APIManager from "../../../Network/APIManager";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import SiteProductHeaders from "./SiteProductHeaders";
import { useParams } from "react-router-dom";
import * as adminActions from "../../../redux/AdminSaga/actions";
import POFileService from "../../../services/POFileService";
import Spinner from "react-spinkit";
import { PODeliveryMode } from "../../../models";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SiteDMPicker from "./SiteDMPicker";

const useStyle = makeStyles((_) => ({
  btn: {
    flex: "1 1 0",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    margin: "0 0.5rem",
    height: "3.5rem",
    fontSize: "1.2rem",
    minHeight: "3rem",
  },
  mainButton: {
    marginLeft: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginLeft: "2rem",
    },
  },
  cancelButton: {
    backgroundColor: "#BFBFC6",
    marginRight: "0.5rem",
    "&:hover": {
      opacity: 1,
      backgroundColor: "#BFBFC6",
    },
    display: "flex",
    marginBottom: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginBottom: 0,
      marginRight: "2rem",
    },
  },
}));

const weekdays = [
  "bank_holiday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function SiteSettings({ user, actions, ...props }) {
  const classesButtons = useStyle();
  const { orgId, sellerIndex } = useParams();

  useEffect(() => {
    actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(`/admin/${orgId}/site/${props.sellerIndex.id}/settings`);
    }
  }, [props.sellerIndex]);

  const [site, setSite] = useState({});
  const [siteDescription, setSiteDescription] = useState(
    site?.description ?? ""
  );

  const [heroImage, setHeroImage] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false });

  useEffect(() => {
    if (sellerIndex !== -1) {
      APIManager.fetchAdminSeller(sellerIndex).then((res) => {
        console.log(res);
        setSiteDescription(res.description);
        let openingTimes = {};
        if (res.opening_times) {
          res.opening_times.forEach((v) => {
            openingTimes = generateOpeningTimes(openingTimes, "collection", v);
          });
        }
        if (res.delivery_times) {
          res.delivery_times.forEach((v) => {
            openingTimes = generateOpeningTimes(openingTimes, "delivery", v);
          });
        }
        setSite({ ...res, opening_times: openingTimes });
      });
    }
  }, [user, sellerIndex]);

  const generateOpeningTimes = (openingTimes, deliveryMode, v) => {
    return {
      ...openingTimes,
      [deliveryMode]: {
        ...(openingTimes[deliveryMode] ?? {}),
        [`${weekdays[v.day]}_from`]: `${v.start_time.split(":")[0]}:00`,
        [`${weekdays[v.day]}_to`]: `${v.end_time.split(":")[0]}:00`,
      },
    };
  };

  const handleSubmit = () => {
    let request = {
      ...site,
      site_type_id: site.site_type_id,
      description: siteDescription,
      image: null,
    };
    if (heroImage == null) {
      setAlertInfo({
        open: true,
        message: "Upload the hero image",
        severity: "warning",
      });
      return;
    }

    let message = "";

    if (request.site_type_id === 0) {
      message = "The site type is required.";
    }

    for (const deliveryMethod of [
      PODeliveryMode.collection,
      PODeliveryMode.delivery,
    ]) {
      if (
        site.delivery_method === deliveryMethod ||
        site.delivery_method === PODeliveryMode.both
      ) {
        weekdays.forEach((wd) => {
          const from =
            request.opening_times && request.opening_times[deliveryMethod]
              ? request.opening_times[deliveryMethod][`${wd}_from`]
              : "";
          const to =
            request.opening_times && request.opening_times[deliveryMethod]
              ? request.opening_times[deliveryMethod][`${wd}_to`]
              : "";
          if (from == null || from === "" || to == null || to === "") {
            message = "Opening times is required";
          } else {
            if (from === "Invalid date" || to === "Invalid date") {
              message = "Invalid time";
            } else if (Number(from.split(":")[0]) >= Number(to.split(":")[0])) {
              message =
                "The end time of opening times must be a date after the start time";
            }
          }
        });
      }
    }

    if (message !== "") {
      setAlertInfo({
        open: true,
        message,
        severity: "warning",
      });
      return;
    }

    setIsLoading(true);
    if (heroImage) {
      POFileService.storeFile(heroImage)
        .then((response) => {
          console.log(response);
          handleUpdateSeller({
            "image[key]": response.uuid,
            "image[ext]": response.extension,
            ...request,
          });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setAlertInfo({
            open: true,
            message: "Image upload failed, please tray again later",
            severity: "warning",
          });
        });
    } else {
      handleUpdateSeller(request);
    }
  };

  const handleUpdateSeller = (request) => {
    console.log("request", request);
    let { opening_times, ...requestBody } = request;
    requestBody = {
      ...requestBody,
      [`opening_times[collection]`]: opening_times.collection,
      [`opening_times[delivery]`]: opening_times.delivery,
    };
    APIManager.updateSeller(sellerIndex, requestBody)
      .then((res) => {
        console.log(res);
        // setGiftNotes(res.allow_gift_notes);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: "Updated successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: "Please try again later",
          severity: "error",
        });
      });
  };

  if (site?.id == null) {
    return (
      <div className={"flex flex-1 flex-col p-8 items-center justify-center"}>
        <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />
      </div>
    );
  }

  return (
    <PerfectScrollbar className={"flex flex-1 flex-col p-4 sm:p-8 2xl:px-24"}>
      <header className={"flex flex-row justify-between"}>
        <h2 className="text-2xl font-bold px-3">Site Settings</h2>
      </header>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 px-3"}>
        <div>
          <SiteDetails
            site={site}
            setSite={setSite}
            siteDescription={siteDescription}
            setSiteDescription={setSiteDescription}
          />
          <SiteType site={site} setSite={setSite} />
          {/*<SiteProductHeaders*/}
          {/*  sellerIndex={sellerIndex}*/}
          {/*  site={site}*/}
          {/*  setSite={setSite}*/}
          {/*/>*/}
        </div>
        <SiteHeroImage site={site} setHeroImage={setHeroImage} />
      </div>

      <SiteAddress site={site} setSite={setSite} />
      <div className={"grid grid-col-1 md:grid-cols-4 md:gap-12 mt-4"}>
        <div className="col-span-2">
          <p className={classNames.inputLabel}>Minimum order value</p>
          <div className={"flex flex-row"}>
            <p className={classNames.priceLabel}>€</p>
            <input
              id="minimum_order_value"
              type="number"
              className={classNames.input}
              value={site.minimum_order ?? 0}
              onChange={(e) =>
                setSite({ ...site, minimum_order: e.target.value })
              }
            />
          </div>
          <p className={classNames.inputDescription}>
            If not specified, will be set to 0, meaning that customers can place
            orders with any value
          </p>
        </div>

        <div className={"col-span-1 flex flex-col"}>
          <p className={classNames.inputLabel}>Allow gift notes?*</p>
          <FormControlLabel
            label={""}
            control={
              <POSwitch
                checked={site?.allow_gift_notes === 1}
                onChange={(e) =>
                  setSite({
                    ...site,
                    allow_gift_notes: e.target.checked ? 1 : 0,
                  })
                }
              />
            }
            className={"my-2"}
          />
          <p className={classNames.inputDescription}>
            If set to true, a buyer may add a gift note to an order, which a
            member of your team will write out and attach.
          </p>
        </div>
        <SiteDMPicker site={site} setSite={setSite} />
      </div>
      <SiteOpeningTimes site={site} setSite={setSite} />

      <div
        className={"my-4 sm:my-10 flex flex-col sm:flex-row justify-between"}
      >
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classesButtons.btn, classesButtons.cancelButton)}
          onClick={() => {
            history.push("/admin");
            actions.updateAdminOrders([]);
            actions.fetchAdminOrders({
              sellerIndex,
            });
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classesButtons.btn, classesButtons.mainButton)}
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </div>
      <POSpinner isLoading={isLoading} />
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
    </PerfectScrollbar>
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
    fetchAdminOrders: (request) => {
      dispatch(adminActions.fetchAdminOrders(request));
    },
    updateAdminOrders: (orders) => {
      dispatch(adminActions.updateAdminOrders(orders));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteSettings);
