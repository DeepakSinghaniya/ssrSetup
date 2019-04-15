import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { path } from 'ramda';


class LoaderImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            src: this.props.thumb
        }
    }
    componentDidMount() {
        this.hdLoaderImg = new Image();
        this.hdLoaderImg.src = this.props.src;
        this.hdLoaderImg.onload = () => {
            this.setState({ src: this.props.src, loaded: true });
            this.hdLoaderImg = null;
        }
    }

    componentWillUnmount() {
        if (this.hdLoaderImg) {
            this.hdLoaderImg.src = '';
        }
    }
    render() {
        const link = path(['props', 'link'], this);
        return (
            <div className="image-wrapper" style={{
                height: this.props.height,
                width: this.props.width
            }}>
                {link ?
                    <Link to={link}>
                        <img src={this.state.src} className={this.state.loaded ? 'loaded' : 'loading'} alt={this.props.alt} title={this.props.title ? this.props.title : ''} />
                    </Link> :
                    <img src={this.state.src} className={this.state.loaded ? 'loaded' : 'loading'} alt={this.props.alt} title={this.props.title ? this.props.title : ''} />}
            </div>
        );
    }
}


LoaderImage.propTypes = {
    src: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    link: PropTypes.string
};

export default LoaderImage;