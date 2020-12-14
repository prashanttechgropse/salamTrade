// import React from 'react';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import { classnames } from './helpers';

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       address: '',
//       errorMessage: '',
//       latitude: null,
//       longitude: null,
//       isGeocoding: false,
//     };
//   }

//   handleChange = address => {
//     this.setState({
//       address,
//       latitude: null,
//       longitude: null,
//       errorMessage: '',
//     });
//   };

//   handleSelect = selected => {
//     this.setState({ isGeocoding: true, address: selected });
//     geocodeByAddress(selected)
//       .then(res => getLatLng(res[0]))
//       .then(({ lat, lng }) => {
//         this.setState({
//           latitude: lat,
//           longitude: lng,
//           isGeocoding: false,
//         });
//       })
//       .catch(error => {
//         this.setState({ isGeocoding: false });
//         console.log('error', error); // eslint-disable-line no-console
//       });
//   };

//   handleCloseClick = () => {
//     this.setState({
//       address: '',
//       latitude: null,
//       longitude: null,
//     });
//   };

//   handleError = (status, clearSuggestions) => {
//     console.log('Error from Google Maps API', status); // eslint-disable-line no-console
//     this.setState({ errorMessage: status }, () => {
//       clearSuggestions();
//     });
//   };

//   render() {
//     const {
//       address,
//       errorMessage,
//       latitude,
//       longitude,
//       isGeocoding,
//     } = this.state;

//     return (
//       <div>
//         <PlacesAutocomplete
//           onChange={this.handleChange}
//           value={address}
//           onSelect={this.handleSelect}
//           onError={this.handleError}
//           shouldFetchSuggestions={address.length > 2}
//         >
//           {({ getInputProps, suggestions, getSuggestionItemProps }) => {
//             return (
//               <div className="Demo__search-bar-container">
//                 <div className="Demo__search-input-container">
//                   <input
//                     {...getInputProps({
//                       placeholder: 'Search Places...',
//                       className: 'Demo__search-input',
//                     })}
//                   />
//                   {this.state.address.length > 0 && (
//                     <button
//                       className="Demo__clear-button"
//                       onClick={this.handleCloseClick}
//                     >
//                       x
//                     </button>
//                   )}
//                 </div>
//                 {suggestions.length > 0 && (
//                   <div className="Demo__autocomplete-container">
//                     {suggestions.map(suggestion => {
//                       const className = classnames('Demo__suggestion-item', {
//                         'Demo__suggestion-item--active': suggestion.active,
//                       });

//                       return (
//                         /* eslint-disable react/jsx-key */
//                         <div
//                           {...getSuggestionItemProps(suggestion, { className })}
//                         >
//                           <strong>
//                             {suggestion.formattedSuggestion.mainText}
//                           </strong>{' '}
//                           <small>
//                             {suggestion.formattedSuggestion.secondaryText}
//                           </small>
//                         </div>
//                       );
//                       /* eslint-enable react/jsx-key */
//                     })}
//                     <div className="Demo__dropdown-footer">
//                       <div>
//                         <img
//                         //   src={require('../images/powered_by_google_default.png')}
//                           className="Demo__dropdown-footer-image"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           }}
//         </PlacesAutocomplete>
//         {errorMessage.length > 0 && (
//           <div className="Demo__error-message">{this.state.errorMessage}</div>
//         )}

//         {((latitude && longitude) || isGeocoding) && (
//           <div>
//             <h3 className="Demo__geocode-result-header">Geocode result</h3>
//             {isGeocoding ? (
//               <div>
//                 <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
//               </div>
//             ) : (
//               <div>
//                 <div className="Demo__geocode-result-item--lat">
//                   <label>Latitude:</label>
//                   <span>{latitude}</span>
//                 </div>
//                 <div className="Demo__geocode-result-item--lng">
//                   <label>Longitude:</label>
//                   <span>{longitude}</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
  
  
  
  
//   );
//   }
// }

// export default SearchBar;

// import React, { Component } from 'react';
// import  CheckBox  from './map1'

