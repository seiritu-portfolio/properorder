import React from "react";
import { InputBase, makeStyles, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Add } from "@material-ui/icons";
import POModal from "../POModal";
import AddWeight from "./AddWeight";

export default function SelectWeight() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "5rem",
      paddingRight: "0.1rem",
      fontSize: "0.7rem",
      fontWeight: "semibold",
    },
    menuList: {
      paddingLeft: "0.3rem",
      fontSize: "0.625rem",
      paddingRight: "0.3rem",
    },
    addWeight: {
      borderTop: "1px solid",
      borderTopColor: theme.palette.common.graymedium,
      paddingLeft: "0.25rem",
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    icon: {
      backgroundColor: theme.palette.common.primary,
      borderRadius: "0.5rem",
      width: "1rem",
      height: "1rem",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    },
  }));

  const classes = useStyles();
  const [weight, setWeight] = React.useState("2");

  const handleChange = (event) => {
    const newWeight = event.target.value;
    if (newWeight === 0) {
      handleOpenModal();
      return;
    }
    setWeight(newWeight);
  };

  return (
    <div className={"border rounded-lg border-po-graylight px-2 pt-1"}>
      <Select
        classes={{ root: classes.root }}
        input={<InputBase />}
        labelId="select"
        id="select"
        value={weight}
        IconComponent={ExpandMoreIcon}
        onChange={handleChange}
      >
        {[1, 2, 3, 4, 5].map((item, index) => (
          <MenuItem
            key={index}
            value={item}
            classes={{ gutters: classes.menuList }}
          >
            {item} kg
          </MenuItem>
        ))}
        <MenuItem value={0} classes={{ gutters: classes.addWeight }}>
          <button className={classes.icon}>
            <Add style={{ fontSize: "0.7rem" }} />
          </button>
          <p className={"pl-1 text-xs font-semibold"}>Add weight</p>
        </MenuItem>
      </Select>
      <POModal
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        renderContent={() => <AddWeight handleCloseModal={handleCloseModal} />}
      />
    </div>
  );
}
