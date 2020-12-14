import React from 'react';
import './menu.css';
import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URL;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesscategoryList: [],
      categoryList: [],
      SubcategoryList: [],
      businesscategory: '',
    }
    this.fetchCategory = this.fetchCategory.bind(this);
    this.fetchSubCategory = this.fetchSubCategory.bind(this);
  }

  fetchCategory() {
    axios.post(URL + '/api/user/fetchcategory').then((response) => {
      if (response) {
        this.setState({
          categoryList: response.data.category
        })
      }
    })
  }

  fetchSubCategory() {
    axios.post(URL + '/api/user/fetchSubCategory').then((resp) => {
      if (resp) {
        this.setState({
          SubcategoryList: resp.data.results
        })
      }
    })
  }

  componentDidMount() {
    const props = this.props;
    this.setState({
      businesscategoryList: props.businesscategoryList
    })
  }
  componentWillReceiveProps(nextProps) {
    const props = nextProps;
    this.setState({
      businesscategoryList: props.businesscategoryList
    })
  }
  componentWillMount() {
  }

  handleSelect(e, i) {
  }

  subcat() {
    return window.location = '/Productlist';
  }



  render(e) {
    return (
      <nav>
        <div className="container">
          <div className="nav-inner">
            <ul id="nav" className="hidden-xs">
              {
                this.state.businesscategoryList.map((e, i) => {
                  return (
                    <React.Fragment key={i}>
                      <li className="level0 nav-5 level-top first"><a href="javascript:;"><span>{e.business_name}</span> </a>
                        <div className="level0-wrapper dropdown-6col">
                          <div className="level0-wrapper2">
                            <div className="nav-block nav-block-center">
                              <ul className="level0">
                                {
                                  e['categories'].map((f, d) => {
                                    return (
                                      <React.Fragment key={`categories_el_${d}`}>
                                        <li className="level3 nav-6-1 parent item"> <a href="javascript:;"><span>{f.categories}</span></a>
                                          <ul className="level1">
                                            {
                                              f['subcategorie'].map((g, c) => {
                                                return (
                                                  <li key={`li_el_${c}`} className="level2 nav-6-1-1"> <a href={"/Productlist?subcategory=" + g._id} ><span>{g.subcategory}</span></a> </li>
                                                )
                                              })
                                            }
                                          </ul>
                                        </li>
                                      </React.Fragment>
                                    )
                                  })
                                }
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    </React.Fragment>
                  )
                })
              }
              
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Menu;