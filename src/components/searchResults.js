import React, { Component } from 'react';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderIndex: 0
        }
    }

  render() {
    console.log(this.props)
    let filterResults = [];
    this.props.filters.forEach((filterItem) => {
        this.props.classes.forEach((classItem) => {
            if (filterItem.type === 'teacher' && filterItem.data === classItem.teacher[0]) {
                filterResults.push(classItem);
            } else if (filterItem.type === 'duration' && filterItem.data === classItem.duration[0]) {
                filterResults.push(classItem);                    
            } else if (filterItem.type === 'level' && filterItem.data === classItem.level[0]) {
                filterResults.push(classItem);                    
            } else if (filterItem.type === 'style' && filterItem.data === classItem.style[0]) {
                filterResults.push(classItem);                    
            } else if (filterItem.type === 'bodyPart' && filterItem.data === classItem.anatomical_focus[0]) {
                filterResults.push(classItem);                    
            }
        })
    })
    let data = this.props.classes;
    if (filterResults.length > 0) {
        data = filterResults;
    }
    console.log(filterResults)
    let results;
    const vinyasaResults = data.filter((item) => item.style[0] === 'vinyasa').slice(0 + this.state.sliderIndex, 7 + this.state.sliderIndex).map((item) => (
        <div key={item.entry_id} className="m-2">
            <div className="yi-card-small-centered-hover-wrapper slider">
                <a className="yi-card-small yi-card-small--hoverable"
                 href={item.url}>
                    <div className="yi-card-small__image">
                        <img src={item.thumb} alt="Card"/>
                        <div className="yi-card-small__content">
                            <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-hide">{item.title}</h4>
                            <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-show">{item.title}</h4>
                            <div className="yi-card-small__author yi-card-small--hover-hide">{item.teacher[0]}</div>
                            <div className="yi-card-small__author yi-card-small--hover-show yi-card-small__author--full">{item.teacher[0]}</div>
                            <p className="yi-card-small__snippet mt-1">{item.body_snippet}</p>
                            <div className="">{item.level}</div>
                            <i className="icon-intensity" style={{fontSize: "11px"}}></i>
                            <span className="yi-card-small__intensity">{item.intensity}</span>
                        </div>
                    </div>                
                </a>
            </div>
        </div>
    ));
    if (this.props.search.length === 0 && this.props.filters.length === 0) {
        results = (
            <div>
                <h4 className="slider-header">Vinyasa</h4>
                <div className="slider">
                    <div className="slider-results">
                        <button onClick={() => {
                            if (this.state.sliderIndex !== 0) {
                                this.setState({sliderIndex: this.state.sliderIndex - 7})
                            }
                        }} className="slider-button slider-button-left">
                            &#60;
                        </button>
                        {vinyasaResults}
                        <button onClick={() => {
                            const vinyasaCount = data.filter((item => item.style[0] === 'vinyasa')).length;
                            if (this.state.sliderIndex < vinyasaCount && vinyasaResults.length >= 7) {
                                this.setState({sliderIndex: this.state.sliderIndex + 7})
                        }}}
                        className="slider-button slider-button-right">
                            &#62;
                        </button>
                    </div>
                </div>
            </div>
            )
    } else if (this.props.search.length > 0) {
        const searchResults = data.filter((item) => item.title.includes(this.props.search)).slice(0 + this.state.sliderIndex, 7 + this.state.sliderIndex).map((item) => (
        <div key={item.entry_id} className="m-2">
            <div className="yi-card-small-centered-hover-wrapper slider">
                <a className="yi-card-small yi-card-small--hoverable"
                 href={item.url}>
                    <div className="yi-card-small__image">
                        <img src={item.thumb} alt="Card"/>
                        <div className="yi-card-small__content">
                            <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-hide">{item.title}</h4>
                            <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-show">{item.title}</h4>
                            <div className="yi-card-small__author yi-card-small--hover-hide">{item.teacher[0]}</div>
                            <div className="yi-card-small__author yi-card-small--hover-show yi-card-small__author--full">{item.teacher[0]}</div>
                            <p className="yi-card-small__snippet mt-1">{item.body_snippet}</p>
                            <div className="">{item.level}</div>
                            <i className="icon-intensity" style={{fontSize: "11px"}}></i>
                            <span className="yi-card-small__intensity">{item.intensity}</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        ));
        if (searchResults.length === 0 && data.filter((item) => item.title.includes(this.props.search)).length > 0) {
            this.setState({sliderIndex: 0})
        }
        const count = data.filter((item) => item.title.includes(this.props.search)).length;
        results = (
            <div>
                <h4 className="slider-header">{count} results</h4>
                <div className="slider">
                    <div className="slider-results">
                        <button onClick={() => {
                            if (this.state.sliderIndex !== 0) {
                                this.setState({sliderIndex: this.state.sliderIndex - 7})
                            }
                        }} className="slider-button slider-button-left">
                            &#60;
                        </button>
                        {searchResults}
                        <button onClick={() => {
                            console.log(this.state.sliderIndex, count)
                            if (this.state.sliderIndex < count && searchResults.length >= 7) {
                                    this.setState({sliderIndex: this.state.sliderIndex + 7})
                        }}}
                        className="slider-button slider-button-right">
                            &#62;
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        const searchResults = data.filter((item) => item.title.includes(this.props.search)).slice(0 + this.state.sliderIndex, 7 + this.state.sliderIndex).map((item) => (
            <div key={item.entry_id} className="m-2">
                <div className="yi-card-small-centered-hover-wrapper slider">
                    <a className="yi-card-small yi-card-small--hoverable"
                     href={item.url}>
                        <div className="yi-card-small__image">
                            <img src={item.thumb} alt="Card"/>
                            <div className="yi-card-small__content">
                                <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-hide">{item.title}</h4>
                                <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-show">{item.title}</h4>
                                <div className="yi-card-small__author yi-card-small--hover-hide">{item.teacher[0]}</div>
                                <div className="yi-card-small__author yi-card-small--hover-show yi-card-small__author--full">{item.teacher[0]}</div>
                                <p className="yi-card-small__snippet mt-1">{item.body_snippet}</p>
                                <div className="">{item.level}</div>
                                <i className="icon-intensity" style={{fontSize: "11px"}}></i>
                                <span className="yi-card-small__intensity">{item.intensity}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            ));
        const count = filterResults.length;
        results = (
            <div>
                <h4 className="slider-header">{count} results</h4>
                <div className="slider">
                    <div className="slider-results">
                        <button onClick={() => {
                            if (this.state.sliderIndex !== 0) {
                                this.setState({sliderIndex: this.state.sliderIndex - 7})
                            }
                        }} className="slider-button slider-button-left">
                            &#60;
                        </button>
                        {searchResults}
                        <button onClick={() => {
                            console.log(this.state.sliderIndex, count)
                            if (this.state.sliderIndex < count && searchResults.length >= 7) {
                                    this.setState({sliderIndex: this.state.sliderIndex + 7})
                        }}}
                        className="slider-button slider-button-right">
                            &#62;
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section val="ygi-featured-classes ygi-featured-classes--mobile-true ygi-featured-classes--hover-space ygi-featured-classes--small-cards ygi-featured-classes--light">
            <div val="container">
                {results}
            </div>
        </section>
    )
  }
}

export default SearchResults;
