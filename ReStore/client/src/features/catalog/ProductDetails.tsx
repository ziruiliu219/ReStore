import { Divider, Grid, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ProductDetailPage(){
    const {id}=useParams<{id:string}>();
    const [product,setProduct]=useState<Product|null>(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        //axios.get(`http://localhost:5000/api/products/${id}`)
        id&&agent.Catalog.details(parseInt(id)) ///there might be an error
        .then(response=>setProduct(response))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
    },[id])

    if(loading)return <LoadingComponent message="loading product...."/>
    if(!product)return <NotFound></NotFound>
    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mx:2}}></Divider>
                <Typography variant='h4' color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                <Table>
                    <TableBody> 
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>type</TableCell>
                            <TableCell>{product.type}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>quantity</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}