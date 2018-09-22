import React, { Component } from 'react';

import SearchResults from './searchResults';

import sampleData from '../utils/sampleData.json';
//I've only been given a single JSON with classes populating other values, thus I need to extract certain values from this single JSON for certain functionalities.
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index && value != undefined;
}

const teachers = sampleData.map((item) => {
    const teacherName = item.teacher[0].replace('-', ' ').replace('-', ' ').split(' ').map((item) => item[0].toUpperCase() + item.slice(1, item.length)).join(' ');
    let teacherImage = item.teacher_image;
    if (teacherImage.length === 0) {
        teacherImage = "https://yogainternational.com/assets/fonts/icons/icon-profile-placeholder.svg";
    }
    return {
        name: teacherName, data: item.teacher[0], image: teacherImage
    }
}).filter((teacher, index, self) =>
  index === self.findIndex((t) => (
    t.data === teacher.data
  ))
).sort((a,b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))

const durations = sampleData.map((item) => item.duration[0]).filter(onlyUnique).sort((a,b) => parseInt(a.replace(/[^0-9]/g, '')) - parseInt(b.replace(/[^0-9]/g, '')));
const levels = sampleData.map((item) => item.level[0]).filter(onlyUnique).sort();
const styles = sampleData.map((item) => item.style[0]).filter(onlyUnique).sort();
const bodyParts = sampleData.map((item) => item.anatomical_focus[0]).filter(onlyUnique).sort();

class ClassFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            teachers: teachers,
            durations: durations,
            levels: levels,
            styles: styles,
            bodyParts: bodyParts,
            selectedDropDown: '',
            toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
            toggleDurations: 'dropdown-menu ygi-dropdown__menu',
            toggleLevels: 'dropdown-menu ygi-dropdown__menu',
            toggleStyles: 'dropdown-menu ygi-dropdown__menu',
            toggleBodyParts: 'dropdown-menu ygi-dropdown__menu',
            filters: []
        }
    }

  render() {
    const teachersList = this.state.teachers.map((teacher) => (
        <button 
        onClick={() => {
            this.setState({
                filters: this.state.filters.concat([{name: teacher.name, data: teacher.data, type: 'teacher', image: teacher.image}]),
                toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
                toggleDurations: 'dropdown-menu ygi-dropdown__menu',
                toggleLevels: 'dropdown-menu ygi-dropdown__menu',
                toggleStyles: 'dropdown-menu ygi-dropdown__menu',
                toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
            })
        }} 
        key={teacher.data} className="dropdown-item ygi-dropdown__option">
            <img className="yi-teacher-dropdown__image--small" src={teacher.image} alt="Teacher" />
            <span>{teacher.name}</span>
        </button>
    ));

    const durationList = this.state.durations.map((duration) => (
        <button 
        onClick={() => {
            this.setState({
                filters: this.state.filters.concat([{data: duration, type: 'duration'}]),
                toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
                toggleDurations: 'dropdown-menu ygi-dropdown__menu',
                toggleLevels: 'dropdown-menu ygi-dropdown__menu',
                toggleStyles: 'dropdown-menu ygi-dropdown__menu',
                toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
        })
        }} 
        key={duration} className="dropdown-item ygi-dropdown__option">
            <span>{duration}</span>
        </button>
    ));

    const levelList = this.state.levels.map((level) => (
        <button
        onClick={() => {
            this.setState({
            filters: this.state.filters.concat([{data: level, type: 'level'}]),
            toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
            toggleDurations: 'dropdown-menu ygi-dropdown__menu',
            toggleLevels: 'dropdown-menu ygi-dropdown__menu',
            toggleStyles: 'dropdown-menu ygi-dropdown__menu',
            toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
        })
        }} 
        key={level} className="dropdown-item ygi-dropdown__option">
            <span>{level}</span>
        </button>
    ));

    const styleList = this.state.styles.map((style) => (
        <button
        onClick={() => {
            this.setState({
                filters: this.state.filters.concat([{data: style, type: 'style'}]),
                toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
                toggleDurations: 'dropdown-menu ygi-dropdown__menu',
                toggleLevels: 'dropdown-menu ygi-dropdown__menu',
                toggleStyles: 'dropdown-menu ygi-dropdown__menu',
                toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
            })
        }} 
        key={style} className="dropdown-item ygi-dropdown__option">
            <span>{style}</span>
        </button>
    ));

    const bodyPartList = this.state.bodyParts.map((bodyPart) => (
        <button
        onClick={() => {
            this.setState({
                filters: this.state.filters.concat([{data: bodyPart, type: 'bodyPart'}]),
                toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
                toggleDurations: 'dropdown-menu ygi-dropdown__menu',
                toggleLevels: 'dropdown-menu ygi-dropdown__menu',
                toggleStyles: 'dropdown-menu ygi-dropdown__menu',
                toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
            })
        }} 
        key={bodyPart} className="dropdown-item ygi-dropdown__option">
            <span>{bodyPart}</span>
        </button>
    ));

    let filterList = [];
    if (this.state.filters.length > 0) {
        this.state.filters.forEach((item) => {
            if (item.type === 'teacher') {
                filterList.push(
                    <div value={item.data} key={item.data} onClick={() => {
                        this.setState({
                            filters: this.state.filters.filter((filterItem) => filterItem.data !== item.data)
                        })
                        }} className="mt-2">
                        <div value={item.data} role="button" className="ygi-search-filters__filter">
                            <img value={item.data}  className="ygi-search-filters__filter-teacher-image" alt="Teacher" src={item.image}/>
                            <label value={item.data}  className="ygi-search-filters__filter-label">{item.name}</label>
                        </div>
                    </div>
                )
            } else {
                filterList.push(
                    <div value={item.data} key={item.data} onClick={() => {
                        this.setState({
                            filters: this.state.filters.filter((filterItem) => filterItem.data !== item.data)
                        })
                        }} className="mt-2">
                        <div value={item.data} role="button" className="ygi-search-filters__filter">
                            <label value={item.data}  className="ygi-search-filters__filter-label">{item.data}</label>
                        </div>
                    </div>
                )
            }
        })
    }

    return (
        <div className="default-page-wrapper">
            <div className="container px-3"><h2 className="ygi-page-heading ygi-page-heading--dark">Online 30 Minute Yoga Classes </h2></div>
            <section className="ygi-search">
                <div className="classFinder container px-3">
                    <div className="ygi-search__wrapper">
                        <div className="ygi-search-bar col col-12 col-lg-2">
                            <div className="ygi-search-bar__wrapper mt-2">
                            <input onChange={(event) => {
                                const value = event.target.value
                                setTimeout(() => {this.setState({search: value})}, 1000)
                            }} className="ygi-search-bar__input" placeholder="Search" />
                            </div>
                        </div>
                        <button className="ygi-search__filter-btn mx-auto mb-2 " aria-label="Shows Filters">Show Filters</button>
                        <div className="yi-dropdowns__wrapper-visibility col-lg-10">
                            <div className="row">
                                <div className="col-lg col-md-6 col-xs-12 mt-2">
                                    <div className="ygi-dropdown__wrapper yi-teacher-dropdown nopadding d-block yi-dropdown--beneath-modal">
                                        <button
                                        onClick={() => {
                                            if (this.state.toggleTeachers === 'dropdown-menu ygi-dropdown__menu'){
                                                this.setState({
                                                    toggleTeachers: 'dropdown-menu ygi-dropdown__menu show',
                                                    toggleDurations: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleLevels: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleStyles: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
                                                });
                                            } else {
                                                this.setState({toggleTeachers: 'dropdown-menu ygi-dropdown__menu'});
                                            }
                                        }} 
                                        className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-teacher" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Teacher</button>
                                        <div className={this.state.toggleTeachers} aria-labelledby="dropdown-teacher">
                                            <div className="yi-teacher-dropdown__wrapper-desktop" style={{display: "block"}}>
                                                {teachersList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-md-6 col-xs-12 mt-2">
                                    <div className="ygi-dropdown__wrapper yi-duration-dropdown nopadding d-block yi-dropdown--beneath-modal">
                                        <button
                                        onClick={() => {
                                            if (this.state.toggleDurations === 'dropdown-menu ygi-dropdown__menu'){
                                                this.setState({
                                                    toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleDurations: 'dropdown-menu ygi-dropdown__menu show',
                                                    toggleLevels: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleStyles: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
                                                });
                                            } else {
                                                this.setState({toggleDurations: 'dropdown-menu ygi-dropdown__menu'});
                                            }
                                        }} 
                                        className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-duration" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Duration</button>
                                        <div className={this.state.toggleDurations} aria-labelledby="dropdown-duration">
                                            <div className="yi-duration-dropdown__wrapper-desktop" style={{display: "block"}}>
                                                {durationList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-md-6 col-xs-12 mt-2">
                                    <div className="ygi-dropdown__wrapper yi-level-dropdown nopadding d-block yi-dropdown--beneath-modal">
                                        <button
                                        onClick={() => {
                                            if (this.state.toggleLevels === 'dropdown-menu ygi-dropdown__menu'){
                                                this.setState({
                                                    toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleDurations: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleLevels: 'dropdown-menu ygi-dropdown__menu show',
                                                    toggleStyles: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
                                                });
                                            } else {
                                                this.setState({toggleLevels: 'dropdown-menu ygi-dropdown__menu'});
                                            }
                                        }} 
                                        className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-level" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Level</button>
                                        <div className={this.state.toggleLevels} aria-labelledby="dropdown-level">
                                            <div className="yi-level-dropdown__wrapper-desktop" style={{display: "block"}}>
                                                {levelList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-md-6 col-xs-12 mt-2">
                                    <div className="ygi-dropdown__wrapper yi-style-dropdown nopadding d-block yi-dropdown--beneath-modal">
                                        <button
                                        onClick={() => {
                                            if (this.state.toggleStyles === 'dropdown-menu ygi-dropdown__menu'){
                                                this.setState({
                                                    toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleDurations: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleLevels: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleStyles: 'dropdown-menu ygi-dropdown__menu show',
                                                    toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
                                                });
                                            } else {
                                                this.setState({toggleStyles: 'dropdown-menu ygi-dropdown__menu'});
                                            }
                                        }} 
                                        className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-style" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Style</button>
                                        <div className={this.state.toggleStyles} aria-labelledby="dropdown-style">
                                            <div className="yi-style-dropdown__wrapper-desktop" style={{display: "block"}}>
                                                {styleList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-md-6 col-xs-12 mt-2">
                                    <div className="ygi-dropdown__wrapper yi-anatomical_focus-dropdown nopadding d-block yi-dropdown--beneath-modal">
                                        <button
                                        onClick={() => {
                                            if (this.state.toggleBodyParts === 'dropdown-menu ygi-dropdown__menu'){
                                                this.setState({
                                                    toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleDurations: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleLevels: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleStyles: 'dropdown-menu ygi-dropdown__menu',
                                                    toggleBodyParts: 'dropdown-menu ygi-dropdown__menu show'
                                                });
                                            } else {
                                                this.setState({toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'});
                                            }
                                        }} 
                                        className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-anatomical_focus" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Body Part</button>
                                        <div className={this.state.toggleBodyParts} aria-labelledby="dropdown-anatomical_focus">
                                            <div className="yi-anatomical_focus-dropdown__wrapper-desktop" style={{display: "block"}}>
                                                {bodyPartList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ygi-search-filters">
                    <div className="container px-3">
                        <div className="ygi-search-filters__wrapper">
                            <div className="ygi-search-filters__filters" style={{width: "100%"}}>
                                <label className="ygi-search-filters__filters-label">Filters</label>
                                <div className="row">
                                    {filterList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ygi-profile-classes">
                    <SearchResults search={this.state.search} classes={sampleData} filters={this.state.filters}/>
                </div>
            </section>
        </div>

    );
  }
}

export default ClassFinder;
