let offers = [];

const setOffers = (data) => {
  offers = data;
};

const getOffers = () => [...offers];

export { setOffers, getOffers };
