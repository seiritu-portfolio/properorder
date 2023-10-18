import React from "react";
import { classNames, useStyles } from "../CreateProduct/classes";
import clsx from "clsx";
import { InputBase, MenuItem, Select, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PODeliveryMode } from "../../../models";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TimePicker from "@mui/lab/TimePicker";
import moment from "moment";

const weekdays1 = ["Monday", "Tuesday", "Wednesday", "Thursday"];

const weekdays2 = ["Friday", "Saturday", "Sunday", "Bank holidays"];

export default function SiteOpeningTimes({ site, setSite }) {
  const classes = useStyles();

  const handleChangeOption = (deliveryMethod, optionItem) => {
    let newOpeningTimes = site.opening_times ?? {};
    newOpeningTimes = {
      ...newOpeningTimes,
      [deliveryMethod]: {
        ...(newOpeningTimes[deliveryMethod] ?? {}),
        ...optionItem,
      },
    };
    setSite({
      ...site,
      opening_times: newOpeningTimes,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {[PODeliveryMode.collection, PODeliveryMode.delivery].map(
        (deliveryMethod, index) => {
          const methodLabel =
            deliveryMethod.charAt(0).toUpperCase() + deliveryMethod.slice(1);
          const methodVisible =
            deliveryMethod === site.delivery_method ||
            site.delivery_method === PODeliveryMode.both;

          if (!methodVisible) {
            return null;
          }

          return (
            <div
              key={`${deliveryMethod}-${index}`}
              className="flex flex-col px-1 mt-6"
            >
              <p className={"font-bold text-lg"}>{methodLabel} opening times</p>
              <div
                className={"grid grid-col-1 md:grid-cols-2 md:gap-20 mt-4 px-1"}
              >
                <div>
                  {weekdays1.map((weekday) => (
                    <div key={weekday} className="flex justify-between">
                      <p
                        className={clsx(
                          classNames.inputLabel,
                          "w-3/12 sm:w-1/4"
                        )}
                      >
                        {weekday}
                      </p>
                      <div
                        className={clsx(
                          classNames.timePickerContainer,
                          "w-4/12 sm:w-1/4"
                        )}
                      >
                        <TimePicker
                          value={moment(
                            `2022/01/01 ${
                              site.opening_times &&
                              site.opening_times[deliveryMethod]
                                ? site.opening_times[deliveryMethod][
                                    `${weekday.toLowerCase()}_from`
                                  ] ?? "00:00"
                                : "00:00"
                            }`
                          ).toDate()}
                          onChange={(newValue) =>
                            handleChangeOption(deliveryMethod, {
                              [`${weekday.toLowerCase()}_from`]:
                                moment(newValue).format("HH:mm"),
                            })
                          }
                          ampm={false}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className={classes.timeTextField}
                              variant="outlined"
                              InputProps={{
                                disableUnderline: true,
                                ...(params.InputProps ?? {}),
                              }}
                            />
                          )}
                        />
                        {/*<Select*/}
                        {/*  displayEmpty*/}
                        {/*  classes={{ root: classes.select }}*/}
                        {/*  input={*/}
                        {/*    <InputBase classes={{ root: classes.inputRoot }} />*/}
                        {/*  }*/}
                        {/*  labelId={"From"}*/}
                        {/*  id={"time_from"}*/}
                        {/*  IconComponent={ExpandMoreIcon}*/}
                        {/*  value={*/}
                        {/*    site.opening_times &&*/}
                        {/*    site.opening_times[deliveryMethod]*/}
                        {/*      ? site.opening_times[deliveryMethod][*/}
                        {/*          `${weekday.toLowerCase()}_from`*/}
                        {/*        ] ?? ""*/}
                        {/*      : ""*/}
                        {/*  }*/}
                        {/*  onChange={(e) =>*/}
                        {/*    handleChangeOption(deliveryMethod, {*/}
                        {/*      [`${weekday.toLowerCase()}_from`]: e.target.value,*/}
                        {/*    })*/}
                        {/*  }*/}
                        {/*>*/}
                        {/*  <MenuItem*/}
                        {/*    disabled*/}
                        {/*    value={""}*/}
                        {/*    classes={{ gutters: classes.menuList }}*/}
                        {/*  >*/}
                        {/*    <em>From</em>*/}
                        {/*  </MenuItem>*/}
                        {/*  {Array.from({ length: 17 }).map((_, index) => {*/}
                        {/*    const item = `${String(index + 7).padStart(*/}
                        {/*      2,*/}
                        {/*      "0"*/}
                        {/*    )}:00`;*/}
                        {/*    return (*/}
                        {/*      <MenuItem*/}
                        {/*        key={index + 7}*/}
                        {/*        value={item}*/}
                        {/*        classes={{ gutters: classes.menuList }}*/}
                        {/*      >*/}
                        {/*        {item}*/}
                        {/*      </MenuItem>*/}
                        {/*    );*/}
                        {/*  })}*/}
                        {/*</Select>*/}
                      </div>
                      <div
                        className={clsx(
                          classNames.timePickerContainer,
                          "w-4/12 sm:w-1/4"
                        )}
                      >
                        <TimePicker
                          value={moment(
                            `2022/01/01 ${
                              site.opening_times &&
                              site.opening_times[deliveryMethod]
                                ? site.opening_times[deliveryMethod][
                                    `${weekday.toLowerCase()}_to`
                                  ] ?? "00:00"
                                : "00:00"
                            }`
                          ).toDate()}
                          onChange={(newValue) =>
                            handleChangeOption(deliveryMethod, {
                              [`${weekday.toLowerCase()}_to`]:
                                moment(newValue).format("HH:mm"),
                            })
                          }
                          ampm={false}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className={classes.timeTextField}
                              variant="outlined"
                              InputProps={{
                                disableUnderline: true,
                                ...(params.InputProps ?? {}),
                              }}
                            />
                          )}
                        />
                        {/*<Select*/}
                        {/*  displayEmpty*/}
                        {/*  classes={{ root: classes.select }}*/}
                        {/*  input={*/}
                        {/*    <InputBase classes={{ root: classes.inputRoot }} />*/}
                        {/*  }*/}
                        {/*  labelId={"To"}*/}
                        {/*  id={"time_to"}*/}
                        {/*  IconComponent={ExpandMoreIcon}*/}
                        {/*  value={*/}
                        {/*    site.opening_times &&*/}
                        {/*    site.opening_times[deliveryMethod]*/}
                        {/*      ? site.opening_times[deliveryMethod][*/}
                        {/*          `${weekday.toLowerCase()}_to`*/}
                        {/*        ] ?? ""*/}
                        {/*      : ""*/}
                        {/*  }*/}
                        {/*  onChange={(e) =>*/}
                        {/*    handleChangeOption(deliveryMethod, {*/}
                        {/*      [`${weekday.toLowerCase()}_to`]: e.target.value,*/}
                        {/*    })*/}
                        {/*  }*/}
                        {/*>*/}
                        {/*  <MenuItem*/}
                        {/*    disabled*/}
                        {/*    value={""}*/}
                        {/*    classes={{ gutters: classes.menuList }}*/}
                        {/*  >*/}
                        {/*    <em>To</em>*/}
                        {/*  </MenuItem>*/}
                        {/*  {Array.from({ length: 17 }).map((_, index) => {*/}
                        {/*    const item = `${String(index + 7).padStart(*/}
                        {/*      2,*/}
                        {/*      "0"*/}
                        {/*    )}:00`;*/}
                        {/*    return (*/}
                        {/*      <MenuItem*/}
                        {/*        key={index + 7}*/}
                        {/*        value={item}*/}
                        {/*        classes={{ gutters: classes.menuList }}*/}
                        {/*      >*/}
                        {/*        {item}*/}
                        {/*      </MenuItem>*/}
                        {/*    );*/}
                        {/*  })}*/}
                        {/*</Select>*/}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  {weekdays2.map((weekday) => (
                    <div key={weekday} className="flex justify-between">
                      <p
                        className={clsx(
                          classNames.inputLabel,
                          "w-3/12 sm:w-1/4"
                        )}
                      >
                        {weekday}
                      </p>
                      <div
                        className={clsx(
                          classNames.timePickerContainer,
                          "w-4/12 sm:w-1/4 self-start"
                        )}
                      >
                        <TimePicker
                          value={moment(
                            `2022/01/01 ${
                              site.opening_times &&
                              site.opening_times[deliveryMethod]
                                ? site.opening_times[deliveryMethod][
                                    `${weekday
                                      .toLowerCase()
                                      .replace(
                                        "bank holidays",
                                        "bank_holiday"
                                      )}_from`
                                  ] ?? "00:00"
                                : "00:00"
                            }`
                          ).toDate()}
                          onChange={(newValue) =>
                            handleChangeOption(deliveryMethod, {
                              [`${weekday
                                .toLowerCase()
                                .replace(
                                  "bank holidays",
                                  "bank_holiday"
                                )}_from`]: moment(newValue).format("HH:mm"),
                            })
                          }
                          ampm={false}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className={classes.timeTextField}
                              variant="outlined"
                              InputProps={{
                                disableUnderline: true,
                                ...(params.InputProps ?? {}),
                              }}
                            />
                          )}
                        />
                        {/*<Select*/}
                        {/*  displayEmpty*/}
                        {/*  classes={{ root: classes.select }}*/}
                        {/*  input={*/}
                        {/*    <InputBase classes={{ root: classes.inputRoot }} />*/}
                        {/*  }*/}
                        {/*  labelId={"From"}*/}
                        {/*  id={"time_from"}*/}
                        {/*  IconComponent={ExpandMoreIcon}*/}
                        {/*  value={*/}
                        {/*    site.opening_times &&*/}
                        {/*    site.opening_times[deliveryMethod]*/}
                        {/*      ? site.opening_times[deliveryMethod][*/}
                        {/*          `${weekday*/}
                        {/*            .toLowerCase()*/}
                        {/*            .replace(*/}
                        {/*              "bank holidays",*/}
                        {/*              "bank_holiday"*/}
                        {/*            )}_from`*/}
                        {/*        ] ?? ""*/}
                        {/*      : ""*/}
                        {/*  }*/}
                        {/*  onChange={(e) =>*/}
                        {/*    handleChangeOption(deliveryMethod, {*/}
                        {/*      [`${weekday*/}
                        {/*        .toLowerCase()*/}
                        {/*        .replace(*/}
                        {/*          "bank holidays",*/}
                        {/*          "bank_holiday"*/}
                        {/*        )}_from`]: e.target.value,*/}
                        {/*    })*/}
                        {/*  }*/}
                        {/*>*/}
                        {/*  <MenuItem*/}
                        {/*    disabled*/}
                        {/*    value={""}*/}
                        {/*    classes={{ gutters: classes.menuList }}*/}
                        {/*  >*/}
                        {/*    <em>From</em>*/}
                        {/*  </MenuItem>*/}
                        {/*  {Array.from({ length: 17 }).map((_, index) => {*/}
                        {/*    const item = `${String(index + 7).padStart(*/}
                        {/*      2,*/}
                        {/*      "0"*/}
                        {/*    )}:00`;*/}
                        {/*    return (*/}
                        {/*      <MenuItem*/}
                        {/*        key={index + 7}*/}
                        {/*        value={item}*/}
                        {/*        classes={{ gutters: classes.menuList }}*/}
                        {/*      >*/}
                        {/*        {item}*/}
                        {/*      </MenuItem>*/}
                        {/*    );*/}
                        {/*  })}*/}
                        {/*</Select>*/}
                      </div>
                      <div
                        className={clsx(
                          classNames.timePickerContainer,
                          "w-4/12 sm:w-1/4 self-start"
                        )}
                      >
                        <TimePicker
                          value={moment(
                            `2022/01/01 ${
                              site.opening_times &&
                              site.opening_times[deliveryMethod]
                                ? site.opening_times[deliveryMethod][
                                    `${weekday
                                      .toLowerCase()
                                      .replace(
                                        "bank holidays",
                                        "bank_holiday"
                                      )}_to`
                                  ] ?? "00:00"
                                : "00:00"
                            }`
                          ).toDate()}
                          onChange={(newValue) =>
                            handleChangeOption(deliveryMethod, {
                              [`${weekday
                                .toLowerCase()
                                .replace("bank holidays", "bank_holiday")}_to`]:
                                moment(newValue).format("HH:mm"),
                            })
                          }
                          ampm={false}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className={classes.timeTextField}
                              variant="outlined"
                              InputProps={{
                                disableUnderline: true,
                                ...(params.InputProps ?? {}),
                              }}
                            />
                          )}
                        />
                        {/*<Select*/}
                        {/*  displayEmpty*/}
                        {/*  classes={{ root: classes.select }}*/}
                        {/*  input={*/}
                        {/*    <InputBase classes={{ root: classes.inputRoot }} />*/}
                        {/*  }*/}
                        {/*  labelId={"To"}*/}
                        {/*  id={"time_to"}*/}
                        {/*  IconComponent={ExpandMoreIcon}*/}
                        {/*  value={*/}
                        {/*    site.opening_times &&*/}
                        {/*    site.opening_times[deliveryMethod]*/}
                        {/*      ? site.opening_times[deliveryMethod][*/}
                        {/*          `${weekday*/}
                        {/*            .toLowerCase()*/}
                        {/*            .replace(*/}
                        {/*              "bank holidays",*/}
                        {/*              "bank_holiday"*/}
                        {/*            )}_to`*/}
                        {/*        ] ?? ""*/}
                        {/*      : ""*/}
                        {/*  }*/}
                        {/*  onChange={(e) =>*/}
                        {/*    handleChangeOption(deliveryMethod, {*/}
                        {/*      [`${weekday*/}
                        {/*        .toLowerCase()*/}
                        {/*        .replace("bank holidays", "bank_holiday")}_to`]:*/}
                        {/*        e.target.value,*/}
                        {/*    })*/}
                        {/*  }*/}
                        {/*>*/}
                        {/*  <MenuItem*/}
                        {/*    disabled*/}
                        {/*    value={""}*/}
                        {/*    classes={{ gutters: classes.menuList }}*/}
                        {/*  >*/}
                        {/*    <em>To</em>*/}
                        {/*  </MenuItem>*/}
                        {/*  {Array.from({ length: 17 }).map((_, index) => {*/}
                        {/*    const item = `${String(index + 7).padStart(*/}
                        {/*      2,*/}
                        {/*      "0"*/}
                        {/*    )}:00`;*/}
                        {/*    return (*/}
                        {/*      <MenuItem*/}
                        {/*        key={index + 7}*/}
                        {/*        value={item}*/}
                        {/*        classes={{ gutters: classes.menuList }}*/}
                        {/*      >*/}
                        {/*        {item}*/}
                        {/*      </MenuItem>*/}
                        {/*    );*/}
                        {/*  })}*/}
                        {/*</Select>*/}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
      )}
    </LocalizationProvider>
  );
}
