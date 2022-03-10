import { ApolloError } from "@apollo/client";
import React, { useEffect } from "react";

export const useError = (error?: ApolloError) => {
  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);
};
