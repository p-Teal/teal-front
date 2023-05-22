import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  children: React.ReactNode;
}

export default function AuthProtect({ children }: Props): JSX.Element {
  const { voluntarioId, loadingApp, ativo } = useAppContext();

  if (loadingApp) {
    return <LoadingSpinner fullScreen />;
  }

  if (!voluntarioId || voluntarioId === "" || !ativo) {
    return <Navigate to="/login" />;
  }
  return children as JSX.Element;
}
