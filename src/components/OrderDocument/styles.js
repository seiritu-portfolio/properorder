import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "col",
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 60,
  },
  headerTitle: {
    fontSize: 8,
  },
  status: {
    fontSize: 10,
    marginLeft: 6,
  },

  // section
  sectionContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  section: {
    width: "49%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  sectionSubTitle: {
    fontSize: 16,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  sectionSubContainer: {
    flexDirection: "col",
    marginHorizontal: 6,
    paddingBottom: 4,
  },
  item: { flexDirection: "row", marginHorizontal: 6, alignItems: "center" },
  itemIcon: {
    width: 20,
    height: 20,
  },
  sectionItem: {
    fontSize: 14,
    marginLeft: 4,
    color: "gray",
    marginVertical: 1,
  },
  paymentItem: {
    flexDirection: "row",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentSectionItem: {
    fontSize: 14,
    marginLeft: 4,
  },

  border: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
  },

  // products
  productsContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 16,
  },
  productItem: {
    flexDirection: "row",
    marginVertical: 2,
    marginHorizontal: 8,
    alignItems: "center",
    minHeight: 24,
  },
  productImage: {
    width: 44,
    height: 36,
  },
  productName: {
    fontSize: 12,
    marginLeft: 6,
    flex: 1,
  },
  qty: {
    fontSize: 12,
    marginLeft: 6,
  },
  price: {
    fontSize: 12,
    marginLeft: 6,
    width: 50,
    textAlign: "center",
  },
  subTotal: {
    fontSize: 12,
    marginLeft: 6,
    width: 60,
    textAlign: "center",
  },
});

export default styles;
