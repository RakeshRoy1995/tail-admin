export const ExpandTable = ({ data, parentKey = '' }) => {
    return (
      <table  style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
        <tbody>
          {Object.keys(data).map((key) => {
            const value = data[key];
            return (
              <tr key={parentKey ? `${parentKey}.${key}` : key}>
                <td style={{ padding: '8px', fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                  {parentKey ? `${key}` : key}
                </td>
                <td style={{ padding: '8px' }}>
                  {typeof value === 'object' && value !== null ? (
                    Array.isArray(value) ? (
                      value.length > 0 ? (
                        value.map((item, index) => (
                          <div key={index} style={{ marginBottom: '10px' }}>
                            <ExpandTable data={item} parentKey={`${key}[${index}]`} />
                          </div>
                        ))
                      ) : (
                        <em>No Data</em>
                      )
                    ) : (
                      <ExpandTable data={value} parentKey={key} />
                    )
                  ) : (
                    value !== null ? value.toString() : <em>N/A</em>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };