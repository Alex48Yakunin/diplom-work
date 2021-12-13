import React from "react";
import TopSales from "./TopSales";
import Catalog from "./Catalog";

export default function Home() {
  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <TopSales />
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Catalog />
      </section>
    </>
  );
}