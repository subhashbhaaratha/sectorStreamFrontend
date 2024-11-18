import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Form,
  Button,
} from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/searchSlice"; // Adjust the path as needed
import { FaSearch } from "react-icons/fa";
import logoutIcon from "../assets/log-out.png";
import SignUpIcon from "../assets/sign-up.png";
import LogoNew from "../assets/logoNew.jpg";
import axios from "axios";
import { CURRENT_API } from "../utils/utils";

const Header = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState({});
  const [packagesOpen, setPackagesOpen] = useState({});
  const [allIndustries, setAllIndustries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const currentRole = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleDropdownClick = (e, tabName) => {
    e.stopPropagation();
    setCurrentTab(tabName);
    if (tabName === "services") {
      setServicesOpen(!servicesOpen);
    }
  };

  const handleIndustryClick = (e, industryId) => {
    e.stopPropagation();
    setSolutionsOpen((prev) => ({
      ...prev,
      [industryId]: !prev[industryId],
    }));
    // Close services dropdown
    setServicesOpen(false);
  };

  const handleSolutionClick = (e, solutionId) => {
    e.stopPropagation();
    setPackagesOpen((prev) => ({
      ...prev,
      [solutionId]: !prev[solutionId],
    }));
    // Close services dropdown
    setServicesOpen(false);
  };

  const fetchAllIndustries = useCallback(async () => {
    try {
      const res = await axios.get(
        CURRENT_API + "/api/industries/getIndustries"
      );
      setAllIndustries(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput));
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      dispatch(setSearchTerm(""));
    }
  };

  useEffect(() => {
    fetchAllIndustries();
  }, [fetchAllIndustries]);

  return (
    <Navbar bg="light" expand="lg" className="header-navbar fixed-top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="header-brand"
          onClick={() => setCurrentTab("home")}
        >
          <img
            className="header-logo"
            style={{ width: "50px" }}
            src={LogoNew}
            alt="GoKaddle logo"
          />
          SectorStream
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <Dropdown
                as={Nav.Item}
                show={servicesOpen}
                onClick={(e) => handleDropdownClick(e, "services")}
              >
                <Dropdown.Toggle
                  as={Nav.Link}
                  variant="light"
                  id="services-dropdown"
                  className={`custom-dropdown-toggle ${
                    currentTab === "services" ? "active" : ""
                  }`}
                  caret={false}
                >
                  Services
                  <span className="dropdown-icon">
                    {servicesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allIndustries?.data?.map((industry) => (
                    <Dropdown
                      as={Nav.Item}
                      id={`/solution/${industry.name}/${industry._id}`}
                      key={industry._id}
                      show={solutionsOpen[industry._id]}
                      onClick={(e) => handleIndustryClick(e, industry._id)}
                    >
                      <Dropdown.Toggle
                        as={Link}
                        variant="light"
                        to={`/solution/${industry.name}/${industry._id}`}
                        className="custom-dropdown-toggle"
                        caret={false}
                      >
                        {industry.name}
                        <span className="dropdown-icon">
                          {/* {solutionsOpen[industry._id] ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )} */}
                        </span>
                      </Dropdown.Toggle>
                      {/* <Dropdown.Menu>
                      {industry.solutions.map((solution) => (
                        <Dropdown
                          as={Nav.Item}
                          key={solution._id}
                          show={packagesOpen[solution._id]}
                          onClick={(e) => handleSolutionClick(e, solution._id)}
                        >
                          <Dropdown.Toggle
                            as={Link}
                            variant="light"
                            to={`/solutionPackage/${solution.name}/${industry._id}/${solution._id}`}
                            className="custom-dropdown-toggle"
                            caret={false}
                          >
                            {solution.name}
                          </Dropdown.Toggle>
                        </Dropdown>
                      ))}
                    </Dropdown.Menu> */}
                    </Dropdown>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Nav.Item>
              <Nav.Link as={Link} to="/knowledgebase">
                Knowledge Base
              </Nav.Link>
            </Nav.Item>
            {isLoggedIn && currentRole === "admin" && (
              <Nav.Item>
                <Nav.Link as={Link} to="/admin">
                  Admin
                </Nav.Link>
              </Nav.Item>
            )}
            {isLoggedIn && currentRole === "seller" && (
              <Nav.Item>
                <Nav.Link as={Link} to="/provider">
                  Provider
                </Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item>
              <Nav.Link as={Link} to="/support">
                Support
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {isLoggedIn && (
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleInputChange}
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </form>
          )}
          <Nav>
            {isLoggedIn ? (
              <Nav.Item onClick={handleLogout} className="logout-button">
                <Nav.Link>
                  <img
                    src={logoutIcon}
                    alt="logout"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Logout
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item onClick={handleLogin} className="logout-button">
                <Nav.Link>
                  <img
                    src={SignUpIcon}
                    alt="signup"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Login
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
