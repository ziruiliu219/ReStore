import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../../app/api/agent";
import { useState } from "react";

export default function AboutPage(){
    const [ValidationErrors,setValidationErros]=useState<string[]>([]);
    function getValidationError(){
        agent.TestErrors.getValidationError()
        .then(()=>console.log('should bot see this'))
        .catch(error=>setValidationErros(error))
    }
    return(
        <Container>
            <Typography gutterBottom variant='h2'>error for testing</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={()=>agent.TestErrors.get400Error().catch(error=>console.log(error))}>Test 400 error</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get401Error().catch(error=>console.log(error))}>Test 401 error</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get404Error().catch(error=>console.log(error))}>Test 404 error</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get500Error().catch(error=>console.log(error))}>Test 500 error</Button>
                <Button variant='contained' onClick={getValidationError}>Test getValidationError</Button>
            </ButtonGroup>
            {ValidationErrors.length>0&&
               <Alert severity="error">
                <AlertTitle>validation error</AlertTitle>
                <List>
                    {ValidationErrors.map(error=>(
                        <ListItem key={error}>
                            <ListItemText>{error}</ListItemText>
                        </ListItem>
                    ))}
                </List>
               </Alert>
            
            }
        </Container>
    )
}