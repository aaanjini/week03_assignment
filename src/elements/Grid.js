import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const {is_flex, width, padding, margin, bg, center, border, radius, children, _onClick} = props;
    const styles = {
        width: width,
        padding: padding,
        margin: margin,
        bg: bg,
        center: center,
        is_flex: is_flex,
        border:border,
        radius:radius,
    }

    return(
        <React.Fragment>
            <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
        </React.Fragment>
    );

}

Grid.defaultProps = {
    children:null,
    is_flex: false,
    width:"100%",
    padding: false,    
    margin: false,
    bg: false,
    center: false,
    border:"none",
    radius:"0",
    _onClick: () => {},
};

const GridBox = styled.div`
    width: ${(props) => props.width};    
    max-width: 800px;
    height: 100%;
    box-sizing: border-box;
    ${(props) => (props.padding? `padding: ${props.padding}`: '' )};
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
    ${(props) =>
        props.is_flex
        ? `display: flex; align-items: center; justify-content: space-between; `
        : ""};
    ${(props)=>props.center ? `text-align: center` : ''};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.radius};
`;

export default Grid;