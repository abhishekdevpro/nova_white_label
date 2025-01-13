import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'; // Using react-icons for the search icon

// Styled Components
const Form = styled.form`
  display: flex;
  align-items: center; /* Center items vertically */
`;

const InputContainer = styled.div`
  position: relative; /* Position relative for the icon */
  width: 100%; /* Full width */
`;

const SearchIcon = styled(FaSearch)`
  position: absolute; /* Position the icon inside the input */
  left: 10px; /* Space from the left */
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Adjust for vertical centering */
  color: #6b7280; /* Gray color for the icon */
`;

const Input = styled.input`
  width: 100%; /* Full width */
  padding: 10px 40px; /* Padding with space for the icon */
  border: 1px solid #d1d5db; /* Light gray border */
  border-radius: 6px; /* Rounded corners */
  font-size: 16px; /* Font size */
  color: #1f2937; /* Dark gray text */
  background-color: #f9fafb; /* Light gray background */
  
  &:focus {
    outline: none; /* Remove outline */
    border-color: #3b82f6; /* Blue border on focus */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Blue shadow */
  }
`;

// Main Component
const SearchBox = () => {
  return (
    <Form method="post" action="#">
      <InputContainer>
        <SearchIcon />
        <Input
          type="search"
          name="search-field"
          placeholder="Search"
          required
        />
      </InputContainer>
    </Form>
  );
};

export default SearchBox;