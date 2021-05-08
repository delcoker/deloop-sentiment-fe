import AppBar from '@material-ui/core/AppBar'
// import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
// import { useIntl } from 'react-intl'

const CategoryGroupComponent = () => {
		const [tab, setTab] = useState('one')
		// const intl = useIntl()

		return (
			<>
					<AppBar position="static">
							<Tabs
								value={tab}
								onChange={(e, t) => setTab(t)}
								aria-label="simple tabs example"
								centered
							>
									<Tab label="Topics" value="one"/>
									<Tab label="Item Two" value="two"/>
									{/*<Tab label="Item Three" value="three"/>*/}
							</Tabs>
					</AppBar>

					<div>
							{/*{tab === 'one' && <div>One</div>}*/}
							{/*{tab === 'two' && <div>Two</div>}*/}
							{/*{tab === 'three' && <div>Three</div>}*/}
					</div>
			</>
		)
}
export default CategoryGroupComponent