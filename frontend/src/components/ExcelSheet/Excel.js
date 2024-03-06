import "./excel.css";
import {
  RangeDirective,
  RangesDirective,
  SheetDirective,
  SheetsDirective,
  SpreadsheetComponent,
  ColumnDirective,
  ColumnsDirective,
} from "@syncfusion/ej2-react-spreadsheet";



// Registering Syncfusion license key
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Mgo+DSMBaFt+QHFqVkNrWU5FckBAXWFKblJ8RWZTelpgBShNYlxTR3ZbQ1pjSHpadkdiWn5X;Mgo+DSMBPh8sVXJ1S0d+X1RPc0BDWXxLflF1VWJTf1t6cVFWESFaRnZdQV1nSHlTd0FqWX1fdXRc;ORg4AjUWIQA/Gnt2VFhhQlJBfVpdXGdWfFN0RnNYdV51flBCcC0sT3RfQF5jTX9UdkRnUH9ccXNUTw==;MTc0MzQ4OEAzMjMxMmUzMTJlMzMzNUFvbDJNM3J4cExNckl0akFzNHBEM1dEWkNpTWRQWHUvL2l6VitudllBbDA9;MTc0MzQ4OUAzMjMxMmUzMTJlMzMzNVF0L3dJZlRkUW0rVWJFdTc4SGNzRFpmMW1GMnJ5U2o3dnN6YmMvRit2Zmc9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RHQmJNYVF2R2BJflRwcV9DZEwgOX1dQl9gSXpScUViXXZecnZWRmk=;MTc0MzQ5MUAzMjMxMmUzMTJlMzMzNUhkTFIrMnVIemtyb0ErWmUzYU5yK1JkUVZ6N0o0NSs1Mm90Q3pJNXNUUE09;MTc0MzQ5MkAzMjMxMmUzMTJlMzMzNURtWEVuZGZLV21LM2JBVys4am1HNXV0UDlnaUVSVHF4SWw2MWlnRzY0SGs9;Mgo+DSMBMAY9C3t2VFhhQlJBfVpdXGdWfFN0RnNYdV51flBCcC0sT3RfQF5jTX9UdkRnUH9ccn1WTw==;MTc0MzQ5NEAzMjMxMmUzMTJlMzMzNWJETDIwZmV3TUtxckQ2WFJGZjdwSFVIdkhhMGkwdFRqQW85Rm5LeEhER2M9;MTc0MzQ5NUAzMjMxMmUzMTJlMzMzNWYvQ08zakxEUkZCTUd2dGtEZmMxcTFudXFnRityWVhsZjl4YzkzYUc4bWs9;MTc0MzQ5NkAzMjMxMmUzMTJlMzMzNUhkTFIrMnVIemtyb0ErWmUzYU5yK1JkUVZ6N0o0NSs1Mm90Q3pJNXNUUE09"
);

function Excel(props) {

  return (
    <div className="Sheet">
      <SpreadsheetComponent
        allowOpen={true}
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
      >
        <SheetsDirective>
          <SheetDirective>
            <RangesDirective>
              <RangeDirective dataSource={props.myjson}></RangeDirective>
            </RangesDirective>
            <ColumnsDirective>
              <ColumnDirective width={160}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
            </ColumnsDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </div>
  );
}

export default Excel;
