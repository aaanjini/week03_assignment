import React from "react";
import styled from "styled-components";
import { Grid, Image, Text } from "../elements/index";


const Layout = (props) => {
    const { children, layout, contents, preview } = props;
    console.log();
    if(layout === "center"){
        return(
            <>
                <Grid padding="16px">
                    <Text>{contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={preview} />
                </Grid>
            </>            
        );
    }else if(layout === "left"){        
        <Grid is_flex  padding="16px"> 
            <Grid width="40%">
                <Text>{contents}</Text>
            </Grid>             
            <Grid width="60%" margin="0 0 0 10px">                
                <Image shape="rectangle" src={preview} />              
            </Grid>                
        </Grid>        
    }else if(layout === "right"){
        <Grid is_flex  padding="16px">
            <Grid width="60%" >                
                <Image shape="rectangle" src={preview} />
            </Grid>  
            <Grid width="40%" margin="0 0 0 10px">
                <Text>{contents}</Text>
            </Grid>
        </Grid>
    }
}

export default Layout;
