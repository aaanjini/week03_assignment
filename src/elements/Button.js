import React from "react";
import styled from "styled-components";


const Button = (props) => {
    const {text, size, children, _onClick, is_float, margin, width, height, color, bg, padding , border} = props;
    const styles = {
        margin: margin,
        width: width,
        height: height,
        color: color,
        bg: bg,
        padding: padding,
        border: border,
        size:size,
    }

    if(is_float){
        return (
          <React.Fragment>
            <FloatButton type="button" onClick={_onClick}>{text? text : children}</FloatButton>
          </React.Fragment>
        )
      }
    return(
        <React.Fragment>
            <DefaultButton {...styles} type="button" onClick={_onClick}>{text? text: children}</DefaultButton>
        </React.Fragment>
    );
};

Button.defaultProps = {
    text: false,
    children: null,
    _onClick: () => {},
    is_float:false,    
    margin: false,
    width: "100%",
    height: '',
    color: "white",
    bg: "#000",
    padding: "12px 0px",
    border:"none",
    size:"",
};

const DefaultButton = styled.button`    
    width: ${(props) => props.width};
    ${(props) => (props.height? `height: ${props.height};` : '')};
    background-color: ${(props) => props.bg};
    color: ${(props) => props.color};
    padding: ${(props) => props.padding};
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    ${(props) => (props.margin? `margin: ${props.margin};` : '')};
    border: ${(props) => props.border};
    cursor: pointer;
    z-index: 2;
    ${(props) => (props.size? `font-size: ${props.size};` : '')};
`;

const FloatButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #FFD600;
  border:none;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  font-size: 40px;
  font-weight: 800;
  cursor: pointer;
  z-index: 3;
`;

export default Button;