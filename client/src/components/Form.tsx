import { Box } from "@mui/joy";
import { FC, useEffect } from "react";
import { FormInput } from "./FormInput";
import { useFormState } from "../stores/form";
import { handleConnect, handleDisconnect } from "../stores/websocket";

export const Form: FC = () => {
  const { values } = useFormState();

  useEffect(() => {
    handleConnect();

    return () => handleDisconnect();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "8px",
        "& > *": {
          flex: `1 1 calc(100% / 10 - 16px)`,
          height: "100px",
        },
      }}
    >
      {values.map((value) => (
        <Box
          key={value.id}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormInput {...value} />
        </Box>
      ))}
    </Box>
  );
};
