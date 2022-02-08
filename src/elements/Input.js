import React from "react";
import styled from "styled-components";

import {Text, Grid} from "./index";

const Input = (props) => {
    const {label, placeholder, _onChange , type, multiLine, value, radius, is_submit, onSubmit, } = props;

    
   
    if(multiLine){
      return (
        <Grid>
          {label && <Text margin="0px">{label}</Text>}
          <ElTextarea
            value={value}
            rows={10}
            placeholder={placeholder}
            onChange={_onChange}
            radius={radius}
          ></ElTextarea>
        </Grid>
      );
    }

    return (
      <React.Fragment>
        <Grid>
        {label && <Text margin="0px">{label}</Text>}
          {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            radius={radius}
            onKeyPress={(e) => {
              if(e.key === "Enter"){
                onSubmit(e);
              }
            }}
          />
          ) : (
            <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
          )}
        </Grid>
      </React.Fragment>
    );
}

Input.defaultProps = {
    multiLine: false,
    labelNone:false,
    label: false,
    placeholder: '텍스트를 입력해주세요.',
    type: "text",
    value: "",
    radius:"0",
    is_submit: false,
    onSubmit: () => {},
    _onChange: () => {}
    
}

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
    border-radius: ${(props) => props.radius};
`;

export default Input;