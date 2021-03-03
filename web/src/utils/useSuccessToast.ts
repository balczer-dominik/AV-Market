import { useToast } from "@chakra-ui/react";

type toastType = "success" | "error";

export const useBetterToast = () => {
  const toast = useToast();
  const successToast = (type: toastType, label: string, desc?: string) => {
    toast({
      title: label,
      description: desc,
      status: type,
      duration: 5000,
      position: "bottom-left",
    });
  };

  return successToast;
};
