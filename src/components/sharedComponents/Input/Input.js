import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import {path} from 'ramda'; 




const input = (props) => {
    let inputElement = null;
    const inputClasses = [];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('is-invalid');
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = (<FormGroup className={props.classes + ( path(['ext', 'fileUrl'],props)?' has-button': '')}>
                {/* Label */}
                {props.label ? <Label htmlFor={props.id}>{props.labelText}{props.requiredStar ? <sup>*</sup> : ''}</Label> : null}

                {/*show message if any*/}
                {props.messageRequired ? <sup><i className="fa fa-star" aria-hidden="true"></i></sup> : null}

                {/* form input box */}
                <Input id={props.id} className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
                
                {path(['ext', 'fileUrl'],props)? <a className="file-url" href={path(['ext', 'fileUrl'],props)} rel="noopener noreferrer"  target="_blank">{path(['ext', 'fileLabel'],props)}</a> : null}
            </FormGroup>)
            break;

       

        default:
            inputElement = null;

    }

    return inputElement;

};

export default input;