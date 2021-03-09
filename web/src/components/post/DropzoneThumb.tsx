import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

interface DropzoneThumbProps {
  file: File;
  dropzone?: boolean;
}

export const DropzoneThumb: React.FC<DropzoneThumbProps> = ({
  file,
  dropzone = true,
}) => {
  const [thumb, setThumb] = useState(undefined);

  useEffect(() => {
    if (!file) {
      return;
    }

    setThumb(() => {
      let reader = new FileReader();

      reader.onloadend = () => {
        setThumb(reader.result);
      };

      reader.readAsDataURL(file);
    });
  }, [file]);

  return (
    <Image
      src={thumb}
      h="100%"
      w="auto"
      maxH="300px"
      maxW="150px"
      objectFit="cover"
      mr={4}
    />
  );
};
