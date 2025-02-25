import React from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  height: 300px;
  background: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Card = styled.div`
  background-color: #f5f7fc;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h5`
  color: #0d47a1;
  font-weight: bold;
  margin-bottom: 1rem;
`;


const MapJobFinder = () => (
    <Card>
         <Title>Job Location</Title>
  <MapContainer>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31571676.56496063!2d-124.84897487781247!3d37.275120302365075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c05555555555%3A0x4b1c9b0aaf10b10!2sUnited%20States!5e0!3m2!1sen!2sus!4v1613954061167!5m2!1sen!2sus"
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </MapContainer>
  </Card>
);

export default MapJobFinder;
