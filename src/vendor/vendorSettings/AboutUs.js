import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const AboutUsForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

  const vendorToken = localStorage.getItem("vendorToken");

  // Fetch current About Us content and title
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          'https://apiwl.novajobs.us/api/admin/get-aboutus',
          {
            headers: {
              Authorization: vendorToken,
            },
          }
        );
        // console.log(res,"fetc detils");
        setTitle(res.data.data?.title || '');
        setContent(res.data.data?.content || '');
      } catch (err) {
        setError('Failed to load About Us content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [vendorToken]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    // setSuccessMessage('');

    try {
      const res = await axios.put(
        'https://apiwl.novajobs.us/api/admin/update-aboutus',
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: vendorToken,
          },
        }
      );

    //   console.log(res, 'update content');
      toast.success(res?.data?.message || 'Content updated successfully!');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update About Us content.'
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Manage About Us Content</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="section">
            <h2 className="section-title1">About Us</h2>

            {/* Title Field */}
            <div className="form-group mb-4">
              <label className="label">Title</label>
              <input
                type="text"
                className="input w-full border border-gray-300 p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content Field */}
            <div className="form-group">
              <label className="label">Content</label>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                className="input"
              />
            </div>

            {/* Feedback Messages */}
            {error && <p className="error-text text-red-600">{error}</p>}
            {/* {successMessage && (
              <p className="text-green-600 font-medium">{successMessage}</p>
            )} */}

            {/* Submit Button */}
            <button
              type="submit"
              className="update-button mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update About Us'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AboutUsForm;
