// // "use client"

// // import { useState } from "react"
// // import axios from "axios"
// // import { toast } from "react-toastify"

// // export const useInsideImages = () => {
// //   const [insideCultureImages, setInsideCultureImages] = useState([])
// //   const [insideWorkplaceImages, setInsideWorkplaceImages] = useState([])
// //   const [insidePeopleImages, setInsidePeopleImages] = useState([])

// //   const token = localStorage.getItem("employeeLoginToken") || localStorage.getItem("vendorToken")

// //   const handleInsideImageUpload = (e, type) => {
// //     const files = Array.from(e.target.files)
// //     if (files.length > 3) {
// //       toast.error(`You can only upload up to 3 ${type} images`)
// //       return
// //     }
// //     switch (type) {
// //       case "culture":
// //         setInsideCultureImages(files)
// //         break
// //       case "workplace":
// //         setInsideWorkplaceImages(files)
// //         break
// //       case "people":
// //         setInsidePeopleImages(files)
// //         break
// //       default:
// //         break
// //     }
// //   }

//   // const removeInsideImage = (index, type) => {
//   //   switch (type) {
//   //     case "culture":
//   //       setInsideCultureImages((prev) => prev.filter((_, i) => i !== index))
//   //       break
//   //     case "workplace":
//   //       setInsideWorkplaceImages((prev) => prev.filter((_, i) => i !== index))
//   //       break
//   //     case "people":
//   //       setInsidePeopleImages((prev) => prev.filter((_, i) => i !== index))
//   //       break
//   //     default:
//   //       break
//   //   }
//   // }

// //   const handleInsideImagesSave = async (type) => {
// //     const formData = new FormData()
// //     let images, endpoint, uploadKey

// //     switch (type) {
// //       case "culture":
// //         images = insideCultureImages
// //         endpoint = "/company-inside-culture"
// //         uploadKey = "inside_culture_images_upload"
// //         break
// //       case "workplace":
// //         images = insideWorkplaceImages
// //         endpoint = "/company-inside-workplace"
// //         uploadKey = "inside_workplace_images_upload"
// //         break
// //       case "people":
// //         images = insidePeopleImages
// //         endpoint = "/company-inside-people"
// //         uploadKey = "inside_people_images_upload"
// //         break
// //       default:
// //         return
// //     }

// //     images.forEach((image, index) => {
// //       formData.append(`${uploadKey}`, image)
// //       formData.append("image_indexes", index.toString())
// //     })

// //     try {
// //       const response = await axios.patch(`https://apiwl.novajobs.us/api/employeer${endpoint}`, formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //           Authorization: token,
// //         },
// //       })

// //       if (response.status === 200) {
// //         toast.success(`${type} images updated successfully!`)
// //       } else {
// //         toast.error(`Failed to update ${type} images. Please try again.`)
// //       }
// //     } catch (error) {
// //       console.error(`Error updating ${type} images:`, error)
// //       toast.error("An error occurred. Please try again.")
// //     }
// //   }

// //   return {
// //     insideCultureImages,
// //     setInsideCultureImages,
// //     insideWorkplaceImages,
// //     setInsideWorkplaceImages,
// //     insidePeopleImages,
// //     setInsidePeopleImages,
// //     handleInsideImageUpload,
// //     removeInsideImage,
// //     handleInsideImagesSave,
// //   }
// // }


// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { toast } from "react-toastify"
// import { useCompanyData } from "./useCompanyData"

// export const useInsideImages = () => {
//   const [insideCultureImages, setInsideCultureImages] = useState([])
//   const [insideWorkplaceImages, setInsideWorkplaceImages] = useState([])
//   const [insidePeopleImages, setInsidePeopleImages] = useState([])

//   const token = localStorage.getItem("employeeLoginToken") || localStorage.getItem("vendorToken")

//   const handleInsideImageUpload = (e, type, index) => {
//     const file = e.target.files[0]
//     if (!file) return

//     switch (type) {
//       case "culture":
//         updateImageAtIndex(setInsideCultureImages, insideCultureImages, file, index)
//         break
//       case "workplace":
//         updateImageAtIndex(setInsideWorkplaceImages, insideWorkplaceImages, file, index)
//         break
//       case "people":
//         updateImageAtIndex(setInsidePeopleImages, insidePeopleImages, file, index)
//         break
//       default:
//         break
//     }
//   }

//   const updateImageAtIndex = (setImages, currentImages, file, index) => {
//     const newImages = [...currentImages]
//     newImages[index] = file
//     setImages(newImages)
//   }

//   const removeInsideImage = (index, type) => {
//     switch (type) {
//       case "culture":
//         updateImageAtIndex(setInsideCultureImages, insideCultureImages, "", index)
//         break
//       case "workplace":
//         updateImageAtIndex(setInsideWorkplaceImages, insideWorkplaceImages, "", index)
//         break
//       case "people":
//         updateImageAtIndex(setInsidePeopleImages, insidePeopleImages, "", index)
//         break
//       default:
//         break
//     }
//   }

