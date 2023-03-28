import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

interface Props {
  children: React.ReactNode;
}

export default function AuthProtect({ children }: Props): JSX.Element {
  const { voluntarioId } = useAppContext();

  if (!voluntarioId) {
    return <Navigate to="/login" />;
  }
  return children as JSX.Element;
}
