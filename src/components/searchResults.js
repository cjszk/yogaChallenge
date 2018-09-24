import React, { Component } from 'react';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderIndex: 0
        }
    }

    createCard = (item) => 
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
                        <div className="">{item.level}</div>
                        <i className="icon-intensity" style={{fontSize: "11px"}}></i>
                        <span className="yi-card-small__intensity">{item.intensity}</span>
                        <p className="yi-card-small__snippet mt-1">{item.body_snippet}</p>
                    </div>
                </div>                
            </a>
        </div>

    decrementSlider() {
        if (this.state.sliderIndex !== 0) {
            this.setState({sliderIndex: this.state.sliderIndex - 7})
        }
    }

    incrementSlider(vinyasaResults) {
        const vinyasaCount = this.props.classes.filter((item => item.style[0] === 'vinyasa')).length;
        if (this.state.sliderIndex < vinyasaCount && vinyasaResults.length >= 7) {
            this.setState({sliderIndex: this.state.sliderIndex + 7})}
    }

  render() {
    
    const classes = this.props.classes;
    let results;
    const vinyasaResults = classes.filter((item) => item.style[0] === 'vinyasa').slice(0 + this.state.sliderIndex, 7 + this.state.sliderIndex).map((item) => (
        <div key={item.entry_id} className="m-2">
            {this.createCard(item)}
        </div>
    ));
    if (this.props.search.length === 0 && this.props.filters.length === 0) {
        results = (
            <div>
                <h4 className="slider-header">Vinyasa</h4>
                <div className="slider">
                    <div className="slider-results">
                            <img src="https://yogainternational.com/assets/fonts/icons/icon-right-arrow.svg"
                            style={{transform: "rotate(180deg)", width: "25px", cursor: "pointer"}}
                            onClick={() => {
                                this.decrementSlider();
                            }}
                            />
                        {vinyasaResults}
                            <img src="https://yogainternational.com/assets/fonts/icons/icon-right-arrow.svg"
                            style={{width: "25px",  cursor: "pointer"}}
                            onClick={() => {
                                this.incrementSlider(vinyasaResults)
                            }}/>
                    </div>
                </div>
            </div>
            )
    } else if (this.props.search.length > 0) {
        let searchResults = classes.filter((item) => {
            let lowerCasedItem = item.title.toLowerCase();
            return lowerCasedItem.includes(this.props.search.toLowerCase());
        })

        let renderResults = searchResults.map((item) => (
        <div key={item.entry_id} className="m-2">
            {this.createCard(item)}
        </div>
        ));
        
        if (searchResults.length === 0 && classes.filter((item) => item.title.includes(this.props.search)).length > 0) {
            this.setState({sliderIndex: 0})
        }
        const count = searchResults.length;
        if (count === 0) {
            searchResults = (<span>No search results to display</span>)
        }
        results = (
            <div>
                <h4 className="slider-header">{count} results</h4>
                <div className="">
                    <div className="" style={{
                        padding: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap'}}>
                        {renderResults}
                    </div>
                </div>
            </div>
        )
    } else {
        let searchResults = classes.filter((item) => item.title.includes(this.props.search)).map((item) => (
            <div key={item.entry_id} className="m-2">
                {this.createCard(item)}
            </div>
            ));
        const count = classes.length;
        if (count === 0) {
            searchResults = (<span>No search results to display</span>)
        }
        results = (
            <div>
                <h4 className="slider-header">{count} results</h4>
                <div className="">
                    <div className="" style={{
                        padding: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap'}}>
                        {searchResults}
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
