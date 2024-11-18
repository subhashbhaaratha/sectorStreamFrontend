import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CustomCard from "./CustomCard";
import axios from "axios";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";
import NoRecordFound from "./NoRecordFound";
import { useSelector } from "react-redux";
import { CURRENT_API } from "../utils/utils";

const OurIndustries = () => {
  const [allIndustries, setAllIndustries] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  console.log("searchTerm is here", searchTerm);
  const [newIndustry, setNewIndustry] = useState({
    title: "",
    file: null,
  });

  useEffect(() => {
    fetchAllIndustries();
  }, []);

  const fetchAllIndustries = async () => {
    try {
      const res = await axios.get(
        CURRENT_API + "/api/industries/getIndustries"
      );
      console.log("res from axios", res);
      setAllIndustries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addIndustry = async () => {
    const formData = new FormData();
    console.log("adding new industry file", newIndustry.file);
    formData.append("name", newIndustry.title);
    if (newIndustry.file) {
      formData.append("image", newIndustry.file);
    }

    try {
      const res = await axios.post(
        CURRENT_API + "/api/industries/addIndustry",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("res from axios", res);
      if (res.status === 200) {
        setOpenModal(false);
        fetchAllIndustries();
        setNewIndustry({
          title: "",
          file: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Filter industries based on searchTerm
  const filteredIndustries = allIndustries?.data?.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("allIndustries", allIndustries);
  return (
    <div className="our-industries">
      <Container className="industries-container">
        <h1 className="industries-header">Our Industries</h1>
        <p className="industries-description">
          Building Robust, Reliable & Resilient Digital Solutions from the
          Ground Up
        </p>
        {filteredIndustries && filteredIndustries.length > 0 ? (
          <div className="industries-cards">
            {filteredIndustries.map((industry) => (
              <Link
                key={industry._id}
                to={{
                  pathname: `/solution/${industry.name}/${industry._id}`,
                  state: { value: industry.name },
                }}
                className="industries-link"
              >
                <CustomCard
                  cardName={industry.name}
                  cardImage={industry.image}
                  solutionNumber={industry.solutions.length}
                  solutionName={Object.keys(industry)[3]}
                />
              </Link>
            ))}
          </div>
        ) : (
          <NoRecordFound />
        )}
      </Container>
    </div>
  );
};

export default OurIndustries;
