import React, { useState } from "react";
import clsx from "clsx";
import { classNames, useStyles } from "../CreateProduct/classes";
import { DropzoneArea } from "material-ui-dropzone";
import { Button } from "@material-ui/core";
import APIManager from "../../../Network/APIManager";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import Constants from "../../../config/Constants";

export default function SiteHeroImage({ site, setHeroImage }) {
  const classes = useStyles();

  const [alertInfo, setAlertInfo] = useState({ open: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectStripe = () => {
    setIsLoading(true);
    APIManager.onboardSeller(site.id)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.url != null) {
          window.open(res.url);
        }
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

  const renderDropzone = (key, dropzoneClass) => (
    <DropzoneArea
      key={key}
      initialFiles={site.image ? [site.image] : []}
      acceptedFiles={["image/*"]}
      filesLimit={1}
      maxFileSize={Constants.MAX_FILE_SIZE}
      dropzoneText={"Drag and drop an image here or click to browse"}
      dropzoneClass={dropzoneClass ?? classes.dropzoneHero}
      dropzoneParagraphClass={classes.dropzoneText}
      previewGridClasses={{
        container: classes.dropzonePreview,
        item: classes.dropzonePreviewItem,
      }}
      onChange={(files) => {
        setHeroImage(files[0]);
      }}
    />
  );

  return (
    <div className={"flex flex-col"}>
      <p className={clsx(classNames.inputLabel, "mt-0.5")}>Hero image*</p>
      {site.id != null && (
        <div className={"flex flex-row mb-4"}>{renderDropzone(0)}</div>
      )}
      <p className={clsx(classNames.inputDescription)}>
        Hero image is the background image of your main site page. The way in
        which your products are laid out is an important factor in showcasing
        your food.{" "}
      </p>
      <p className={classNames.inputDescription}>Some of our advice: </p>

      <div className={classNames.inputDescription}>
        <p className="mt-2">
          {" "}
          - Choose a simple and uncluttered background so that the products
          really stand out.{" "}
        </p>
        <p className="mt-2">
          {" "}
          - We recommend that the hero image have at least 5 different products
          on it. This helps show the customers the variety of products that you
          have on your product list.{" "}
        </p>
        <p className="mt-2">
          {" "}
          - Make sure that your dishes are always taking up the majority of the
          shot, leaving just a small margin at the top, bottom and sides of the
          frame{" "}
        </p>
        <p className="mt-2">
          {" "}
          - Pay attention to the quality of the pictures you add, comply with
          the background standards. The hero image must be in certain
          dimensions: 1200 x 1800 pixels min (.jpg .png - 2MB).{" "}
        </p>
      </div>
      <div className={"mt-8 w-full flex flex-col"}>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.btn, classes.mainButton)}
          onClick={() => handleConnectStripe()}
        >
          Stripe Connect
        </Button>
      </div>
      <POAlert
        alertInfo={alertInfo}
        className={"mt-16"}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
    </div>
  );
}
