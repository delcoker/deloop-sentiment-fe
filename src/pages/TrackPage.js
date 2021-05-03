import React, { useEffect, useState } from "react";
// react component that copies the given text inside your clipboard
// @material-ui/core components
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// core components
import AddFormDialog from "../components/AddFormDialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DataTable from "react-data-table-component";
import ActionComponent from "../components/ActionComponent";
import useStyles from "../_helpers/use_styles/styles";


const data = [{
		id: 1,
		name: 'Conan the Barbarian',
		position: 1982,
		keywords: 'Orphaned boy Conan is enslaved after his village is destroyed...'
}, {
		id: 2,
		name: 'the Barbarian',
		position: '2020',
		keywords: ' his village is destroyed...'
},
];

const columnsPeople = [
		{
				name: "id",
				selector: (user) => user,
				sortable: true,
				omit: true,
		},
		{
				name: "Name",
				selector: (user) => user["name"],
				sortable: true,
				wrap: true,
		},
		{
				name: "Position",
				selector: "position",
				sortable: true,
		},
		{
				name: "Keywords",
				selector: (user) => user["keywords"],
				sortable: true,
				wrap: true,
				grow: 3,
		},
];

const columnsIssues = [
		{
				name: "id",
				selector: (user) => user["id"],
				sortable: true,
				omit: true,
		},
		{
				name: "Name",
				selector: (issue) => issue["IssuesOfInterest.name"],
				sortable: true,
				wrap: true,
		},
		{
				name: "Keywords",
				selector: (issue) => issue["IssuesOfInterest.keywords"],
				sortable: true,
				wrap: true,
				grow: 3,
		},
];

const TrackPage = () => {
		const classes = useStyles();
		// const theme = useTheme();
		// const { cubejsApi } = React.useContext(CubeContext);
		const [theme, setTheme] = useState("dark");
		const [theme2, setTheme2] = useState("light");
		const [filterPeopleText, setFilterPeopleText] = useState("");
		const [filterIssuesText, setFilterIssuesText] = useState("");
		const [people, setPeople] = useState([]);
		const [filteredPeople, setFilteredPeople] = useState([]);
		const [issues, setIssues] = useState([]);
		const [filteredIssues, setFilteredIssues] = useState([]);
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

		const handleChange2 = () => {
				if (theme2 === "dark") {
						setTheme2("default");
				} else {
						setTheme2("dark");
				}
		};

		const handleClear = (type) => {
				if (type === "user") {
						setFilterPeopleText("");
						setFilteredPeople(people);
				} else if (type === "issue") {
						setFilterIssuesText("");
						setFilteredIssues(issues);
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
						} else {
								setFilterIssuesText(text);
								setFilteredIssues(
									issues.filter(
										(issue) =>
											(issue["IssuesOfInterest.name"] &&
												issue["IssuesOfInterest.name"]
													.toLowerCase()
													.includes(text.toLowerCase())) ||
											(issue["IssuesOfInterest.keywords"] &&
												issue["IssuesOfInterest.keywords"]
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

		useEffect(() => {
				// cubejsApi.load(usersQuery).then((resultSet) => {
				//     setPeople(resultSet.loadResponses[0].data);
				//     setFilteredPeople(resultSet.loadResponses[0].data);
				// });
				// cubejsApi.load(issuesQuery).then((resultSet) => {
				//     setIssues(resultSet.loadResponses[0].data);
				//     setFilteredIssues(resultSet.loadResponses[0].data);
				// });
				console.log("AdminPage useEffect");
		}, []);

		return (
			<>
					{/* Page content */}
					<Container
						maxWidth={false}
						component={Box}
						marginTop="-6rem"
						// classes={{root: classes.containerRoot}}
					>
							{/* Table */}
							<Grid container component={Box} marginBottom="39px">
									<Grid item xs={12}>
											<Card>
													<CardHeader
														// className={classes.cardHeader}
														title="People & Issues to follow"
														titleTypographyProps={{
																component: Box,
																marginBottom: "0!important",
																variant: "h3",
														}}
													/>


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
																		issues={issues}
																		setFilteredIssues={setFilteredIssues}
																	/>

																	<Grid item xs={6}>
																			<FormControlLabel
																				label="Dark Mode"
																				control={
																						<Switch
																							checked={theme === "dark"}
																							onChange={handleChange}
																						/>
																				}
																			/>

																			<br/>
																			<br/>

																			<DataTable
																				title="People to Look Out For"
																				columns={columnsPeople}
																				data={data}
																				theme={theme}
																				highlightOnHover
																				pointerOnHover
																				pagination
																				selectableRows
																				expandableRows
																				actions={actions("user")}
																				onRowClicked={(row) =>
																					handleOnRowClicked(row, "user")
																				}
																				expandOnRowClicked={false}
																				expandableRowsComponent={<></>}
																				// dense
																			/>
																	</Grid>


																	<Grid item xs={6}>
																			<FormControlLabel
																				label="Dark Mode"
																				control={
																						<Switch
																							checked={theme2 === "dark"}
																							onChange={handleChange2}
																						/>
																				}
																			/>

																			<br/>
																			<br/>

																			<DataTable
																				title="Issues to Track"
																				columns={columnsIssues}
																				data={filteredIssues}
																				theme={theme2}
																				highlightOnHover
																				pointerOnHover
																				pagination
																				selectableRows
																				expandableRows
																				actions={actions("issue")}
																				onRowClicked={(row) =>
																					handleOnRowClicked(row, "issue")
																				}
																				expandOnRowClicked={false}
																				expandableRowsComponent={<></>}
																				// dense
																			/>
																	</Grid>
															</Grid>
													</CardContent>
											</Card>
									</Grid>
							</Grid>
					</Container>
			</>
		);
};

export default TrackPage;
