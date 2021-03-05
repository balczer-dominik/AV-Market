import { FormControl, Select, SelectProps } from "@chakra-ui/react";
import { BaseProps } from "formik-chakra-ui/dist/base-props";
import React from "react";
import { NEW_COUNTY_LABEL, counties } from "../../utils/strings";

interface MySelectProps extends SelectProps {}

export const MySelect: React.FC<MySelectProps> = () => {
  return (
    <FormControl name={"newCounty"} label={NEW_COUNTY_LABEL}>
      <Select id={"newCounty"} name={"newCounty"}>
        {counties.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
