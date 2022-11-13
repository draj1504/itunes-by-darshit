export const getNormailisedObject = (c) => {
  if (typeof c.id === "object") {
    var configData = {
      name: c["im:name"].label,
      category: c?.category?.attributes?.label,
      id: c?.id?.label,
      artist: { name: c["im:artist"]?.label, link: c["im:artist"]?.href },
      contentType: c["im:contentType"].attributes.term,
      image: c["im:image"][2],
      itemCount: c["im:itemCount"]?.label,
      price: c["im:price"]?.label,
      releaseDate: {
        date: c["im:releaseDate"]?.attributes?.label,
        dateAndTime: c["im:releaseDate"]?.label,
      },
      links: c?.link?.attributes,
      rights: c?.rights?.label,
      title: c?.title?.label,
    };
    return configData;
  } else if (typeof c.id === "string") {
    console.log("c is:", c);
    return c;
  }
};

export function containsObject(obj, list) {
  var i;
  if (list?.length > 0)
    for (i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
        console.log("found:", obj);
        return true;
      }
    }

  return false;
}
