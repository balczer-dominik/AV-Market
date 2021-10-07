import {
  BUYER_DOESNT_EXIST,
  SELLER_DOESNT_EXIST,
  DRIVER_DOESNT_EXIST,
  AD_DOESNT_EXIST,
  AD_ARCHIEVED,
  AD_DOESNT_BELONG_TO_SELLER,
  INVALID_TIME,
  INVALID_LOCATION,
  USER_DOESNT_DELIVER,
} from "../resource/strings";
import { Ad } from "../entities/Ad";
import { User } from "../entities/User";
import { errorResponse } from "../util/errorResponse";
import { FieldError } from "../util/type-graphql/FieldError";

export const validateDelivery = (
  time: Date,
  longitude: number,
  latitude: number,
  buyer?: User,
  seller?: User,
  driver?: User,
  ad?: Ad
): {
  errors: [FieldError];
} | null => {
  if (!buyer) {
    return errorResponse("buyer", BUYER_DOESNT_EXIST);
  }
  if (!seller) {
    return errorResponse("seller", SELLER_DOESNT_EXIST);
  }
  if (!driver) {
    return errorResponse("driver", DRIVER_DOESNT_EXIST);
  }
  if (!ad) {
    return errorResponse("ad", AD_DOESNT_EXIST);
  }
  if (ad.archieved) {
    return errorResponse("ad", AD_ARCHIEVED);
  }
  if (ad.ownerId !== seller.id) {
    return errorResponse("ad", AD_DOESNT_BELONG_TO_SELLER);
  }
  if (time.getTime() < Date.now()) {
    return errorResponse("time", INVALID_TIME);
  }
  if (longitude > 80 || longitude < -180) {
    return errorResponse("location", INVALID_LOCATION);
  }
  if (latitude > 90 || latitude < -90) {
    return errorResponse("location", INVALID_LOCATION);
  }
  if (!driver.delivers) {
    return errorResponse("driver", USER_DOESNT_DELIVER);
  }

  return null;
};
