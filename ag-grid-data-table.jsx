import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { mocksOrderData } from '../../__mocks__/orders';
import { useState } from 'react';

import { Pill } from './Pill';

const filterParams = {
	comparator: function (filterLocalDateAtMidnight, cellValue) {
		var dateAsString = cellValue;
		if (dateAsString == null) return -1;
		var dateParts = dateAsString.split('/');
		var cellDate = new Date(
			Number(dateParts[2]),
			Number(dateParts[1]) - 1,
			Number(dateParts[0])
		);
		if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
			return 0;
		}
		if (cellDate < filterLocalDateAtMidnight) {
			return -1;
		}
		if (cellDate > filterLocalDateAtMidnight) {
			return 1;
		}
	},
	browserDatePicker: true,
	minValidYear: 2000,
	maxValidYear: 2021,
};

const AgDataTable = () => {

	const [columnDefs] = useState([
		{ field: 'orderNo', sortable: true, filter: true, cellStyle : {border: 'none'} },
		{ field: 'partyName', sortable: true , cellStyle : {border: 'none'} },
		{ field: 'deliveryBoyName', sortable: true , cellStyle : {border: 'none'} },
		{ field: 'status', sortable: true, cellRenderer: "pill", cellStyle : {border: 'none'}  },
		{
			field: 'dispatchedTime',
			sortable: true,
			filter: 'agDateColumnFilter',
			filterParams: {
				// provide comparator function
				comparator: (filterLocalDateAtMidnight, cellValue) => {
					const dateAsString = cellValue;

					if (dateAsString == null) {
						return 0;
					}

					// In the example application, dates are stored as dd/mm/yyyy
					// We create a Date object for comparison against the filter date
					const dateParts = dateAsString.split('-');
					const day = Number(dateParts[2]);
					const month = Number(dateParts[1]) - 1;
					const year = Number(dateParts[0]);
					const cellDate = new Date(year, month, day);

					// Now that both parameters are Date objects, we can compare
					if (cellDate < filterLocalDateAtMidnight) {
						return -1;
					} else if (cellDate > filterLocalDateAtMidnight) {
						return 1;
					}
					return 0;
				}
			},
			cellStyle : {border: 'none'}
		},
	]);

	const [rowData] = useState(mocksOrderData);
	return (
		<>
			{/* <h1>ag grid data table</h1> */}
			<div className="ag-theme-material" style={{ width: 1000, height: 400 }}>
				<AgGridReact
					frameworkComponents={{
						pill: Pill
					}}
					style={{ width: '100%', height: '100%' }}
					rowStyle ={{border : 'none'}}
					rowData={rowData}
					columnDefs={columnDefs}
					enableCellTextSelection ={true}
				/>
			</div>
		</>
	);
};

export default AgDataTable;
