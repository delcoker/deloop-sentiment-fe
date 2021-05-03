import React from "react";
import { withRouter } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import GitHubIcon from '@material-ui/icons/GitHub';
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { TimeToLeave } from "@material-ui/icons";
import { accountService } from "../_services";
import useStyles from "../_helpers/use_styles/styles";

const Header = ({open, handleDrawerOpen}) => {
		const classes = useStyles();
		return (
			<>

					<AppBar
						position="fixed"
						className={clsx(classes.appBar, {
								[classes.appBarShift]: open,
						})}
					>
							<Toolbar>
									<IconButton
										color="inherit"
										aria-label="open drawer"
										onClick={handleDrawerOpen}
										edge="start"
										className={clsx(classes.menuButton, {
												[classes.hide]: open,
										})}
									>
											{accountService.getUserSession()
											&& <MenuIcon/>}
									</IconButton>
									<Typography variant="h6" color="inherit" noWrap className={classes.title}>
											DWM Sentimento
									</Typography>
									<div className={classes.grow}/>
									<Button
										component="a"
										href="https://github.com/dwm-codebase"
										target="_blank"
										endIcon={<DescriptionIcon/>}
										color="inherit"
									>
											Source Code : FE
									</Button>
									<Button
										component="a"
										href="https://github.com/dwm-codebase"
										endIcon={<GitHubIcon/>}
										color="inherit"
										target="_blank"
									>
											Project
									</Button>
									{accountService.getUserSession() && <Button
										endIcon={<TimeToLeave/>}
										color="inherit"
										onClick={accountService.logout}
									>
											Logout
									</Button>}
							</Toolbar>
					</AppBar>
			</>
		)
};

export default withRouter(Header);
