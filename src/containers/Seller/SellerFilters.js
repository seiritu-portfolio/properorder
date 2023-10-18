import React from "react";
import "./styles.scss";
import { Divider } from "@material-ui/core";
import NestedList from "../../components/NestedList";
import MySlider from "../../components/MySlider";
import VerticalTabs from "../../components/VerticalTabs";

export default function SellerFilters(props) {
  const { types } = props;
  const categories = ["Hampers & fruit boxes", "Fruits", "Snacks", "Coffee"];
  const [value, setValue] = React.useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valueLabelFormat(value) {
    return `€${value}`;
  }

  return (
    <div className="flex flex-col mx-3 space-y-3 shadow-lg px-4 py-5 rounded-xl bg-white w-auto lg:w-60">
      <VerticalTabs items={categories} />
      <Divider />
      <NestedList
        title={"Type"}
        items={types}
        handleChangeItem={(item) => {}}
      />
      <Divider />
      <NestedList
        title={"Price"}
        renderContent={() => (
          <div className={"ml-4 mr-5 relative"}>
            <MySlider
              value={value}
              onChange={handleChange}
              valueLabelFormat={valueLabelFormat}
              valueLabelDisplay="on"
              min={0}
              max={500}
            />
            {value < 420 && (
              <span
                className={"absolute text-xs"}
                style={{ top: 25, right: -18 }}
              >
                €500
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
}
