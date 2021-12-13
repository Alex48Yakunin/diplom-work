import React from "react";
import Catalog from "./Catalog";

export default function CatalogWrap({ history, location }) {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <Catalog location={location} history={history} />
    </section>
  );
}