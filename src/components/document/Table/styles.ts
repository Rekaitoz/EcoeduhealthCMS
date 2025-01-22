import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  fontBold: {
    fontFamily: 'Times-Bold',
  },
  fontNormal: {
    fontFamily: 'Times-Roman',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 4,
    fontSize: 12,
    display: 'flex',
  },
});
