import React, { useEffect, useState } from "react";
import { Flex, Image } from "@chakra-ui/react";

interface DropzoneThumbProps {
  file: File;
  dropzone?: boolean;
}

export const DropzoneThumb: React.FC<DropzoneThumbProps> = ({
  file,
  dropzone = false,
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
    <Flex
      justify={"space-around"}
      align={"center"}
      h={dropzone ? "200px" : "100%"}
      mr={dropzone ? 0 : 4}
    >
      <Image
        src={thumb}
        maxH={"100%"}
        h={dropzone ? "200px" : "100%"}
        objectFit="cover"
      />
    </Flex>
  );
};
