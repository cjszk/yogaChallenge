import React, { Component } from 'react';
import SearchResults from './searchResults';
import sampleData from '../utils/sampleData.json';

class ClassFinder extends Component {
    constructor(props) {
        super(props);

        this.timeOut = 0;        

        this.state = {
            search: '',
            data: sampleData,
            toggleTeachers: 'dropdown-menu ygi-dropdown__menu',
            toggleDurations: 'dropdown-menu ygi-dropdown__menu',
            toggleLevels: 'dropdown-menu ygi-dropdown__menu',
            toggleStyles: 'dropdown-menu ygi-dropdown__menu',
            toggleBodyParts: 'dropdown-menu ygi-dropdown__menu',
            filters: [],
            filtered: 0,
        }
    }
    
    componentDidUpdate() {
        if (this.state.filtered < this.state.filters.length) {
            const teacherFilters = this.state.filters.filter((filter) => filter.type === 'teacher');
            const nonTeacherFilters = this.state.filters.filter((filter) => filter.type !== 'teacher');
            let i = 0;
            let filteredData = [];
            while (i < teacherFilters.length) {
                sampleData.forEach((item) => {
                    if (item[teacherFilters[i].type].includes(teacherFilters[i].data)) filteredData.push(item);
                })
                i++;
            }
            if (this.state.filtered < this.state.filters.length && i === this.state.filters.length) this.setState({filtered: this.state.filtered + 1, data: filteredData})
            while (i >= teacherFilters.length && i < this.state.filters.length) {
                if (filteredData.length === 0) filteredData = this.state.data;
                nonTeacherFilters.forEach((filter) => {
                    filteredData = filteredData.filter((item) => {
                        return item[filter.type].includes(filter.data)
                    });
                    if (this.state.filtered < this.state.filters.length) this.setState({filtered: this.state.filtered + 1, data: filteredData});
                })
                i++;
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
            if (item.data === data) found = true;
        });
        if (!found) newToggleState.filters = this.state.filters.concat([{name, data, type, image}])
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

    createFilterOption = (toggle, list, type, label) => 
        <div className="col-lg col-md-6 col-xs-12 mt-2">
            <div className="ygi-dropdown__wrapper yi-teacher-dropdown nopadding d-block yi-dropdown--beneath-modal">
                <button
                onClick={() => {
                    if (toggle === 'dropdown-menu ygi-dropdown__menu'){
                        let newToggleState = this.getDefaultToggleState();
                        newToggleState[type] = 'dropdown-menu ygi-dropdown__menu show'
                        this.setState(newToggleState);
                    } else {
                        this.setState(this.getDefaultToggleState());
                    }
                }} 
                className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-teacher" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">{label}
                <img src="https://yogainternational.com/assets/fonts/icons/icon-right-arrow.svg" style={{transform: "rotate(90deg)", marginLeft: "10px"}}/>
                </button>
                <div className={toggle} aria-labelledby="dropdown-teacher">
                    <div className="yi-teacher-dropdown__wrapper-desktop" style={{display: "block"}}>
                        {list}
                    </div>
                </div>
            </div>
        </div>

    initiateTypingTimer() {
        this.setState({typingTimeout: 3})
    }

    render() {
        console.log(this.state)
        
        //Data for rendering purposes
        const teachers = sampleData.map((item) => {
            const teacherName = item.teacher[0].replace('-', ' ').replace('-', ' ').split(' ').map((item) => item[0].toUpperCase() + item.slice(1, item.length)).join(' ');
            let teacherImage = item.teacher_image;
            if (teacherImage.length === 0) teacherImage = "https://yogainternational.com/assets/fonts/icons/icon-profile-placeholder.svg";
            return {
                name: teacherName, data: item.teacher[0], image: teacherImage, type: 'teacher', 
            }
        }).filter((teacher, index, self) =>
            index === self.findIndex((t) => (
            t.data === teacher.data
            ))
        ).sort((a,b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));

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
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index && value !== undefined;
        }
        const durations = this.state.data.map((item) => item.duration[0]).filter(onlyUnique).sort((a,b) => parseInt(a.replace(/[^0-9]/g, ''), 10) - parseInt(b.replace(/[^0-9]/g, ''), 10));
        const durationList = this.buildList(durations, 'duration');
        const levels = this.state.data.map((item) => item.level[0]).filter(onlyUnique).sort();
        const levelList = this.buildList(levels, 'level');
        const styles = this.state.data.map((item) => item.style[0]).filter(onlyUnique).sort();
        const styleList = this.buildList(styles, 'style')
        const bodyParts = this.state.data.map((item) => item.anatomical_focus[0]).filter(onlyUnique).sort();
        const bodyPartList = this.buildList(bodyParts, 'anatomical_focus')

        let filterList = [];

        if (this.state.filters.length > 0) {
            this.state.filters.forEach((item) => {
                let filterTag = <label value={item.data}  className="ygi-search-filters__filter-label">{item.data}</label>;

                if (item.type === 'teacher') {
                    filterTag =
                    <span>
                        <img value={item.data}  className="ygi-search-filters__filter-teacher-image" alt="Teacher" src={item.image}/>
                        <label value={item.data}  className="ygi-search-filters__filter-label">{item.data}</label>
                    </span>
                }

                filterList.push(
                    <div value={item.data} key={item.data} onClick={() => {
                        this.setState({
                            filters: this.state.filters.filter((filterItem) => filterItem.data !== item.data), filtered: 0, data: sampleData
                        })
                        }} className="mt-2">
                        <div value={item.data} role="button" className="ygi-search-filters__filter">
                            {filterTag}
                        </div>
                    </div>
                )
            })
        }

        const teacherFilters = this.createFilterOption(this.state.toggleTeachers, teachersList, 'toggleTeachers', 'Teacher');
        const durationsFilters = this.createFilterOption(this.state.toggleDurations, durationList, 'toggleDurations', 'Duration');
        const levelFilters = this.createFilterOption(this.state.toggleLevels, levelList, 'toggleLevels', 'Level');
        const styleFilters = this.createFilterOption(this.state.toggleStyles, styleList, 'toggleStyles', 'Style');
        const bodyPartFilters = this.createFilterOption(this.state.toggleBodyParts, bodyPartList, 'toggleBodyParts', 'Body Part');

        const filterOptions = 
            <div className="row">
                {teacherFilters}
                {durationsFilters}
                {levelFilters}
                {styleFilters}
                {bodyPartFilters}
            </div>

        return (
            <div className="default-page-wrapper">
                <div className="container px-3"><h2 className="ygi-page-heading ygi-page-heading--dark">Online Yoga Classes </h2></div>
                <section className="ygi-search">
                    <div className="classFinder container px-3">
                        <div className="ygi-search__wrapper">
                            <div className="ygi-search-bar col col-12 col-lg-2">
                                <div className="ygi-search-bar__wrapper mt-2">
                                <input onChange={(event) => {
                                    const value = event.target.value;
                                    if (this.timeOut) clearTimeout(this.timeOut);
                                    this.timeOut = setTimeout(() => {
                                        console.log('test')                                        
                                        this.setState({search: value})
                                    }, 500)
                                }} className="ygi-search-bar__input" placeholder="Search" />
                                </div>
                            </div>
                            <button className="ygi-search__filter-btn mx-auto mb-2 " aria-label="Shows Filters">Show Filters</button>
                            <div className="yi-dropdowns__wrapper-visibility col-lg-10">
                                {filterOptions}
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
                        <SearchResults search={this.state.search} classes={this.state.data} filters={this.state.filters}/>
                    </div>
                </section>
            </div>

        );
    }
}

export default ClassFinder;
