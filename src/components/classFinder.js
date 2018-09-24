import React, { Component } from 'react';
import SearchResults from './searchResults';
import sampleData from '../utils/sampleData.json';

class ClassFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            data: sampleData,
            teachers: [],
            durations: [],
            levels: [],
            styles: [],
            bodyParts: [],
            selectedDropDown: '',
            toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
            toggleDurations: 'dropdown-menu ygi-dropdown__menu',
            toggleLevels: 'dropdown-menu ygi-dropdown__menu',
            toggleStyles: 'dropdown-menu ygi-dropdown__menu',
            toggleBodyParts: 'dropdown-menu ygi-dropdown__menu',
            filters: [],
            filtered: false
        }
    }

    componentDidUpdate() {

        if (this.state.filters.length > 0) {
            let newData = this.state.data;
            this.state.filters.forEach((filter) => {
                newData = newData.filter((item) => {
                    return item[filter.type].includes(filter.data)
                });
            })
            if (this.state.filtered === false) {
                this.setState({filtered: true, data: newData});
            }
        } else {
            if (this.state.filtered === true) {
                this.setState({filtered: false, data: sampleData});
            }
        }
    }

    getDefaultToggleState() {
        return {
            toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
            toggleDurations: 'dropdown-menu ygi-dropdown__menu',
            toggleLevels: 'dropdown-menu ygi-dropdown__menu',
            toggleStyles: 'dropdown-menu ygi-dropdown__menu',
            toggleBodyParts: 'dropdown-menu ygi-dropdown__menu'
        }
    }

    addFilter(data, type, name = null, image = null) {
        let newToggleState = this.getDefaultToggleState();
        let found = false;
        this.state.filters.forEach((item) => {
            if (item.data === data) {
                found = true;
            }
        });
        if (!found) {
            newToggleState.filters = this.state.filters.concat([{name, data, type, image}])
        }
        this.setState(newToggleState)
    }

    buildList = (dataSet, type) => dataSet.map((data) => (
        <button 
        onClick={() => {
            this.addFilter(data, type);
        }} 
        key={data} className="dropdown-item ygi-dropdown__option">
            <span>{data}</span>
        </button>
    ));

    search(value) {
        setTimeout(() => {this.setState({search: value})}, 1000)
    }

    render() {
        // console.log(this.state)
        //Data for rendering purposes
        const teachers = sampleData.map((item) => {
            const teacherName = item.teacher[0].replace('-', ' ').replace('-', ' ').split(' ').map((item) => item[0].toUpperCase() + item.slice(1, item.length)).join(' ');
            let teacherImage = item.teacher_image;
            if (teacherImage.length === 0) {
                teacherImage = "https://yogainternational.com/assets/fonts/icons/icon-profile-placeholder.svg";
            }
            return {
                name: teacherName, data: item.teacher[0], image: teacherImage, type: 'teacher', 
            }
        }).filter((teacher, index, self) =>
            index === self.findIndex((t) => (
            t.data === teacher.data
            ))
        ).sort((a,b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));

        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index && value !== undefined;
        }
        const durations = this.state.data.map((item) => item.duration[0]).filter(onlyUnique).sort((a,b) => parseInt(a.replace(/[^0-9]/g, ''), 10) - parseInt(b.replace(/[^0-9]/g, ''), 10));
        const levels = this.state.data.map((item) => item.level[0]).filter(onlyUnique).sort();
        const styles = this.state.data.map((item) => item.style[0]).filter(onlyUnique).sort();
        const bodyParts = this.state.data.map((item) => item.anatomical_focus[0]).filter(onlyUnique).sort();

        //JSX Lists

        const teachersList = teachers.map((teacher) => {
            return (
                    <button 
                    onClick={() => {
                        this.addFilter(teacher.data, 'teacher', teacher.name, teacher.image);
                    }} 
                    key={teacher.data} className="dropdown-item ygi-dropdown__option">
                        <img className="yi-teacher-dropdown__image--small" src={teacher.image} alt="Teacher" />
                        <span>{teacher.name}</span>
                    </button>
                );
        })
        const durationList = this.buildList(durations, 'duration');
        const levelList = this.buildList(levels, 'level');
        const styleList = this.buildList(styles, 'style')
        const bodyPartList = this.buildList(bodyParts, 'anatomical_focus')

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
                <div className="container px-3"><h2 className="ygi-page-heading ygi-page-heading--dark">Online Yoga Classes </h2></div>
                <section className="ygi-search">
                    <div className="classFinder container px-3">
                        <div className="ygi-search__wrapper">
                            <div className="ygi-search-bar col col-12 col-lg-2">
                                <div className="ygi-search-bar__wrapper mt-2">
                                <input onChange={(event) => {
                                    this.search(event.target.value)
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
                                                    let newToggleState = this.getDefaultToggleState();
                                                    newToggleState.toggleTeachers = 'dropdown-menu ygi-dropdown__menu show'
                                                    this.setState(newToggleState);
                                                } else {
                                                    this.setState(this.getDefaultToggleState());
                                                }
                                            }} 
                                            className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-teacher" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Teacher
                                            <img src="https://yogainternational.com/assets/fonts/icons/icon-right-arrow.svg" style={{transform: "rotate(90deg)", marginLeft: "10px"}}/>
                                            </button>
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
                                                    let newToggleState = this.getDefaultToggleState();
                                                    newToggleState.toggleDurations = 'dropdown-menu ygi-dropdown__menu show'
                                                    this.setState(newToggleState);
                                                } else {
                                                    this.setState(this.getDefaultToggleState());
                                                }
                                            }} 
                                            className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-duration" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Duration
                                            <img src="https://yogainternational.com/assets/fonts/icons/icon-right-arrow.svg" style={{transform: "rotate(90deg)", marginLeft: "10px"}}/>
                                            </button>
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
                                                    let newToggleState = this.getDefaultToggleState();
                                                    newToggleState.toggleLevels = 'dropdown-menu ygi-dropdown__menu show'
                                                    this.setState(newToggleState);
                                                } else {
                                                    this.setState(this.getDefaultToggleState());
                                                }
                                            }} 
                                            className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-level" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Level
                                            <img src="https://yogainternational.com/assets/fonts/icons/icon-right-arrow.svg" style={{transform: "rotate(90deg)", marginLeft: "10px"}}/>
                                            </button>
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
                                                    let newToggleState = this.getDefaultToggleState();
                                                    newToggleState.toggleStyles = 'dropdown-menu ygi-dropdown__menu show'
                                                    this.setState(newToggleState);
                                                } else {
                                                    this.setState(this.getDefaultToggleState());
                                                }
                                            }} 
                                            className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-style" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Style
                                            <img src="https://yogainternational.com/assets/fonts/icons/icon-right-arrow.svg" style={{transform: "rotate(90deg)", marginLeft: "10px"}}/>
                                            </button>
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
                                                    let newToggleState = this.getDefaultToggleState();
                                                    newToggleState.toggleBodyParts = 'dropdown-menu ygi-dropdown__menu show'
                                                    this.setState(newToggleState);
                                                } else {
                                                    this.setState(this.getDefaultToggleState());
                                                }
                                            }} 
                                            className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-anatomical_focus" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Body Part
                                            <img src="https://yogainternational.com/assets/fonts/icons/icon-right-arrow.svg" style={{transform: "rotate(90deg)", marginLeft: "10px"}}/>
                                            </button>
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
