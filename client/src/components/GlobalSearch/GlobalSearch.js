import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BhSearch, BhDropdown } from '@baker-hughes-central-design/ui-toolkit-react/dist/components';
import _ from "lodash";

class GlobalSearch extends Component{
	constructor(props) {
		super(props);
		this.state = {
			searchValue: "",
			dropdownValue: "",
			isHorizontal: _.startsWith(localStorage.getItem("designTemplate"), "system")
		}
	}

	componentDidMount(){
		if(this.props.isDropdown){
			this.setState({dropdownValue: this.props.defaultDropdownValue})
		}
		document.documentElement.style.setProperty('--custom-radius', !this.props.isDropdown ? '100px' : '0');
    document.documentElement.style.setProperty('--input-active-width', this.props.inputActiveWidth);
    document.documentElement.style.setProperty('--input-inactive-width', this.props.inputInActiveWidth);
    document.documentElement.style.setProperty('--input-active-text-color', this.props.inputActiveTextColor);
    document.documentElement.style.setProperty('--input-inactive-text-color', this.props.inputInActiveTextColor);
    document.documentElement.style.setProperty('--input-active-bg-color', this.props.inputActiveBgColor);
    document.documentElement.style.setProperty('--input-inactive-bg-color', this.props.inputInActiveBgColor);
    document.documentElement.style.setProperty('--input-active-icon-color', this.props.inputActiveIconColor);
    document.documentElement.style.setProperty('--input-inactive-icon-color', this.props.inputInActiveIconColor);
    document.documentElement.style.setProperty('--dropdown-width', this.props.dropdownWidth);
    document.documentElement.style.setProperty('--search-input-left-padding', !this.props.isDropdown ? '20px' : '10px');
		
	}

	shareSearchContext(){
    const searchConfig = JSON.parse(localStorage.getItem("searchConfig"));
    let data;
    let body = {};
    setTimeout(()=>{
			/* istanbul ignore if */
			if(this.state.searchValue){
				body.searchValue = this.state.searchValue;
			}
			/* istanbul ignore else */
			if(this.state.dropdownValue){
				body.dropdownValue = this.state.dropdownValue;
			}
			data = {
				context: {
					eventName: 'search-event',
					body: body,
					timeStamp: Date.now(),
					origin: window.location.origin
				}
			};
			var payloadData = {
				state: { mode: searchConfig.navigationObject.mode, detail: { payLoad: data.context } },
				appname: searchConfig.navigationObject.appName
			}
			/* istanbul ignore if */
			if(this.state.searchValue !== ""){
				window.parent.postMessage(JSON.stringify({ eventType: "navigation", payload: payloadData }));
			}
    },700)
  };

  saveEnteredValue = (e) => {
    this.setState({searchValue: e.detail});
  };
  saveDropdownValue = (e) => {
    this.setState({dropdownValue: e.detail});
  }

	/* istanbul ignore next */
	keyCheck = (e) => {
		if(e.key === 'Enter'){
			this.shareSearchContext()
		}
	}

	render(){
		const {t} = this.props;
		return(
			<div class='global-search-container'>
				 {this.props.isDropdown && 
				 <BhDropdown
						class='dropdown'
						menuItems={this.props.dropdownData.map((data)=>{
								return t(data);
						})}
						value={t(this.state.dropdownValue)}
						selectedValue={t(this.state.dropdownValue)}
						onBhEventChange={this.saveDropdownValue.bind(this)}
						isEllipsis={true}
						menuWidth={"medium"}
				 />}
				 <BhSearch
						class={this.state.isHorizontal ? 'gs_search_s1' : 'gs_search'}
						value={t(this.props.searchValue)}
						onCtaClick={this.shareSearchContext.bind(this)}
						onQuery={this.saveEnteredValue.bind(this)}
						onKeyPress={this.keyCheck.bind(this)}
						id="globalsearch"
						isError={this.props.isError}
						isSmall={this.props.isSmall}
						isDisabled={this.props.isDisabled}
						placeholder={t(this.props.placeholder)}
						data={[{}]}
						isFluid={true}
						search={[{
							"type": this.props.searchIcon,
							"key": "cta-search"
						}]}
					/> 
			</div>
		)	
	}
}

GlobalSearch.defaultProps = {
    placeholder: "Search",
    searchValue: "", 
    inputActiveWidth: "",
    inputInActiveWidth: "",
    inputActiveTextColor: "black",
    inputInActiveTextColor: "black",
    inputActiveBgColor: "white",
    inputInActiveBgColor: "white",
    inputActiveIconColor: "white",
    inputInActiveIconColor: "white",
    isDropdown: false, 
    dropdownData: [],
    defaultDropdownValue: "", 
    dropdownWidth: "",
    isError: false,
    isDisabled: false,
    isSmall: false,
    searchIcon: "primary"
}

export default GlobalSearch;

GlobalSearch.propTypes = {
  placeholder: PropTypes.string,
	searchValue: PropTypes.string, 
	inputActiveWidth: PropTypes.string,
	inputInActiveWidth: PropTypes.string,
	inputActiveTextColor: PropTypes.string,
	inputInActiveTextColor: PropTypes.string,
	inputActiveBgColor: PropTypes.string,
	inputInActiveBgColor: PropTypes.string,
	inputActiveIconColor: PropTypes.string,
	inputInActiveIconColor: PropTypes.string,
	isDropdown: PropTypes.bool, 
	dropdownData: PropTypes.array,
	defaultDropdownValue: PropTypes.string, 
	dropdownWidth: PropTypes.string, 
	isError: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isSmall: PropTypes.bool,
	searchIcon: PropTypes.string
}
