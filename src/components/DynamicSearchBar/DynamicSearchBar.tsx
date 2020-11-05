import React from 'react';
import { Input, Button } from 'antd';
import './DynamicSearchBar.scss';
interface ListProps {
	items: string[];
}
interface ListState {
	filtered: string[];
}

class List extends React.Component<ListProps, ListState> {
	state = {
		filtered: [],
	};

	componentDidMount() {
		this.setState({
			filtered: this.props.items,
		});
	}

	componentWillReceiveProps(nextProps: ListProps) {
		this.setState({
			filtered: nextProps.items,
		});
	}

	render() {
		const { filtered } = this.state;
		return (
			<div>
				<div className="search-bar">
					<Input
						className="searchbar"
						placeholder="please input"
						onChange={(e) => this.handleChange(e)}
					></Input>
				</div>
				<div className="list">
					{filtered &&
						filtered.map((item) => {
							return (
								<div key={item} className="list-item">
									{item}
								</div>
							);
						})}
				</div>
			</div>
		);
	}

	handleChange(e: any) {
		// Variable to hold the original version of the list
		let currentList = [];
		// Variable to hold the filtered list before putting into state
		let newList = [];

		// If the search bar isn't empty
		if (e.target.value !== '') {
			// Assign the original list to currentList
			currentList = this.props.items;

			// Use .filter() to determine which items should be displayed
			// based on the search terms
			newList = currentList.filter((item) => {
				// change current item to lowercase
				const lc = item.toLowerCase();
				// change search term to lowercase
				const filter = e.target.value.toLowerCase();
				// check to see if the current list item includes the search term
				// If it does, it will be added to newList. Using lowercase eliminates
				// issues with capitalization in search terms and search content
				return lc.includes(filter);
			});
		} else {
			// If the search bar is empty, set newList to original task list
			newList = this.props.items;
		}
		// Set the filtered state based on what our rules added to newList
		this.setState({
			filtered: newList,
		});
	}
}

class DynamicSearchBar extends React.Component {
	state = {
		list: ['react', 'javascript', 'typescript', 'css', 'html'],
	};
	render() {
		const { list } = this.state;
		return (
			<div className="DynamicSearchBar">
				<h3>Dynamic Search Bar</h3>
				<div className="DynamicSearchBar-show-list">
					<List items={list} />
				</div>

				{/* <div className="DynamicSearchBar-add-item">
					<Input className="additem"></Input>
					<Button className="addbtn" onClick={() => {}}></Button>
				</div> */}
			</div>
		);
	}
}

export default DynamicSearchBar;
