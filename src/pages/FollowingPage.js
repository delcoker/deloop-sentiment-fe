import React, { useEffect, useState } from "react";
// react component that copies the given text inside your clipboard
// @material-ui/core components
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
// core components
import AddEditFormDialog from "../components/AddEditFormDialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DataTable from "react-data-table-component";
import ActionComponent from "../components/ActionComponent";
import useStyles from "../_helpers/use_styles/styles";

const data = [{
		id: 1,
		scope: "#joy",
		user_id: '55'
}, {
		id: 2,
		scope: "@peace",
		user_id: '43'
}, {
		id: 3,
		scope: "#love",
		user_id: '22'
}, {
		id: 4,
		scope: "@ecg",
		user_id: '66'
}, {
		id: 1,
		scope: "@maamedokunu",
		user_id: '12'
},
];

const columns = [
		{
				name: "id",
				selector: (user) => user.id,
				sortable: true,
				omit: true,
		},
		{
				name: "Name",
				selector: (user) => user["scope"],
				sortable: true,
				wrap: true,
		},
];


const FollowingPage = () => {
		const classes = useStyles();

		const [theme, setTheme] = useState("dark");
		const [filterPeopleText, setFilterPeopleText] = useState("");
		const [people, setPeople] = useState([]);
		const [filteredPeople, setFilteredPeople] = useState([]);
		const [open, setOpen] = useState(false);
		const [categoryType, setCategoryType] = useState("");
		const [expandOnRowClick, setExpandOnRowClick] = React.useState(false);
		const [addOrEdit, setAddOrEdit] = useState("Add");
		const [rowData, setRowData] = useState();
		const [showDropDown, setShowDropDown] = useState("");
		const [showTextField1, setShowTextField1] = useState("");
		const [showTextField2, setShowTextField2] = useState("");

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
				filterText={filterPeopleText}
				onClick={() => {
						addOrEditPresets({}, "Add", type);
				}}
				tooltip={type === "user" ? "Add A New Person" : "Add A New Issue"}
				placeholder={"Filter by name & keywords"}
			/>
		);

		const addOrEditPresets = (row, crudType, categoryType, showDropDown, showTextField1, showTextField2) => {
				setOpen(!open);
				setAddOrEdit(crudType);
				setCategoryType(categoryType);
				setShowDropDown(showDropDown);
				setShowTextField1(showTextField1)
				setShowTextField2(showTextField2);
				setRowData(row);
		};

		const handleOnRowClicked = (row, editCategory, showDropDown, showTextField1, showTextField2) => {
				addOrEditPresets(row, "Edit", editCategory, showDropDown, showTextField1, showTextField2);
				return setExpandOnRowClick(!expandOnRowClick);
		};

		useEffect(() => {
				// cubejsApi.load(usersQuery).then((resultSet) => {
				//     setPeople(resultSet.loadResponses[0].data);
				//     setFilteredPeople(resultSet.loadResponses[0].data);
				// });
				// cubejsApi.load(issuesQuery).then((resultSet) => {
				//     setIssues(resultSet.loadResponses[0].data);
				//     setFilteredIssues(resultSet.loadResponses[0].data);
				// });
		}, []);

		return (
			<>
					<Card>
							<CardHeader
								title="@people or #hashtags to follow"
								titleTypographyProps={{
										component: Box,
										marginBottom: "0!important",
										variant: "h5",
								}}
							/>


							<CardContent>

									<Grid container spacing={3} justify="space-between">
											<AddEditFormDialog
												open={open}
												onClose={() => setOpen(false)}
												showPosition={categoryType === "following"}
												title={
														`${addOrEdit} Following`
												}
												type={categoryType}
												addOrEdit={addOrEdit}
												rowData={rowData}
												setRowData={setRowData}
												people={people}
												setFilteredPeople={setFilteredPeople}
												// showDropDown={showDropDown}
												// showTextField1={showTextField1}
												showTextField2={showTextField2}
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
														title="People to Look Out For"
														columns={columns}
														data={data}
														theme={theme}
														highlightOnHover
														pointerOnHover
														pagination
														selectableRows
														expandableRows
														actions={actions("user")}
														onRowClicked={(row) =>
															handleOnRowClicked(row, "Category", false, false, "Name")
														}
														expandOnRowClicked={false}
														expandableRowsComponent={<></>}
														// dense
													/>
											</Grid>

									</Grid>
							</CardContent>
					</Card>
			</>
		);
};

export default FollowingPage;