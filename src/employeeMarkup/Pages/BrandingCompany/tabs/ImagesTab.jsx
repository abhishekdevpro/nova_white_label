import ImageSection from "../common/ImageSection"

const ImagesTab = ({
  activeTab,
  insideCultureImages,
  insideWorkplaceImages,
  insidePeopleImages,
  handleInsideImageUpload,
  removeInsideImage,
  handleInsideImagesSave,
}) => {
  if (activeTab !== "images") return null

  return (
    <div className="tab-pane fade show active">
      <div className="row m-b30">
        <div className="col-lg-12">
          <div className="form-group">
            <div className="row">
              <ImageSection
                title="Culture Images"
                images={insideCultureImages}
                type="culture"
                handleImageUpload={handleInsideImageUpload}
                removeImage={removeInsideImage}
                handleSave={handleInsideImagesSave}
                colClass="col-lg-4 col-md-6"
              />

              <ImageSection
                title="Workplace Images"
                images={insideWorkplaceImages}
                type="workplace"
                handleImageUpload={handleInsideImageUpload}
                removeImage={removeInsideImage}
                handleSave={handleInsideImagesSave}
                colClass="col-lg-4 col-md-6"
              />

              <ImageSection
                title="People Images"
                images={insidePeopleImages}
                type="people"
                handleImageUpload={handleInsideImageUpload}
                removeImage={removeInsideImage}
                handleSave={handleInsideImagesSave}
                colClass="col-lg-4 col-md-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagesTab
