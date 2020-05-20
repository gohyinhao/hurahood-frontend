import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LeftCaret from '../assets/fontawesome/solid/caret-left.svg';
import RightCaret from '../assets/fontawesome/solid/caret-right.svg';

class Paginator extends Component {
    state = {
        currentPage: 1,
        pages: [],
    };

    componentDidMount() {
        this.setState(() => ({
            pages: this.getPagesArray(),
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.total !== this.props.total || prevProps.perPage !== this.props.perPage) {
            this.setState(() => ({
                pages: this.getPagesArray(),
            }));
        }

        if (prevState.currentPage !== this.state.currentPage) {
            this.props.onChange(this.state.currentPage);
        }
    }

    getPagesArray = () => {
        const { perPage, total } = this.props;
        const numOfPages = Math.ceil(total / perPage);

        const array = [];
        for (let i = 1; i <= numOfPages; i++) {
            array.push(i);
        }
        return array;
    };

    setPage = (pageNum) => {
        this.setState(() => ({
            currentPage: pageNum,
        }));
    };

    onPrevious = () => {
        if (this.state.currentPage > 1) {
            this.setState((prevState) => ({
                currentPage: prevState.currentPage - 1,
            }));
        }
    };

    onNext = () => {
        if (this.state.currentPage < this.state.pages.length) {
            this.setState((prevState) => ({
                currentPage: prevState.currentPage + 1,
            }));
        }
    };

    onClick = (pageNum) => {
        this.setState(() => ({
            currentPage: pageNum,
        }));
    };

    render() {
        const { className, onChange } = this.props;
        const classNames = 'paginator ' + (className ? className : '');
        const leftCaretClassNames =
            'paginator__caret' +
            (this.state.currentPage === 1 ? ' paginator__caret--disabled' : '');

        const rightCaretClassNames =
            'paginator__caret' +
            (this.state.currentPage === this.state.pages.length
                ? ' paginator__caret--disabled'
                : '');

        return (
            <div className={classNames}>
                <img onClick={this.onPrevious} src={LeftCaret} className={leftCaretClassNames} />
                <div className="paginator__pages">
                    {this.state.pages.map((pageNum) => {
                        const pageClassNames =
                            'paginator__page ' +
                            (pageNum === this.state.currentPage ? 'paginator__page--active' : '');

                        return (
                            <span
                                key={pageNum}
                                className={pageClassNames}
                                onClick={this.onClick.bind(undefined, pageNum)}
                            >
                                {pageNum}
                            </span>
                        );
                    })}
                </div>
                <img onClick={this.onNext} src={RightCaret} className={rightCaretClassNames} />
            </div>
        );
    }
}

Paginator.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    perPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

Paginator.defaultProps = {
    className: '',
};

export default Paginator;
