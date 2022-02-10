import LawnmowerRepository from "../do-not-refactor/LawnmowerRepository";
import PhoneCaseRepository from "../do-not-refactor/PhoneCaseRepository";
import TShirtRepository from "../do-not-refactor/TShirtRepository";

export default function ProductDataConsolidator(currency) {
  var l = LawnmowerRepository();
  var p = PhoneCaseRepository();
  var t = TShirtRepository();
  console.log(l);
  const arr_names = [
    [l, "lawnmower"],
    [p, "Phone Case"],
    [t, "T-Shirt"],
  ];
  var products = [];

  let multiplier = currency == "euro" ? 0.67 : currency == "dollar" ? 0.76 : 1;

  for (let [arr, name] of arr_names) {
    for (var i = 0; i < arr.length; i++) {
      products.push({
        id: arr[i].id,
        name: arr[i].name,
        price: (arr[i].price * multiplier).toFixed(2),
        type: name,
      });
    }
  }

  return products;
}
