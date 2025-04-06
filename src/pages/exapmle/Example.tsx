const Example = () => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
    },

    common_header_for_all_page: {
      paddingBottom: 20, // Space for A4 size header
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    content_title: {
      backgroundColor: "#1a472a",
      color: "white",
      padding: 10,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      columnGap: 16,
    },
    logo: {
      width: 60,
      height: 50,
    },
    content: {
      marginTop: 10,
      fontSize: 12,
      lineHeight: 1.5,
      textAlign: "justify", // Justify text decoration
    },
    block: {
      marginBottom: 20,
    },
  });

  const PDFDocument = ({ cards, output }) => (
    <Document>
      {cards.map((card, index) => (
        <Page key={index} size="A4" style={styles.page}>
          {/* Common Page Header For all pages */}
          <View style={styles.common_header_for_all_page}>
            <Image
              style={styles.logo}
              src="asset/member/images/logo.png" // Replace with the actual path to your logo
            />
          </View>
          {/*Content  Title */}
          <View style={styles.block}>
            <View style={styles.content_title}>
              <Text>{card.title}</Text>
            </View>
            <Text style={styles.content}>
              {output[index]?.output || card.content || "No content available"}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );

  return <div></div>;
};

export default Example;
