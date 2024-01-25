import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <Container component={Paper} sx={{height:20}}>
            <Typography gutterBottom variant ='h3'>could not found</Typography>
            <Divider/>
            <Button fullWidth component={Link} to ='/catalog'>go back to</Button>
        </Container>
    )
}