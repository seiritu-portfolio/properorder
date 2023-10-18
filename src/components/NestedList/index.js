import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(2),
  },
}));

export default function NestedList(props) {
  const {
    title,
    items,
    selectedItems = [],
    renderTitle,
    renderContent,
    handleChangeItem,
    defaultOpen = true,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(defaultOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component="nav">
      <ListItem button onClick={handleClick}>
        {renderTitle ? (
          renderTitle()
        ) : (
          <ListItemText primary={title} className={"ml-2"} />
        )}
        {open ? (
          <ExpandLess color={"secondary"} />
        ) : (
          <ExpandMore color={"secondary"} />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {renderContent ? (
          renderContent()
        ) : (
          <PerfectScrollbar className={"md:max-h-96 lg:max-h-80"}>
            <FormGroup className={classes.nested}>
              {items
                .filter(
                  (item) => item.name !== "Halal" && item.name !== "Kosher"
                )
                .map((item, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox color={"secondary"} name={item.getLabel()} />
                    }
                    label={item.getLabel()}
                    checked={selectedItems.some((s) => s.id === item.id)}
                    onChange={() => handleChangeItem(item)}
                  />
                ))}
            </FormGroup>
          </PerfectScrollbar>
        )}
      </Collapse>
    </List>
  );
}

NestedList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
};
