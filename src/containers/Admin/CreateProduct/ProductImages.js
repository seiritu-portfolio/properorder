import React from "react";
import clsx from "clsx";
import { classNames, useStyles } from "./classes";
import { DropzoneArea } from "material-ui-dropzone";
import Constants from "../../../config/Constants";

export default function ProductImages({
  initialFiles = {},
  productImages,
  setProductImages,
}) {
  const classes = useStyles();

  const renderDropzone = (key, dropzoneClass) => (
    <DropzoneArea
      key={key}
      initialFiles={
        initialFiles[key] ? [initialFiles[key].image + "?crossorigin"] : []
      }
      acceptedFiles={["image/*"]}
      filesLimit={1}
      maxFileSize={Constants.MAX_FILE_SIZE}
      dropzoneText={"Drag and drop an image here or click"}
      dropzoneClass={dropzoneClass ?? classes.dropzone}
      dropzoneParagraphClass={classes.dropzoneText}
      previewGridClasses={{
        container: classes.dropzonePreview,
        item: classes.dropzonePreviewItem,
      }}
      onChange={(files) => {
        setProductImages({ ...productImages, [key]: files[0] });
      }}
    />
  );

  return (
    <div className={"product-images-container"}>
      <div className={"product-images-item"}>
        <p className={clsx(classNames.inputLabel, "mt-0.5")}>Product images</p>
        <div className={"flex flex-row mb-4"}>
          {renderDropzone(0)}
          <div className={"grid grid-cols-2 ml-4 gap-2"}>
            {[1, 2, 3, 4].map((key) =>
              renderDropzone(key, classes.smallDropzone)
            )}
          </div>
        </div>
      </div>
      <div className={"product-images-item"}>
        <p className={clsx(classNames.inputDescription, "mb-4")}>
          You need to add at least 1 and up to 5 images. Pay attention to the
          quality of the pictures you add, comply with the background standards.
          Pictures must be in certain dimensions 1200 * 1800 pixels min (.jpg
          .png - 2MB).
        </p>
        <p className={classNames.inputDescription}>
          Make sure item is:
          <br />
          &emsp;- brightly lit and in focus
          <br />
          &emsp;- large and centered
          <br />
        </p>
      </div>
    </div>
  );
}
