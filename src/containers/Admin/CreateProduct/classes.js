import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dropzone: {
    marginTop: "0.5rem",
    width: "12rem !important",
    height: "12rem",
    minHeight: "12rem !important",
    borderRadius: "1.5rem !important",
    display: "flex",
    fontSize: "1.2rem",
  },
  dropzoneLogo: {
    marginTop: "0.5rem",
    width: "18rem !important",
    height: "10rem",
    minHeight: "12rem !important",
    borderRadius: "1.5rem !important",
    display: "flex",
    fontSize: "1.3rem",
  },
  dropzoneHero: {
    marginTop: "0.5rem",
    width: "80%",
    height: "10rem",
    minHeight: "12rem !important",
    borderRadius: "1.5rem !important",
    display: "flex",
    justifyContent: "center",
    fontSize: "1.3rem",
  },
  smallDropzone: {
    marginTop: "0.5rem",
    width: "6rem !important",
    height: "5.5rem",
    minHeight: "5.5rem !important",
    borderRadius: "1rem !important",
    display: "flex",
    fontSize: "0.8rem",
  },
  dropzoneText: {
    fontSize: "0.8em",
    padding: "0 0.5rem",
    color: theme.palette.common.graymedium,
  },
  dropzonePreview: {
    width: "100%",
    height: "100%",
    margin: "0 !important",
    position: "absolute",
  },
  dropzonePreviewItem: {
    width: "100%",
    height: "100%",
    maxWidth: "100% !important",
    flexBasis: "100% !important",
    padding: "0 !important",
  },

  select: {
    width: "100%",
    paddingRight: 0,
    fontSize: "1rem",
    fontWeight: "semibold",
  },
  inputRoot: {
    width: "100%",
    height: "2.5rem",
  },
  menuList: {
    paddingLeft: "0.5rem",
    fontSize: "0.9rem",
  },

  previewBtn: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    minHeight: "3rem",
    fontWeight: "semibold",
    fontSize: "1.2rem",
    marginTop: "2rem",
    borderRadius: "0.4rem",
    width: "100%",
  },

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

  timeTextField: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderRadius: "0.25rem",
      "&.Mui-focused fieldset": {
        borderColor: "#2563EB",
      },
    },
  },
}));

export const classNames = {
  inputLabel: "text-sm font-semibold mt-2",
  selectContainer:
    "text-sm rounded border border-po-graymedium mt-1 bg-white px-2",
  input:
    "text-base w-full h-10 rounded border border-po-graymedium px-3 py-2 mt-0.5",
  inputDescription: "text-xs text-po-graydark mt-0.5",
  priceLabel: "text-sm font-semibold mt-1 self-center mr-1",
  timePickerContainer: "text-sm mt-1",
};
