import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { SEARCH_CONVERSATION_PLACEHOLDER } from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { MessagesContext } from "./MessagesProvider";

export const ConversationFilter: React.FC<{}> = ({}) => {
  //Color context
  const {
    theme: { BG_COLOR, FRONT_COLOR_LIGHTER, FRONT_COLOR_LIGHTEST },
  } = useContext(ThemeContext);

  //Messages context
  const {
    state: { filter },
    dispatch,
  } = useContext(MessagesContext);

  const handleFilterOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setFilter", payload: { filter: event.target.value } });
  };

  return (
    <InputGroup mb={4}>
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
      <Input
        bgColor={BG_COLOR}
        borderColor={FRONT_COLOR_LIGHTER}
        borderWidth={"0.15rem"}
        _hover={{ borderColor: FRONT_COLOR_LIGHTEST }}
        placeholder={SEARCH_CONVERSATION_PLACEHOLDER}
        onChange={handleFilterOnChange}
        value={filter}
      />
    </InputGroup>
  );
};
