import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, BlockDes, Col, Row, Icon, Button,
  PaginationComponent,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  PreviewCard,
  DataTableItem } from "../../../components/Component";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem, Badge } from "reactstrap";

import { categories } from "./data/category";

const DocumentCategories = () => {

  const [data, setData] = useState(categories);

  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");

  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");


  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
      setData([...sortedData]);
    }
  };

  // unselects the data on mount
  useEffect(() => {
    let newData;
    newData = categories.map((item) => {
      item.checked = false;
      return item;
    });
    setData([...newData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = categories.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.type.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...categories]);
    }
  }, [onSearchText, setData]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };


  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <React.Fragment>
      <Head title="Categories"></Head>
      <Content>
        <BlockHead size="lg">
          <div className="nk-block-head-sub"><span></span></div>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle className="page-title">Document Categories</BlockTitle>
              <BlockDes>
                <p>Add Document Categories here.</p>
              </BlockDes>
            </BlockHeadContent>
           
          </BlockBetween>
        </BlockHead>
        <Block>
        <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-title">
                    <h5 className="title">Categories</h5>
                </div>
                <div className="card-tools me-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </a>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                          <div className="dot dot-primary"></div>
                          <Icon name="filter-alt"></Icon>
                        </DropdownToggle>
                        <DropdownMenu
                          end
                          style={{ overflow: "visible" }}
                        >
                          <div className="dropdown-content">
                              <ul className="link-check">
                                  <li>
                                      <a href="#"><Icon name="calendar-check"></Icon><span>Date Created</span></a>
                                  </li>
                                  <li className="active">
                                      <a href="#"><Icon name="edit"></Icon><span>Last Modified</span></a>
                                  </li>
                                  <li>
                                      <a href="#"><Icon name="text-a"></Icon><span>Alphabetical</span></a>
                                  </li>
                              </ul>
                          </div>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Search by user or email"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DataTableBody>
              <DataTableHead>
                <DataTableRow>
                  <h6 className="overline-title">Name</h6>
                </DataTableRow>
                <DataTableRow size="sm">
                 
                </DataTableRow>
                <DataTableRow size="md">
                  <h6 className="overline-title">Last Modified</h6>
                </DataTableRow>
                <DataTableRow></DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {currentItems.length > 0
                ? currentItems.map((item) => {
                    return (
                      <DataTableItem key={item.id}>
                        <DataTableRow>
                          <div className="caption-text">{item.name}</div>
                        </DataTableRow>
                        <DataTableRow size="sm">
                          
                        </DataTableRow>
                        <DataTableRow size="md">
                          <div className="sub-text d-inline-flex flex-wrap gx-2">{item.lastmodified}</div>
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-tools">
                          <ul className="nk-tb-actions gx-1">
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#eye"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="eye"></Icon>
                                        <span>View Category</span>
                                      </DropdownItem>
                                    </li>
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#edit"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="edit"></Icon>
                                        <span>Rename</span>
                                      </DropdownItem>
                                    </li>
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#trash"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="trash"></Icon>
                                        <span>Move to Trash</span>
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </DataTableRow>
                      </DataTableItem>
                    );
                  })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {currentItems.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add New Category</BlockTitle>
             
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <div className="card-head">
              <h5 className="card-title">Category Setting</h5>
            </div>
            <form className="gy-3">
              <Row className="g-3 align-center">
                <Col lg="5">
                  <div className="form-group">
                    <label className="form-label" htmlFor="site-name">
                      Name
                    </label>
                    <span className="form-note">The name that appears on your site.</span>
                  </div>
                </Col>
                <Col lg="7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="site-name"
                        className="form-control"
                        defaultValue="DashLite Admin Template"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              
            
             
              <Row className="g-3">
                <Col lg="7" className="offset-lg-5">
                  <div className="form-group mt-2">
                    <Button color="primary" size="lg" onClick={(e) => e.preventDefault()}>
                      Add New Category
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default DocumentCategories;
