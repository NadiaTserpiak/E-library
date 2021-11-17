import config from "./config/config";

export const getMainImageUrl = (item) => {
  return item?.cover_imageConnection?.edges[0]?.node.url || config.defaultImages.small;
};

export const getBookPath = (item) => {
  return `/book${item.url}`
}