// class First extends Component {
// constructor(props) {
//   super(props)
//   this.state = {
//     fruites: [
//       {id: 1, value: "banana", isChecked: false},
//       {id: 2, value: "apple", isChecked: false},
//       {id: 3, value: "mango", isChecked: false},
//       {id: 4, value: "grap", isChecked: false}
//     ]
//   }
// }

// handleAllChecked = (event) => {
//   let fruites = this.state.fruites
//   fruites.forEach(fruite => fruite.isChecked = event.target.checked) 
//   this.setState({fruites: fruites})
// }

// handleCheckChieldElement = (event) => {
//   let fruites = this.state.fruites
//   fruites.forEach(fruite => {
//      if (fruite.value === event.target.value)
//         fruite.isChecked =  event.target.checked
//   })
//   this.setState({fruites: fruites})
// }

// render() {
//   console.log('7777777777777777777',this.state.fruites);
//   return (
//     <div className="App">
//     <h1> Check and Uncheck All Example </h1>
//     <input type="checkbox" onClick={this.handleAllChecked}  value="checkedall" /> Check / Uncheck All
//       <ul>
//       {
//         this.state.fruites.map((fruite) => {
//           return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...fruite} />)
//         })
//       }
//       </ul>
//     </div>
//   );
// }
// }

// export default First;


// import React , {Component} from 'react';
// import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
// class First extends Component {
//   sportsData = [
//     { Id: 'game1', Game: 'Badminton' },
//     { Id: 'game2', Game: 'Football' },
//     { Id: 'game3', Game: 'Tennis' },
//     { Id: 'game4', Game: 'Golf' },
//     { Id: 'game5', Game: 'Cricket' },
//     { Id: 'game6', Game: 'Handball' },
//     { Id: 'game7', Game: 'Karate' },
//     { Id: 'game8', Game: 'Fencing' },
//     { Id: 'game9', Game: 'Boxing' }
// ];
//   fields = { text: 'Game', value: 'Id' };
//   render() {
//     const options = [
//       { label: 'Thing 1', value: 1},
//       { label: 'Thing 2', value: 2},
//     ];
//     console.log('99999999999999',options);
//     return (
//         // specifies the tag for render the MultiSelect component
//         <div>
//         <MultiSelectComponent id="checkbox" dataSource={this.sportsData}
//                 fields={this.fields} placeholder="Select game" mode="CheckBox" selectAllText="Select All" unSelectAllText="unSelect All" showSelectAll={true}>
//                 <Inject services={[CheckBoxSelection]} />
//             </MultiSelectComponent>
//               <br/>
//               <br/>
//             {/* <ReactMultiSelectCheckboxes options={options} /> */}
//             </div>
//     );
// }

// }

// export default First;


import React, { useState, Component } from 'react'
// import CheckboxGroup from 'react-checkbox-group'

class Map extends Component{
constructor() {
  super()
  // initialize your options array on your state
  this.state = {
    sum : "shivendra",
    kuch : "shiv",
    nh : "jadon",
    options: [],
  }
}

onChange(e) {
  console.log('e.target.value',e.target.value)
  // current array of options
  const options = this.state.options
  let index

  // check if the check box is checked or unchecked
  if (e.target.checked) {
    // add the numerical value of the checkbox to options array
    options.push(e.target.value)
  } else {
    // or remove the value from the unchecked checkbox from the array
    index = options.indexOf(e.target.value)
    options.splice(index)
  }

  // update the state with the new array of options
  this.setState({ options: options })
}

render() {
  console.log('SSSSSSSSSSSSSSSS',this.state.options);
  // console.log('7777777777777777777',this.state);

  return (
    <main className='portfolio'>

      <form>
        <div className="input-group">
          <label>cb1</label>
          <input type="checkbox" value={this.state.sum} onChange={this.onChange.bind(this)} />
        </div>
        <div className="input-group">
          <label>cb2</label>
          <input type="checkbox" value={this.state.kuch} onChange={this.onChange.bind(this)} />
        </div>
        <div className="input-group">
          <label>cb3</label>
          <input type="checkbox" value={this.state.nh} onChange={this.onChange.bind(this)} />
        </div>
      </form>

      <div className="selected-items">
        {this.state.options.map(number => 
           <p key={number}>item: {number}</p>
        )}
      </div>

    </main>
  )
}
}

export default Map;
