import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import styled from "styled-components";

const NavbarManagementForm = () => {
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [menuItems, setMenuItems] = useState([
    { icon: '', label: '', route: '' }
  ]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("vendorToken");

  // Fetch existing navbar data
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const response = await axios.get('https://apiwl.novajobs.us/api/admin/general-info', {
          headers: {
            'Authorization': token
          }
        });
        // console.log(response.data.data,"lll");
        if (response.data.data) {
          setLogoPreview(response.data.data.navigation.logo);
          if (response.data.data.menuItems) {
            // setMenuItems(response.data.data.menuItems);
          }
        }
      } catch (error) {
        console.error('Error fetching navbar data:', error);
        toast.error('Failed to fetch existing navbar data');
      }
    };

    fetchNavbarData();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('Logo file size should not exceed 2MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      setLogo(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMenuItemChange = (index, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][field] = value;
    setMenuItems(newMenuItems);
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { icon: '', label: '', route: '' }]);
  };

  const removeMenuItem = (index) => {
    const newMenuItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(newMenuItems);
  };

  const handleLogoSubmit = async () => {
    if (!logo) {
      setError('Please select a logo file');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('logo_upload', logo);

    try {
      const response = await axios.put(
        'https://apiwl.novajobs.us/api/admin/navigation',
        formData,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        toast.success('Logo updated successfully');
        setError('');
      }
    } catch (error) {
      console.error('Error updating logo:', error);
      setError(error.response?.data?.message || 'Failed to update logo');
      toast.error('Failed to update logo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuSubmit = async () => {
    // Validate menu items
    const hasEmptyFields = menuItems.some(item => !item.icon || !item.label || !item.route);
    if (hasEmptyFields) {
      setError('All menu item fields are required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        '',
        { menuItems },
        {
          headers: {
            'Authorization': token
          }
        }
      );

      if (response.status === 200) {
        toast.success('Menu items updated successfully');
        setError('');
      }
    } catch (error) {
      console.error('Error updating menu items:', error);
      setError(error.response?.data?.message || 'Failed to update menu items');
      toast.error('Failed to update menu items');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Navbar Management</Title>

      {/* Logo Section */}
      <Section>
        <SectionTitle>Logo Management</SectionTitle>
        <FormGroup>
          <Label>Logo</Label>
          <LogoContainer>
            {logoPreview && (
              <LogoPreview src={logoPreview} alt="Logo preview" />
            )}
            <FileInputWrapper>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                id="logo-upload"
              />
              <FileInputLabel htmlFor="logo-upload">
                <Upload size={20} />
                Choose Logo
              </FileInputLabel>
            </FileInputWrapper>
          </LogoContainer>
          <UpdateButton 
            onClick={handleLogoSubmit}
            disabled={!logo || isLoading}
          >
            Update Logo
          </UpdateButton>
        </FormGroup>
      </Section>

      {/* Menu Items Section */}
      <Section>
        <SectionTitle>Menu Items</SectionTitle>
        {menuItems.map((item, index) => (
          <MenuItemContainer key={index}>
            <FormGroup>
              <Label>Icon (Material Icon Name)</Label>
              <Input
                type="text"
                value={item.icon}
                onChange={(e) => handleMenuItemChange(index, 'icon', e.target.value)}
                placeholder="e.g., home, person, work"
              />
            </FormGroup>
            <FormGroup>
              <Label>Label</Label>
              <Input
                type="text"
                value={item.label}
                onChange={(e) => handleMenuItemChange(index, 'label', e.target.value)}
                placeholder="Menu item label"
              />
            </FormGroup>
            <FormGroup>
              <Label>Route</Label>
              <Input
                type="text"
                value={item.route}
                onChange={(e) => handleMenuItemChange(index, 'route', e.target.value)}
                placeholder="/route-path"
              />
            </FormGroup>
            {menuItems.length > 1 && (
              <RemoveButton onClick={() => removeMenuItem(index)}>
                <Trash2 size={20} />
              </RemoveButton>
            )}
          </MenuItemContainer>
        ))}
        
        <AddButton onClick={addMenuItem}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Add Menu Item
        </AddButton>

        <UpdateButton 
          onClick={handleMenuSubmit}
          disabled={isLoading}
          style={{ marginTop: '1rem' }}
        >
          Update Menu Items
        </UpdateButton>
      </Section>

      {error && <ErrorText>{error}</ErrorText>}
    </FormContainer>
  );
};

// Keeping all the original styled components
const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoPreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const MenuItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
`;

const UpdateButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border:none;
  font-weight: 500;
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
  background-color: #f3f4f6;
  border: 1px dashed #e2e8f0;
  border-radius: 0.25rem;
  color: #4b5563;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-top: 2rem;
  color: #ef4444;
  border-radius: 0.25rem;
  &:hover {
    background-color: #fee2e2;
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export default NavbarManagementForm;