import moment from 'moment';
import {
    Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography
} from '@material-ui/core';

const user = {
    avatar: 'https://material-kit-react.devias.io/static/images/avatars/avatar_6.png',
    city: 'Accra',
    country: 'Ghana',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GMT'
};

const AccountProfile = (props) => (
    <Card {...props}>
        <CardContent>
            <Box sx={{
                alignItems: 'row',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Avatar
                    src={user.avatar}
                    sx={{
                        height: 100,
                        width: 100
                    }}
                />
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body1"
                >
                    {`${user.city} ${user.country}`}
                </Typography>
                <Typography
                    color="textSecondary"
                >
                    {`${moment().format('hh:mm A')} ${user.timezone}`}
                </Typography>
            </Box>
        </CardContent>
        <Divider/>
        <CardActions>
            <Button color="primary" fullWidth variant="text">
                Upload picture
            </Button>
        </CardActions>
    </Card>
);

export default AccountProfile;
