import PropTypes from "prop-types";
import React, { Component } from "react";

import { getRiffSVGName } from "../utils/Utils";

class RiffImage extends Component {
    render() {
        const { name, pitch, octave, mobile } = this.props;
        return mobile ? (
            <img alt={`riff ${name} ${pitch}`} height={35} src={getRiffSVGName(name, pitch, octave)} />
        ) : (
            <img alt={`riff ${name} ${pitch}`} src={getRiffSVGName(name, pitch, octave)} />
        );
    }
}

export default RiffImage;

RiffImage.propTypes = {
    onRiffImageClick: PropTypes.func,
    size: PropTypes.number,
    mobile: PropTypes.bool, // not mobile when not provided?
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pitch: PropTypes.string.isRequired,
    octave: PropTypes.string.isRequired
};