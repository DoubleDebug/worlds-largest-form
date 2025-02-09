import styles from "./Form.module.css";
import { Box } from "@mui/joy";
import { FormInput } from "./FormInput";
import { FC, useEffect, useState } from "react";
import { useFormState } from "../hooks/useFormState";
import { handleConnect, handleDisconnect } from "../utils/websocket";

export const Form: FC = () => {
  const { values } = useFormState();
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  useEffect(() => {
    if (isFirstTime && values.length > 0) {
      handleConnect();
      setIsFirstTime(false);
    }
  }, [isFirstTime, values]);

  useEffect(() => {
    return () => handleDisconnect();
  }, []);

  return (
    <Box component="form">
      {values.map((value) => (
        <Box key={value.id} className={styles["input-container"]}>
          <FormInput {...value} />
        </Box>
      ))}
    </Box>
  );
};
