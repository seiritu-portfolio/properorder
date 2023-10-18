import React, { useEffect, useState } from "react";
import { classNames } from "../CreateProduct/classes";
import { WithContext as ReactTags } from "react-tag-input";
import APIManager from "../../../Network/APIManager";
import POAlert from "../../../components/POAlert";

export default function SiteProductHeaders({ sellerIndex, site, setSite }) {
  const [tags, setTags] = useState([]);
  const [productHeaders, setProductHeaders] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ open: false });

  useEffect(() => {
    setTags(
      site.headers ? site.headers.map((h) => ({ ...h, id: `${h.id}` })) : []
    );
  }, [site]);

  const onDelete = (i) => {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const onAddition = (tag) => {
    APIManager.createProductHeader(sellerIndex, tag.name)
      .then((res) => {
        const newTags = [...tags];
        newTags.push({ ...res, id: `${res.id}` });
        setTags(newTags);
      })
      .catch((error) => {
        console.log(error);
        setAlertInfo({
          open: true,
          message: error,
          severity: "warning",
        });
      });
  };

  const handleDrag = (tag, currPos, newPos) => {
    let newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  return (
    <div className={"flex flex-col"}>
      <p className={classNames.inputLabel}>Product headers*</p>
      <ReactTags
        tags={tags}
        suggestions={productHeaders}
        handleDelete={onDelete}
        handleAddition={onAddition}
        handleDrag={handleDrag}
        labelField={"name"}
        autofocus={false}
      />
      <p className={"text-sm text-po-graydark mt-1.5"}>
        Please provide custom categories/headers for your products e.g. Hampers
        & Gifts, Cookies, Bread, Gluten Free selection
      </p>
      <p className={"text-sm text-po-graydark mt-1.5"}>
        {
          "You can drag and drop the product headers to reorder them, the product headers will appear on the order they're created here"
        }
      </p>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
    </div>
  );
}
