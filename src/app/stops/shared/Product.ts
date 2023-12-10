type Product = { product: string; localizedText: string };

const products: Product[] = [
  {
    product: 'Bus',
    localizedText: $localize`:@@ProductBus:Bus`,
  },
  {
    product: 'Tram',
    localizedText: $localize`:@@ProductTram:Tram`,
  },
  {
    product: 'UBahn',
    localizedText: $localize`:@@ProductUnderground:Underground`,
  },
];

export function getLocalizedProduct(product: string) {
  return (
    products.find((productType) => product == productType.product)
      ?.localizedText ?? product
  );
}
