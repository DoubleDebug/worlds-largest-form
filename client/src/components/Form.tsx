import { FC } from "react";
import { Box } from "@mui/joy";
import { FormInput } from "./FormInput";
import { FORM_TYPES } from "../types/form";

const NUM_OF_COLUMNS = 10;

export const Form: FC = () => {
  const inputIndices = Array.from({ length: 100 }, (_, i) => i);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "8px",
        "& > *": {
          flex: `1 1 calc(100% / ${NUM_OF_COLUMNS} - 16px)`,
          height: "100px",
        },
      }}
    >
      {inputIndices.map((index) => {
        const randomIndex = Math.floor(Math.random() * FORM_TYPES.length);
        const inputType = FORM_TYPES[randomIndex];

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            <FormInput type={inputType} />
          </Box>
        );
      })}
    </Box>
  );
};
