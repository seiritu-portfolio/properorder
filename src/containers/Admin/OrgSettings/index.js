import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button, makeStyles } from "@material-ui/core";
import { classNames, useStyles } from "../CreateProduct/classes";
import clsx from "clsx";
import { DropzoneArea } from "material-ui-dropzone";
import OrgAddressFields from "./OrgAddressFields";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import history from "../../../routes/history";
import { useHeader } from "../Provider/HeaderProvider";
import Spinner from "react-spinkit";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import POFileService from "../../../services/POFileService";
import Constants from "../../../config/Constants";
import * as adminActions from "../../../redux/AdminSaga/actions";

const useStyle = makeStyles({
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
});

function OrgSettings(props) {
  const classes = useStyles();
  const classesButtons = useStyle();
  const { orgId } = useParams();

  const [org, setOrg] = useState({});
  const [logo, setLogo] = useState();
  const [alertInfo, setAlertInfo] = useState({ open: false });
  const [isLoading, setIsLoading] = useState(false);

  const { updatedOrg, setUpdatedOrg } = useHeader();

  useEffect(() => {
    APIManager.fetchOrganisation(orgId).then((res) => {
      console.log(res);
      setOrg({ ...res });
    });
  }, []);

  const handleSubmit = () => {
    const { name, phone, address } = org;
    let message = "";
    if (address == null) {
      message = "The street address 1 field is required";
    } else {
      const { address_l1, city, county, country, postcode } = address;
      if (postcode == null || postcode === "") {
        message = "The Eircode/Postcode field is required";
      }
      if (country == null || country === "") {
        message = "The country field is required";
      }
      if (county == null || county === "") {
        message = "The county field is required";
      }
      if (city == null || city === "") {
        message = "The city field is required";
      }
      if (address_l1 == null || address_l1 === "") {
        message = "The street address 1 field is required";
      }
    }
    if (phone == null || phone === "") {
      message = "The phone number field is required";
    }
    if (name == null || name === "") {
      message = "The name field is required";
    }

    if (org.id == null) {
      message =
        "This site has no organisation please contact to our support team since this is an service problem";
    }

    if (logo == null) {
      message = "Upload Logo image";
    }

    if (message !== "") {
      setAlertInfo({
        open: true,
        message,
        severity: "warning",
      });
      return;
    }

    if (logo) {
      setIsLoading(true);
      POFileService.storeFile(logo)
        .then((response) => {
          console.log(response);
          continueSubmit({
            name,
            phone,
            address,
            "logo[key]": response.uuid,
            "logo[ext]": response.extension,
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
      setIsLoading(true);
      continueSubmit({ name, phone, address });
    }
  };

  const continueSubmit = (request) => {
    APIManager.submitOrganisation(org.id, request)
      .then((res) => {
        setIsLoading(false);
        setUpdatedOrg(!updatedOrg);
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
        console.log(error);
      });
  };

  const renderDropzone = (key, dropzoneClass) => (
    <DropzoneArea
      key={key}
      initialFiles={org.logo ? [org.logo + "?crossorigin"] : []}
      acceptedFiles={["image/*"]}
      filesLimit={1}
      maxFileSize={Constants.MAX_FILE_SIZE}
      dropzoneText={"Drag and drop an image here or click to browse"}
      dropzoneClass={dropzoneClass ?? classes.dropzoneLogo}
      dropzoneParagraphClass={classes.dropzoneText}
      previewGridClasses={{
        container: classes.dropzonePreview,
        item: classes.dropzonePreviewItem,
      }}
      onChange={(files) => {
        setLogo(files[0]);
      }}
    />
  );

  if (org.id == null) {
    return (
      <div className={"flex flex-1 flex-col p-8 items-center justify-center"}>
        <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />
      </div>
    );
  }

  return (
    <PerfectScrollbar className={"flex flex-1 flex-col p-8 2xl:px-24"}>
      <header className={"flex flex-row justify-between"}>
        <h2 className="text-2xl font-bold px-3">Organisation settings</h2>
      </header>
      <div className={"grid grid-col-1 md:grid-cols-2 md:gap-12 mt-4 px-3"}>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>
            Organisation name*
          </p>
          <input
            id="product_name"
            type="text"
            required
            className={classNames.input}
            maxLength={45}
            value={org.name}
            onChange={(e) => setOrg({ ...org, name: e.target.value })}
          />
          <p className={classNames.inputDescription}>
            Please do not exceed 45 characters limit
          </p>
          <p className={clsx(classNames.inputLabel, "mt-6")}>Phone number*</p>
          <input
            id="phone_number"
            type="text"
            required
            className={classNames.input}
            value={org.phone}
            onChange={(e) => setOrg({ ...org, phone: e.target.value })}
          />
        </div>

        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-4 md:mt-0.5")}>
            Logo image*
          </p>
          <div className={"flex  flex-row mb-2 w-8/12"}>
            {renderDropzone(0)}
          </div>
          <p className={clsx(classNames.inputDescription, "mb-4 md:w-8/12")}>
            The logo image must be in certain dimensions: 1200 x 1800 pixels min
            (.jpg .png - 2MB).
          </p>
        </div>
      </div>

      <OrgAddressFields org={org} setOrg={setOrg} />
      <div className={"my-4 sm:my-8 flex flex-col sm:flex-row justify-between"}>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classesButtons.btn, classesButtons.cancelButton)}
          onClick={() => {
            history.push("/admin");
            props.actions.updateAdminOrders([]);
            props.actions.fetchAdminOrders({
              sellerIndex: props.user.sites[0].id,
            });
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classesButtons.btn, classesButtons.mainButton)}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
    </PerfectScrollbar>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchAdminOrders: (request) => {
      dispatch(adminActions.fetchAdminOrders(request));
    },
    updateAdminOrders: (orders) => {
      dispatch(adminActions.updateAdminOrders(orders));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrgSettings);
