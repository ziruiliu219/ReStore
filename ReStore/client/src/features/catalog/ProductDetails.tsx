import { Divider, Grid, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import axios from "axios";

export default function ProductDetailPage(){
    const {id}=useParams<{id:string}>();
    const [product,setProduct]=useState<Product|null>(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/products/${id}`)
        .then(response=>setProduct(response.data))
        .finally(()=>setLoading(false));
    },[id])

    if(loading)return <h3>loading...</h3>
    if(!product)return <h3>product not found</h3>
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