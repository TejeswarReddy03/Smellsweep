import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./datetime.css"; // Import CSS file for styling

const Datetimefun = (props) => {
    // Check if the status attribute is true
    console.log("in datetime");
    console.log(props.obj);
    const shouldRenderGraph = props.obj && props.obj.status;

    return (
        <div className="dummy-value-metrics-container">
<<<<<<< HEAD
=======
            {/* <pre>{JSON.stringify(props.datetime_obj, null, 2)}</pre> */}
>>>>>>> 005f619138ea864926f1a3eed1556d964f13461e
            {shouldRenderGraph ? (
                <StatisticsChart data={props.obj} />
            ) : (
                <p style={{ color: 'black', fontWeight: 'bold',fontSize:'30px' }}>No datetime data smells detected.</p>
               
            )}
        </div>
    );
};

const StatisticsChart = ({ data }) => {
    // Filter out non-datetime related columns
    const filteredData = Object.entries(data)
        .filter(([key, value]) => typeof value === 'object' && 'mixed_type_percentage' in value)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    // Transform filtered data into an array of objects with the column names and their statistics
    const chartData = Object.keys(filteredData).map(key => ({
        name: key,
        mixedTypePercentage: filteredData[key].mixed_type_percentage,
        uniqueDatePercentage: filteredData[key].unique_date_percentage,
        uniqueTimePercentage: filteredData[key].unique_time_percentage,
    }));

    // Prepare row counts data for rendering in a table
    const rowCountsData = Object.keys(filteredData).map(key => ({
        column: key,
        totalRows: filteredData[key].row_counts.total_rows,
        mixedTypeRows: filteredData[key].row_counts.mixed_type_rows,
        uniqueDateRows: filteredData[key].row_counts.unique_date_rows,
        uniqueTimeRows: filteredData[key].row_counts.unique_time_rows,
    }));

    return (
        <div>
            <h2>Statistics for Columns</h2>
            <div style={{ maxWidth:'620px',backgroundColor: 'white', padding: '20px', transition: 'all 1s ease' }}>

            <BarChart width={600} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mixedTypePercentage" stackId="a" fill="#8884d8" />
                <Bar dataKey="uniqueDatePercentage" stackId="a" fill="#82ca9d" />
                <Bar dataKey="uniqueTimePercentage" stackId="a" fill="#ffc658" />
            </BarChart>
            </div>
            <p style={{ color: 'black', fontWeight: 'bold',height:'14px',marginBottom:'20px',marginTop:'20px' }}>Details</p>
            
            <table className="row-counts-table">
                <thead>
                    <tr>
                        <th>Column</th>
                        <th>Total Rows</th>
                        <th>Mixed Type Rows</th>
                        <th>Unique Date Rows</th>
                        <th>Unique Time Rows</th>
                    </tr>
                </thead>
                <tbody>
                    {rowCountsData.map(row => (
                        <tr key={row.column}>
                            <td>{row.column}</td>
                            <td>{row.totalRows}</td>
                            <td>{row.mixedTypeRows}</td>
                            <td>{row.uniqueDateRows}</td>
                            <td>{row.uniqueTimeRows}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Datetimefun;
