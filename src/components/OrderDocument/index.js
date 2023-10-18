import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import styles from "./styles";
import PersonSVG from "./PersonSVG";
import PhoneSVG from "./PhoneSVG";
import { POAddress, PODeliveryMode } from "../../models";
import PODecimalUtil from "../../utils/PODecimalUtil";
import LocationSVG from "./LocationSVG";
import LogoImage from "../../assets/logo.png";

export const renderOrderContent = (order) => {
  const customer = order.user;
  const address = POAddress.fromState(order.user_address);
  const deliveryFee =
    order.delivery_method === PODeliveryMode.delivery
      ? order?.site?.delivery_fee ?? 0
      : 0;

  const renderProduct = (
    key,
    productImage,
    productName,
    qty,
    price,
    subTotal,
    borderRequired
  ) => (
    <View key={key}>
      <View style={styles.productItem}>
        {/*{productImage === "Image" ? (*/}
        {/*  <Text style={{ width: 44, fontSize: 12 }}>Image</Text>*/}
        {/*) : (*/}
        {/*  <Image src={productImage} style={styles.productImage} />*/}
        {/*)}*/}
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.qty}>{qty}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.subTotal}>{subTotal}</Text>
      </View>
      {borderRequired && <View style={styles.border} />}
    </View>
  );

  return (
    <View>
      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer contact details</Text>
          <View style={styles.border} />
          <Text style={styles.sectionSubTitle}>Customer details:</Text>
          <View style={styles.sectionSubContainer}>
            <View style={styles.item}>
              <PersonSVG />
              <Text style={styles.sectionItem}>
                {customer?.first_name ?? ""} {customer?.last_name ?? ""}
              </Text>
            </View>
            <View style={styles.item}>
              <PhoneSVG />
              <Text style={styles.sectionItem}>{customer?.phone ?? ""}</Text>
            </View>
          </View>
          {order.user_address && (
            <>
              <Text style={styles.sectionSubTitle}>Delivery address:</Text>
              <View style={styles.sectionSubContainer}>
                <View style={styles.item}>
                  <PhoneSVG />
                  <Text style={styles.sectionItem}>
                    {customer?.phone ?? ""}
                  </Text>
                </View>
                <View style={styles.item}>
                  <LocationSVG />
                  <Text style={styles.sectionItem}>
                    {address?.formatted_address()}
                  </Text>
                </View>
                <View>
                  <Text style={styles.paymentSectionItem}>Delivery notes:</Text>
                  <Text style={[styles.sectionItem, { fontSize: 10 }]}>
                    {address?.notes ?? "No notes"}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
        <View style={{ width: "49%" }}>
          <View style={[styles.section, { width: "100%" }]}>
            <Text style={styles.sectionTitle}>Payment information</Text>
            <View style={styles.border} />
            <View style={styles.paymentItem}>
              <Text style={styles.paymentSectionItem}>Net cost</Text>
              <Text style={styles.sectionItem}>
                €{PODecimalUtil.getPriceDecimalNumber(order?.price ?? 0)}
              </Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentSectionItem}>Delivery fee</Text>
              <Text style={styles.sectionItem}>
                €{PODecimalUtil.getPriceDecimalNumber(deliveryFee)}
              </Text>
            </View>
            <View style={[styles.paymentItem, { marginTop: 4 }]}>
              <Text style={styles.paymentSectionItem}>Total</Text>
              <Text style={styles.sectionItem}>
                €
                {PODecimalUtil.getPriceDecimalNumber(
                  (order?.price ?? 0) + deliveryFee
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.productsContainer}>
        {renderProduct(
          0,
          "Image",
          "Product name",
          "Qty",
          "Price",
          "Subtotal",
          true
        )}
        {order.products.map((product, index) =>
          renderProduct(
            `${product.id}`,
            product.image,
            product.name,
            product.quantity,
            `€${PODecimalUtil.getPriceDecimalNumber(product?.price ?? 0)}`,
            `€${PODecimalUtil.getPriceDecimalNumber(product?.price ?? 0)}`,
            index < order.products.length - 1
          )
        )}
      </View>
    </View>
  );
};

const OrderDocument = ({ order }) => {
  if (order?.id == null) {
    return null;
  }

  const currentStatus =
    order.status?.charAt(0)?.toUpperCase() + order.status?.slice(1);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image source={LogoImage} style={styles.logo} />
          <Text style={[styles.headerTitle, { marginLeft: "auto" }]}>
            {"Order "}
          </Text>
          <Text style={[styles.headerTitle, { fontSize: 10 }]}>{order.id}</Text>
          <Text style={styles.status}>
            {currentStatus.replaceAll("_", " ")}
          </Text>
        </View>
        {renderOrderContent(order)}
      </Page>
    </Document>
  );
};

export default OrderDocument;
