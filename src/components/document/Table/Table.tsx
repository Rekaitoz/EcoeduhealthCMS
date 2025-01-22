import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

export type TableData = {
  value: string | number;
  align?: 'right' | 'left' | 'center';
  weight?: 'normal' | 'bold';
  span?: number;
};

type Props = {
  data: TableData[][];
  sizes?: number[];
};

export const Table: React.FC<Props> = ({ data: rows, sizes }) => {
  const id = 'awdawdawd';

  function fontWeight(weight: TableData['weight']) {
    return {
      fontFamily: weight == 'bold' ? 'Times-Bold' : 'Times-Roman',
    };
  }

  function colSpan(data: TableData[]) {
    if (!sizes) return Array(rows[0].length).fill(rows[0].length / 100);

    const colSize = [...sizes];
    return data
      .map(({ span }) => span)
      .map((span) => {
        return colSize.splice(0, span || 1).reduce((x, y) => x + y);
      });
  }

  return (
    <View style={styles.table}>
      {rows.map((cols, i) => {
        const span = colSpan(cols);

        return (
          <View key={`${id}_${i}`} style={styles.tableRow}>
            {cols.map((col, j) => (
              <View
                key={`${id}_${i}_${j}`}
                style={[styles.tableCol, { width: `${span[j] * 100}%` }]}
              >
                <Text
                  style={[
                    styles.tableCell,
                    fontWeight(col.weight),
                    { textAlign: col.align ?? 'center' },
                  ]}
                >
                  {col.value}
                </Text>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
};
