import React from 'react'
import { useTranslation } from 'react-i18next';
import {
    PDFViewer,
    Document,
    Page,
    Text,
    StyleSheet,
    Font,
    PDFDownloadLink,
    View,
    Image,
    pdf,
} from "@react-pdf/renderer";


// Register fonts
Font.register({
    family: "kalpurush",
    src: "kalpurush.ttf",
    format: "truetype",
});
Font.register({
    family: "OldeEnglish",
    src: "OldeEnglish.ttf",
    format: "truetype",
});

Font.register({
    family: "DancingScript",
    src: "DancingScript-VariableFont_wght.ttf",
    format: "truetype",
});
// Styles
// const styles = StyleSheet.create({
//     page: {
//         position: "relative",
//         padding: 30,
//         fontFamily: "kalpurush",
//     },
//     border: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         zIndex: -1,
//     },
//     topBorder: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         height: 20, // Height of the top border
//         width: "80%", // Extend only partway to create the L-shape
//         backgroundColor: "#006A4E", // Green border color
//     },
//     leftBorder: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: 20, // Width of the left border
//         height: "20%", // Extend only partway to create the L-shape
//         backgroundColor: "#006A4E", // Green border color
//     },
//     bottomBorder: {
//         marginTop: 100,
//         position: "absolute",
//         bottom: 0,
//         right: 0,
//         height: 20,
//         width: "80%",
//         backgroundColor: "orange",
//     },
//     rightBorder: {
//         position: "absolute",
//         bottom: 0,
//         right: 0,
//         width: 20,
//         height: "20%",
//         backgroundColor: "orange",
//     },
//     header: {
//         fontSize: 14,
//         textAlign: "center",
//         marginBottom: 10,
//         fontWeight: "bold",
//     },
//     ParentsName: {
//         fontSize: 15,
//         textAlign: "center",
//         marginBottom: 5,
//     },
//     BanglaHeading: {
//         fontSize: 25,
//         textAlign: "center",
//         marginBottom: 5,
//     },
//     logoSection: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: 10,
//     },
//     logo: {
//         width: 60,
//         height: 60,
//     },
//     regRefSection: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: 10,
//         marginTop: 10,
//         fontSize: 10,
//     },
//     title: {
//         fontSize: 50,
//         textAlign: "center",
//         fontWeight: "bold",
//         marginBottom: 10,
//         marginTop: 10,
//         fontFamily: "OldeEnglish", // Custom font for title
//     },
//     certificateText: {
//         fontSize: 30,
//         marginBottom: 5,
//         marginTop: 10,
//         textAlign: "center",
//         fontFamily: "DancingScript", // Custom font for certificate text
//     },
//     bodyText: {
//         fontSize: 15,
//         textAlign: "center",
//     },
//     bodyContent: {
//         marginBottom: 10,
//         fontSize: 15,
//         textAlign: "left",
//     },
//     TrainingName: {
//         fontSize: 20,
//         marginBottom: 10,
//         marginTop: 10,
//         textAlign: "center",
//         fontWeight: "ultralight",
//     },
//     competencyHeader: {
//         fontSize: 14,
//         marginBottom: 2,
//         marginTop: 10,
//         textAlign: "center",
//         fontWeight: "bold",
//     },
//     competencyList: {
//         fontSize: 11,
//         marginBottom: 2,
//     },
//     footer: {
//         marginTop: 150,
//         marginBottom: 100,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 30,
//     },
//     footerSection: {
//         textAlign: 'center',
//         flex: 1,
//         borderTopWidth: 1,
//         borderTopColor: '#000',
//         paddingTop: 5,
//         marginHorizontal: 5,
//     },
//     footerText: {
//         fontSize: 10,
//     },
// });
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Helvetica",
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
    },
    table: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#000",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableHeader: {
        backgroundColor: "#f0f0f0",
        borderWidth: 1,
        borderColor: "#000",
        padding: 4,
        flex: 1,
        textAlign: "center",
        fontSize: 10,
        fontWeight: "bold",
    },
    tableSubHeader: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 4,
        flex: 1,
        textAlign: "center",
        fontSize: 10,
        backgroundColor: "#e0e0e0",
    },
    tableCell: {
        borderWidth: 1,
        borderColor: "#000",
        padding: 4,
        flex: 1,
        textAlign: "center",
        fontSize: 10,
    },
    durationRow: {
        marginBottom: 10,
        fontSize: 12,
        fontWeight: "bold",
    },
});
// Document
const Report = ({ DataForReport, fromYear, toYear, selectedTarget }) => (
    <>
    {selectedTarget === "PO_Target" ? (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Title */}
                <Text style={styles.title}>Target & Achievement Report</Text>

                {/* Duration */}
                <Text style={styles.durationRow}>Duration: {fromYear}-{toYear}</Text>

                {/* Table */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Project</Text>
                        <Text style={styles.tableHeader}>PO</Text>
                        <Text style={[styles.tableHeader, { flex: 3 }]}>
                            Given
                        </Text>
                        <Text style={[styles.tableHeader, { flex: 3 }]}>
                            Achieved
                        </Text>
                    </View>

                    {/* Subheadings for Given and Achieved */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableSubHeader}>Name</Text>
                        <Text style={styles.tableSubHeader}>Name</Text>
                        <Text style={styles.tableSubHeader}>Outreached People</Text>
                        <Text style={styles.tableSubHeader}>Number of Outreach</Text>
                        <Text style={styles.tableSubHeader}>Skilled People</Text>
                        <Text style={styles.tableSubHeader}>Outreached People</Text>
                        <Text style={styles.tableSubHeader}>Number of Outreach</Text>
                        <Text style={styles.tableSubHeader}>Skilled People</Text>
                    </View>

                    {/* Table Rows */}
                    {DataForReport?.map((data, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{data?.projectName}</Text>
                            <Text style={styles.tableCell}>{data?.partnerOrganizationName}</Text>
                            <Text style={styles.tableCell}>{data?.givenOutreachedPeople}</Text>
                            <Text style={styles.tableCell}>{data?.givenNumberOfOutreach}</Text>
                            <Text style={styles.tableCell}>{data?.givenSkilledPerson}</Text>
                            <Text style={styles.tableCell}>{data?.achievedOutreachedPeople}</Text>
                            <Text style={styles.tableCell}>{data?.achievedNumberOfOutreach}</Text>
                            <Text style={styles.tableCell}>{data?.achievedSkilledPerson}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    ) : selectedTarget === "Branch_Target" ? (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Title */}
                <Text style={styles.title}>Target & Achievement Report</Text>

                {/* Duration */}
                <Text style={styles.durationRow}>Duration: {fromYear}-{toYear}</Text>

                {/* Table */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Project</Text>
                        <Text style={styles.tableHeader}>PO</Text>
                        <Text style={styles.tableHeader}>Branch</Text>
                        <Text style={[styles.tableHeader, { flex: 3 }]}>
                            Given
                        </Text>
                        <Text style={[styles.tableHeader, { flex: 3 }]}>
                            Achieved
                        </Text>
                    </View>

                    {/* Subheadings for Given and Achieved */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableSubHeader}>Name</Text>
                        <Text style={styles.tableSubHeader}>Name</Text>
                        <Text style={styles.tableSubHeader}>Name</Text>
                        <Text style={styles.tableSubHeader}>Outreached People</Text>
                        <Text style={styles.tableSubHeader}>Number of Outreach</Text>
                        <Text style={styles.tableSubHeader}>Skilled People</Text>
                        <Text style={styles.tableSubHeader}>Outreached People</Text>
                        <Text style={styles.tableSubHeader}>Number of Outreach</Text>
                        <Text style={styles.tableSubHeader}>Skilled People</Text>
                    </View>

                    {/* Table Rows */}
                    {DataForReport?.map((data, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{data?.projectName}</Text>
                            <Text style={styles.tableCell}>{data?.partnerOrganizationName}</Text>
                            <Text style={styles.tableCell}>{data?.branchName}</Text>
                            <Text style={styles.tableCell}>{data?.givenOutreachedPeople}</Text>
                            <Text style={styles.tableCell}>{data?.givenNumberOfOutreach}</Text>
                            <Text style={styles.tableCell}>{data?.givenSkilledPerson}</Text>
                            <Text style={styles.tableCell}>{data?.achievedOutreachedPeople}</Text>
                            <Text style={styles.tableCell}>{data?.achievedNumberOfOutreach}</Text>
                            <Text style={styles.tableCell}>{data?.achievedSkilledPerson}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    ) : null}
</>
);

const TrainingReportPDF = ({ dataForReport, fromYear, toYear, selectedTarget }) => {
    const { t } = useTranslation();
    const DataForReport = dataForReport
    console.log(DataForReport, fromYear, toYear)
    return (
        <div>
            {/* Render the dataForReport here */}
            <div className="mt-5">
                <PDFDownloadLink
                    document={<Report DataForReport={DataForReport} toYear={toYear} fromYear={fromYear} selectedTarget={selectedTarget} />}
                // fileName={`${t('Report')} ${participantInfo?.participantName}(EN).pdf`}
                >
                    <button type="button" className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                        {t('Download PDF')}
                    </button>
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default TrainingReportPDF;
