import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { classNames } from "../CreateProduct/classes";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default function SiteDetails({
  site,
  setSite,
  siteDescription,
  setSiteDescription,
}) {
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    let state = EditorState.createEmpty();

    if (siteDescription) {
      const { contentBlocks, entityMap } = htmlToDraft(
        siteDescription
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
      const rawContentState = convertToRaw(editorState.getCurrentContent());

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

      setSiteDescription(draftToHtml(newContent));
    }
  }, [editorState]);

  return (
    <div className={"flex flex-col"}>
      <p className={clsx(classNames.inputLabel, "mt-0.5")}>Site name*</p>
      <input
        id="site_name"
        type="text"
        className={classNames.input}
        maxLength={45}
        value={site.name ?? ""}
        onChange={(e) => setSite({ ...site, name: e.target.value })}
      />
      <p className={classNames.inputDescription}>
        Please do not exceed 45 characters limit
      </p>
      <p className={classNames.inputLabel}>Description*</p>

      <Editor
        editorState={editorState}
        editorClassName="product-editor"
        wrapperClassName="product-editor-wrapper"
        onEditorStateChange={setEditorState}
      />
      {/*
        <textarea
          id="description"
          className={clsx(classNames.input, "m-h-32")}
          value={site.description ?? ""}
          onChange={(e) => setSite({ ...site, description: e.target.value })}
        />
      */}
      <p className={classNames.inputDescription}>
        This should give customers all the information they need to understand
        the site
      </p>
      <p className={clsx(classNames.inputLabel, "mt-4")}>Phone number*</p>
      <input
        id="phone_number"
        type="text"
        required
        className={classNames.input}
        value={site.phone ?? ""}
        onChange={(e) => setSite({ ...site, phone: e.target.value })}
      />
      <p className={clsx(classNames.inputLabel, "mt-4")}>Email*</p>
      <input
        id="email"
        type="email"
        required
        className={classNames.input}
        value={site.email ?? ""}
        onChange={(e) => setSite({ ...site, email: e.target.value })}
      />
      <p className={clsx(classNames.inputLabel, "mt-4")}>Website</p>
      <input
        id="text"
        type="text"
        className={classNames.input}
        value={site.website ?? ""}
        onChange={(e) => setSite({ ...site, website: e.target.value })}
      />
    </div>
  );
}
