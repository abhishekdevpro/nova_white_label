
import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { toast } from 'react-toastify';

const ShareJobModal = ({ show, onClose, shareUrl }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-3 shadow-lg p-3">
          <div className="d-flex justify-content-between items-center border-0">
            <h5 className="modal-title fw-bold">Share this job</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body text-center">
            <p className="mb-3">Share via social media</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={48} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={48} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={48} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={shareUrl}
                readOnly
              />
              <button className="btn btn-outline-primary" onClick={handleCopy}>
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareJobModal;
