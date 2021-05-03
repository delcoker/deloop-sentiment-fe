import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DataTable from "react-data-table-component";
// import { CubeContext } from "@cubejs-client/react";
import ActionComponent from "../components/ActionComponent";
import AddFormDialog from "../components/AddFormDialog";
import { Card, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axiosConfig from "../_helpers/axiosConfig";


const data = [{
		id: 1,
		name: 'Twitter',
		is_authorized: false,
},
		{
				id: 2,
				name: 'Facebook',
				is_authorized: true,
		},
		{
				id: 3,
				name: 'Reddit',
				is_authorized: true,
		},
		{
				id: 4,
				name: 'YouTube',
				is_authorized: true,
		},
];

const columnsPlatform = [
		{
				name: "id",
				selector: (id) => id,
				sortable: true,
				omit: true,
		},
		{
				name: "Platform",
				selector: (platform) => platform['name'],
				sortable: true,
				wrap: true,
				// grow: 2,
		},
		// {
		// 		name: "Authorized",
		// 		selector: authorized => (authorized['is_authorized'] && "YES") || "NO",
		// 		sortable: true,
		// 		wrap: true,
		// },
		{
				name: "Allow / Revoke",
				cell: (row) => <Button onClick={() => twitter_redirect(row['name'])} variant="contained"
															 color="primary">{(row['is_authorized'] && "REVOKE") || "ALLOW"}</Button>,
				button: true,
				sortable: true,

		},
		// {
		// 		name: "Revoke",
		// 		cell: (revoke) => <Button variant="contained" color="primary">{revoke['revoke'] && "REVOKE"}</Button>,
		// 		button: true,
		// 		sortable: true,
		// 		wrap: true,
		// },
];


const twitter_redirect = (platform) => {
		if (platform.toLowerCase() === "twitter") {
				const url = "/login/twitter";

				axiosConfig.get(url)
					.then(function (response) {
							window.location = response.data.url;
					})
					.catch(function (error) {
							console.log(error);
					});
		}
};

const TrackPage = () => {
		// const { cubejsApi } = React.useContext(CubeContext);
		const [theme, setTheme] = useState("dark");
		const [filterPeopleText, setFilterPeopleText] = useState("");
		const [filterIssuesText, setFilterIssuesText] = useState("");
		const [people, setPeople] = useState([]);
		const [filteredPeople, setFilteredPeople] = useState([]);
		const [open, setOpen] = useState(false);
		const [categoryType, setCategoryType] = useState("");
		const [expandOnRowClick, setExpandOnRowClick] = React.useState(false);
		const [addOrEdit, setAddOrEdit] = useState("Add");
		const [rowData, setRowData] = useState();

		const handleChange = () => {
				if (theme === "dark") {
						setTheme("default");
				} else {
						setTheme("dark");
				}
		};

		const handleClear = (type) => {
				if (type === "user") {
						setFilterPeopleText("");
						setFilteredPeople(people);
				}
		};


		const actions = (type) => (
			<ActionComponent
				onFilter={(e) => {
						const text = e.target.value;
						if (type === "user") {
								setFilterPeopleText(text);
								setFilteredPeople(
									people.filter(
										(person) =>
											(person["UsersOfInterest.name"] &&
												person["UsersOfInterest.name"]
													.toLowerCase()
													.includes(text.toLowerCase())) ||
											(person["UsersOfInterest.keywords"] &&
												person["UsersOfInterest.keywords"]
													.toLowerCase()
													.includes(text.toLowerCase()))
									)
								);
						}
				}}
				onClear={() => handleClear(type)}
				filterText={type === "user" ? filterPeopleText : filterIssuesText}
				onClick={() => {
						addOrEditPresets({}, "Add", type);
				}}
				tooltip={type === "user" ? "Add A New Person" : "Add A New Issue"}
				placeholder={"Filter by name & keywords"}
			/>
		);

		const addOrEditPresets = (row, crudType, categoryType) => {
				setOpen(!open);
				setAddOrEdit(crudType);
				setCategoryType(categoryType);
				setRowData(row);
		};

		const handleOnRowClicked = (row, editCategory) => {
				addOrEditPresets(row, "Edit", editCategory);
				return setExpandOnRowClick(!expandOnRowClick);
		};

		return (
			<Card>
					<CardContent>
							<Grid container spacing={3} justify="space-between">
									<AddFormDialog
										open={open}
										onClose={() => setOpen(false)}
										showPosition={categoryType === "user"}
										title={
												categoryType === "user"
													? `${addOrEdit} Person`
													: `${addOrEdit} Issue`
										}
										type={categoryType}
										addOrEdit={addOrEdit}
										rowData={rowData}
										setRowData={setRowData}
										people={people}
										setFilteredPeople={setFilteredPeople}
										// issues={issues}
										// setFilteredIssues={setFilteredIssues}
										// saveNewUser={saveNewUser}
									/>
									<Grid item xs={12}>
											<FormControlLabel
												label="Dark Mode"
												control={
														<Switch
															checked={theme === "dark"}
															onChange={handleChange}
														/>
												}
											/>
											<DataTable
												title="Authorize Platforms"
												columns={columnsPlatform}
												data={data}
												theme={theme}
												highlightOnHover
												pointerOnHover
												pagination
												selectableRows
												expandableRows
												actions={actions("user")}
												// onRowClicked={(row) =>
												// 	handleOnRowClicked(row, "user")
												// }
												expandOnRowClicked={false}
												expandableRowsComponent={<></>}
												customStyles={customStyles}
											/>
									</Grid>
							</Grid>
					</CardContent>
			</Card>
		);
};
const customStyles = {
		cells: {
				style: {
						fontSize: "20px",
				},
		},
};
export default TrackPage;
