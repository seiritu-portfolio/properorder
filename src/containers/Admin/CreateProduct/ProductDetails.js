import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { classNames } from "./classes";

import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default function ProductDetails({
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  productPrice,
  setProductPrice,
  productCode,
  setProductCode,
}) {
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    let state = EditorState.createEmpty();

    if (productDescription) {
      const { contentBlocks, entityMap } = htmlToDraft(
        productDescription
          .replace(/(<\/?)figure((?:\s+.*?)?>)/g, "")
          .replace(/(<br>)/g, "")
      );
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      state = EditorState.createWithContent(contentState);
    }

    setEditorState(state);
  }, []);

  useEffect(() => {
    if (editorState) {
      const content = editorState.getCurrentContent();
      const rawContentState = convertToRaw(content);

      const newContent = {
        ...rawContentState,
        blocks: rawContentState.blocks.map((block) => {
          if (block.text === "") {
            return {
              ...block,
              text: "\n",
            };
          }
          return block;
        }),
      };

      setProductDescription(draftToHtml(newContent));
    }
  }, [editorState]);

  return (
    <div className={"flex flex-col"}>
      <p className={classNames.inputLabel}>Product code/SKU</p>
      <div className={"flex flex-row"}>
        <input
          id={`product_sku`}
          type="text"
          className={classNames.input}
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
        />
      </div>
      <p className={clsx(classNames.inputLabel, "mt-3")}>Product name*</p>
      <input
        id="product_name"
        type="text"
        className={classNames.input}
        maxLength={45}
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <p className={classNames.inputDescription}>
        Please do not exceed 45 characters limit
      </p>
      <p className={clsx(classNames.inputLabel, "mt-3")}>Description</p>
      <div className={"block"}>
        <Editor
          editorState={editorState}
          editorClassName="product-editor"
          wrapperClassName="product-editor-wrapper"
          onEditorStateChange={setEditorState}
        />
      </div>
      <p className={classNames.inputDescription}>
        This should give customers all the information they need to understand
        the product
      </p>
      <p className={clsx(classNames.inputLabel, "mt-2")}>Price*</p>
      <div className={"flex flex-row"}>
        <p className={classNames.priceLabel}>€</p>
        <input
          id="price"
          type="number"
          className={classNames.input}
          value={productPrice}
          onChange={(evt) => {
            const t = evt.target.value;
            if (Number(t) < 0) {
              setProductPrice(0);
              return;
            }
            setProductPrice(
              t.indexOf(".") >= 0
                ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)
                : t
            );
          }}
        />
      </div>
      <p className={classNames.inputDescription}>
        If a product has multiple options, please specify the base price here
        (price of the cheapest option)
      </p>
    </div>
  );
}