//   const handleInsideImagesSave = async (type) => {
//     let images, endpoint, uploadKey

//     switch (type) {
//       case "culture":
//         images = insideCultureImages
//         endpoint = "/company-inside-culture"
//         uploadKey = "inside_culture_images_upload"
//         break
//       case "workplace":
//         images = insideWorkplaceImages
//         endpoint = "/company-inside-workplace"
//         uploadKey = "inside_workplace_images_upload"
//         break
//       case "people":
//         images = insidePeopleImages
//         endpoint = "/company-inside-people"
//         uploadKey = "inside_people_images_upload"
//         break
//       default:
//         return
//     }

//     const formData = new FormData()
//     images.forEach((image, index) => {
//       if (image && typeof image !== "string") {
//         formData.append(uploadKey, image)
//         formData.append("image_indexes", index.toString())
//       }
//     })

//     try {
//       const response = await axios.patch(`https://apiwl.novajobs.us/api/employeer${endpoint}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token,
//         },
//       })

//       if (response.status === 200) {
//         toast.success(`${type} images updated successfully!`)
//       } else {
//         toast.error(`Failed to update ${type} images. Please try again.`)
//       }
//     } catch (error) {
//       console.error(`Error updating ${type} images:`, error)
//       toast.error("An error occurred. Please try again.")
//     }
//   }

//   return {
//     insideCultureImages,
//     insideWorkplaceImages,
//     insidePeopleImages,
//     handleInsideImageUpload,
//     removeInsideImage,
//     handleInsideImagesSave,
//   }
// }


"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const useInsideImages = () => {
  const [insideCultureImages, setInsideCultureImages] = useState([])
  const [insideWorkplaceImages, setInsideWorkplaceImages] = useState([])
  const [insidePeopleImages, setInsidePeopleImages] = useState([])

  const token = localStorage.getItem("employeeLoginToken") || localStorage.getItem("vendorToken")

  const handleInsideImageUpload = (e, type, index) => {
    const file = e.target.files[0]
    if (!file) return

    switch (type) {
      case "culture":
        updateImageAtIndex(setInsideCultureImages, insideCultureImages, file, index)
        break
      case "workplace":
        updateImageAtIndex(setInsideWorkplaceImages, insideWorkplaceImages, file, index)
        break
      case "people":
        updateImageAtIndex(setInsidePeopleImages, insidePeopleImages, file, index)
        break
      default:
        break
    }
  }

  const updateImageAtIndex = (setImages, currentImages, file, index) => {
    const newImages = [...currentImages]
    // Ensure the array has enough slots
    while (newImages.length <= index) {
      newImages.push("")
    }
    newImages[index] = file
    setImages(newImages)
  }

  const removeInsideImage = (index, type) => {
    switch (type) {
      case "culture":
        updateImageAtIndex(setInsideCultureImages, insideCultureImages, "", index)
        break
      case "workplace":
        updateImageAtIndex(setInsideWorkplaceImages, insideWorkplaceImages, "", index)
        break
      case "people":
        updateImageAtIndex(setInsidePeopleImages, insidePeopleImages, "", index)
        break
      default:
        break
    }
  }

  const handleInsideImagesSave = async (type) => {
    let images, endpoint, uploadKey

    switch (type) {
      case "culture":
        images = insideCultureImages
        endpoint = "/company-inside-culture"
        uploadKey = "inside_culture_images_upload"
        break
      case "workplace":
        images = insideWorkplaceImages
        endpoint = "/company-inside-workplace"
        uploadKey = "inside_workplace_images_upload"
        break
      case "people":
        images = insidePeopleImages
        endpoint = "/company-inside-people"
        uploadKey = "inside_people_images_upload"
        break
      default:
        return
    }

    const formData = new FormData()
    images.forEach((image, index) => {
      if (image && typeof image !== "string") {
        formData.append(uploadKey, image)
        formData.append("image_indexes", index.toString())
      }
    })

    try {
      const response = await axios.patch(`https://apiwl.novajobs.us/api/employeer${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })

      if (response.status === 200) {
        toast.success(`${type} images updated successfully!`)
      } else {
        toast.error(`Failed to update ${type} images. Please try again.`)
      }
    } catch (error) {
      console.error(`Error updating ${type} images:`, error)
      toast.error("An error occurred. Please try again.")
    }
  }

  return {
    insideCultureImages,
    setInsideCultureImages,
    insideWorkplaceImages,
    setInsideWorkplaceImages,
    insidePeopleImages,
    setInsidePeopleImages,
    handleInsideImageUpload,
    removeInsideImage,
    handleInsideImagesSave,
  }
}