import React from "react";
import { classNames } from "./classes";
import ProductImagePlaceholder from "../../../assets/image_placeholder.png";
import clsx from "clsx";
import PODecimalUtil from "../../../utils/PODecimalUtil";

export default function ItemSummary({ order }) {
  const { products = [] } = order;
  return (
    <div className={clsx(classNames.headerContainer, "col-span-2")}>
      <header className={classNames.headerTitle}>
        Items{" "}
        <span className={"text-sm text-po-graydark"}>({products.length})</span>
      </header>
      <div className={"flex flex-col overflow-x-hidden"}>
        <div className="overflow-x-auto sm:-mx-4 lg:-mx-6">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="db-product-th">
                      Image
                    </th>
                    <th scope="col" className="db-product-th">
                      Product name
                    </th>
                    <th scope="col" className="db-product-th">
                      Qty
                    </th>
                    <th scope="col" className="db-product-th">
                      Price
                    </th>
                    <th scope="col" className="db-product-th">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product, index) => {
                    return (
                      <tr key={`${index}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                          <img
                            className="h-10 w-16 object-cover"
                            src={product.image ?? ProductImagePlaceholder}
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={"flex"}>
                            <div className="text-base font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base font-medium text-gray-900">
                            {product.quantity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base font-medium text-gray-900">
                            {`€${PODecimalUtil.getPriceDecimalNumber(
                              product?.price ?? 0
                            )}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base font-medium text-gray-900">
                            {`€${PODecimalUtil.getPriceDecimalNumber(
                              product?.price ?? 0
                            )}`}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={"block items-center space-x-4 p-4"}>
          <span className={"text-base font-bold"}>Order notes:</span>
          <span className={"text-sm font-medium text-po-graydark"}>
            {order.gift_note ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
}
