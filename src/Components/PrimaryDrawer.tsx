import { AppBar as MUIAppBar, Toolbar, Box, IconButton, styled } from '@mui/material';
import {   NotificationsOutlined, AccountCircle } from '@mui/icons-material';



const PrimaryDrawer = () => {


    return (
        <MUIAppBar>
            <Toolbar>
                <Box sx={{ marginLeft: 'auto' }}>
                    <StyledIconButton><NotificationsOutlined sx={{ width: 30, height: 30 }} /></StyledIconButton>
                    <StyledIconButton><AccountCircle sx={{ width: 30, height: 30 }} /></StyledIconButton>
                </Box>




            </Toolbar>
        </MUIAppBar>
    )
}



const StyledIconButton = styled(IconButton)({
    color: 'white'
});


export default PrimaryDrawer;