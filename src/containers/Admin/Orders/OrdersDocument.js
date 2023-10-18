import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import LogoImage from "../../../assets/logo.png";
import { renderOrderContent } from "../../../components/OrderDocument";

const styles = StyleSheet.create({
  page: {
    flexDirection: "col",
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 65,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
  },
  logo: {
    height: 60,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  // Order
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 8,
  },
  status: {
    fontSize: 10,
    marginLeft: 6,
  },
});

const OrdersDocument = ({ orders }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <Image source={LogoImage} style={styles.logo} />
        </View>
        {orders.map((order, index) => {
          const currentStatus =
            order.status?.charAt(0)?.toUpperCase() + order.status?.slice(1);
          return (
            <View key={order.id} wrap={false}>
              <View
                style={[styles.orderHeader, { marginTop: index === 0 ? 0 : 8 }]}
              >
                <Text style={[styles.headerTitle, { marginLeft: "auto" }]}>
                  {"Order "}
                </Text>
                <Text style={[styles.headerTitle, { fontSize: 10 }]}>
                  {order.id}
                </Text>
                <Text style={styles.status}>
                  {currentStatus.replaceAll("_", " ")}
                </Text>
              </View>
              {renderOrderContent(order)}
            </View>
          );
        })}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default OrdersDocument;
